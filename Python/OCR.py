import os

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATA_DIR = os.path.join(PROJECT_ROOT, "data")
YOLO_CONFIG_DIR = os.path.join(DATA_DIR, "yolo_config")

os.makedirs(YOLO_CONFIG_DIR, exist_ok=True)
os.environ.setdefault("YOLO_CONFIG_DIR", YOLO_CONFIG_DIR)

import cv2
import numpy as np
import pytesseract
import warnings
import torch
from doclayout_yolo import YOLOv10
import shutil
import re
# from page1 import SummarizeSection

_MODEL = None
_MODEL_DEVICE = None

def load_model(device):
    # print(os.getcwd())
    model_path = os.path.join(PROJECT_ROOT, "models", "doclayout_yolo_docstructbench_imgsz1280_2501.pt")
    return YOLOv10(model_path).to(device)


def get_model(device):
    global _MODEL, _MODEL_DEVICE
    if _MODEL is None or _MODEL_DEVICE != device:
        _MODEL = load_model(device)
        _MODEL_DEVICE = device
    return _MODEL


def convert_pdf_first_page(pdf_path, dpi=200):
    try:
        import pypdfium2 as pdfium
    except ImportError as exc:
        raise RuntimeError(
            "Missing dependency 'pypdfium2'. Install requirements again with "
            "`pip install -r requirements.txt`."
        ) from exc

    pdf = pdfium.PdfDocument(pdf_path)
    try:
        if len(pdf) == 0:
            raise RuntimeError("The uploaded PDF does not contain any pages.")

        page = pdf[0]
        scale = dpi / 72
        try:
            return page.render(scale=scale).to_pil()
        finally:
            page.close()
    finally:
        pdf.close()

# OCR helper

def run_zoom_ocr(frame, coords,lbl=""):
    x1, y1, x2, y2 = coords
    roi = frame[y1:y2, x1:x2]
    if roi.size == 0:
        return ""
    zoom = cv2.resize(roi, (roi.shape[1]*2, roi.shape[0]*2), interpolation=cv2.INTER_CUBIC)
    raw_text = pytesseract.image_to_string(zoom, lang="eng")
    text = raw_text.strip()
    if lbl == 'title':
        text = text.replace("\n", " ")
        text = text.replace("- ", "")
    return text

def save_region_image(frame, coords, label, index, out_dir=None):
    if out_dir is None:
        out_dir = os.path.join(DATA_DIR, "extracted_figures")
    os.makedirs(out_dir, exist_ok=True)
    x1, y1, x2, y2 = coords
    roi = frame[y1:y2, x1:x2]
    if roi.size == 0:
        return None
    filename = os.path.join(out_dir, f"{label}_{index}.png")
    cv2.imwrite(filename, roi)
    return filename

def process_page(frame, page_num,model):
    folder_path = os.path.join(DATA_DIR, "extracted_figures")
    os.makedirs(folder_path, exist_ok=True)

    results = model.predict(frame)
    boxes = results[0].boxes
    classes = results[0].names
    rframe=results[0].plot()
    cv2.imwrite(os.path.join(PROJECT_ROOT, "output.png"), rframe)
    # Collect detections
    detections = []
    for i,box in enumerate(boxes):
        cls_id = int(box.cls.cpu().numpy())
        label = classes[cls_id].lower().replace(" ", "_")
        x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
            # ------------ SAVE ROI FOR LOGGING ------------
        # log_dir = "./data/log_crops"
        # os.makedirs(log_dir, exist_ok=True)
        # roi = frame[y1:y2, x1:x2]
        # if roi.size != 0:
        #     log_path = os.path.join(log_dir, f"{label}_{page_num}_{i}.png")
        #     cv2.imwrite(log_path, roi)
        #     print(f"Logged crop: {log_path}")
        detections.append({"label": label, "coords": (x1, y1, x2, y2)})
    # Sort by vertical position
    # detections = sorted(detections, key=lambda d: d["coords"][1])
    detections = sorted(detections, key=lambda d: (d["coords"][1], d["coords"][0]))
    # Detect column cutoff (mid X of page)
    mid_x = frame.shape[1] // 2

    left_col = [d for d in detections if d["coords"][0] <= mid_x]
    right_col = [d for d in detections if d["coords"][0] > mid_x]

    # Sort each column then combine
    left_col  = sorted(left_col,  key=lambda d: (d["coords"][1], d["coords"][0]))
    right_col = sorted(right_col, key=lambda d: (d["coords"][1], d["coords"][0]))

    # final merge left → right
    detections = left_col + right_col

    printed_items = []
    printed_captions = set()
    # prev_lbl = ""
    # 👉 Detect the first section block (like Abstract, Introduction)
    first_section_y = None
    for d in detections:
        if d["label"] in ["section_header", "heading", "subtitle"]:
            first_section_y = d["coords"][1]
            break


    # Same text formating
    def normalize_text(text):
        return re.sub(r"\s+", " ", text.strip()).lower()
    # Unwanted Hyphen fix
    def fix_hyphenation(text):
        text = re.sub(r"(\w)-\s*\n\s*(\w)", r"\1\2", text)
        text = re.sub(r"(\w)-\s+(\w)", r"\1\2", text)
        return text

    def clean_text(text):
        text = fix_hyphenation(text)
        text = re.sub(r"\s+", " ", text)
        return text.strip()
    plain_text=set()
    # Write text
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(os.path.join(DATA_DIR, "content.txt"),"a", encoding="utf-8") as file:
        
        file.write(f"\n---------PAGE {page_num}--------\n\n")

        for idx, det in enumerate(detections):
            lbl = det["label"]
            coords = det["coords"]

            text = run_zoom_ocr(frame, coords, lbl)
            text = clean_text(text)

            if not text and lbl not in ["figure", "image", "table"]:  # Not Recongnized values
                continue
            
            if text:
                printed_items.append((normalize_text(text), coords))
            if lbl == "title":
                file.write(f"\n[{lbl.upper()}] {text}\n\n")
                # prev_lbl = lbl
                plain_text.add(text)
            # 👉 AUTHORS BLOCK: text that is below title but above first section (e.g. Abstract)
            if text  and first_section_y is not None and coords[1] < first_section_y:
                file.write(f"[PLAIN_TEXT] {text}\n")
                printed_items.append((normalize_text(text), coords))
                continue

            elif lbl in ["plain_text"]:
                if printed_items and coords[0] > mid_x :
                    file.write("\n")
                
                file.write(f"\n[{lbl.upper()}] {text}\n")
                # prev_lbl = lbl
                plain_text.add(text)
            elif lbl in ["figure", "image", "table"] or ('formula' in lbl and 'formula_caption' not in lbl):
                img_path = save_region_image(frame, coords, lbl, idx)
                if img_path:
                    nearest_caption = None
                    min_dist = float("inf")

                    for cap_det in detections:
                        if "caption" in cap_det["label"]:
                            cy1 = cap_det["coords"][1]
                            fy2 = coords[3]
                            dist = abs(cy1 - fy2)
                            if dist < min_dist:
                                min_dist = dist
                                nearest_caption = cap_det

                    caption_text = ""
                    if nearest_caption:
                        caption_text = clean_text(run_zoom_ocr(frame, nearest_caption["coords"], lbl))

                    if caption_text and caption_text not in printed_captions:
                        file.write(f"\n[IMAGE CAPTION] {caption_text}\n\n")
                        printed_captions.add(caption_text)
                        file.write(f"\n[IMAGE] {img_path}\n\n")
                    else:
                        file.write(f"\n[IMAGE] {img_path}\n\n")

    print(f" Page {page_num} processed and saved to content.txt")

# Main Function
def output(filename : str):
    
    warnings.filterwarnings('ignore')

    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = get_model(device)

    # Remove old Images

    folder_path = os.path.join(DATA_DIR, "extracted_figures")
    if os.path.exists(folder_path):
            shutil.rmtree(folder_path)

    # Removing Old Text content
    
    content_path = os.path.join(DATA_DIR, "content.txt")
    if os.path.exists(content_path):
        os.remove(content_path)
    pdf_path = os.path.join(PROJECT_ROOT, "uploads", filename)
    pdf_path = os.path.abspath(pdf_path)
    page = convert_pdf_first_page(pdf_path, dpi=200)
    frame = cv2.cvtColor(np.array(page), cv2.COLOR_RGB2BGR)
    process_page(frame, 1, model)

