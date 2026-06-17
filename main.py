from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import shutil
import os
import Python.OCR as my
from Python.MetaData import SummarizeSection
import json


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
DIST_DIR = os.path.join(BASE_DIR, "dist")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

PDF_NAME = ""



# LIFESPAN HANDLER (Replaces deprecated on_event)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # === Startup: delete old uploads ===
    folder = UPLOAD_FOLDER
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Failed to delete {file_path}: {e}")

    yield  # App runs here

    # === Shutdown (optional) ===
    # Add shutdown code here if needed


app = FastAPI(lifespan=lifespan)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "ok"}


# FILE UPLOAD ROUTE
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        safe_filename = os.path.basename(file.filename)
        file_location = os.path.join(UPLOAD_FOLDER, safe_filename)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        global PDF_NAME
        PDF_NAME = safe_filename

        return {"filename": safe_filename, "message": "File uploaded successfully"}
    except Exception as e:
        return {"error": str(e)}


# PROCESS FILE ROUTE
@app.get("/process/")
async def process_file():
    global PDF_NAME

    if not PDF_NAME:
        return {"error": "No file uploaded yet"}

    try:
        my.output(PDF_NAME)
        result = SummarizeSection()

        # Ensure JSON serializable
        safe_json = json.loads(json.dumps(result, default=str))

        return JSONResponse(content=safe_json)

    except Exception as e:
        return {"error": str(e)}


@app.get("/{full_path:path}", include_in_schema=False)
async def serve_frontend(full_path: str):
    if not os.path.isdir(DIST_DIR):
        return {"message": "API is running. Build the frontend to enable the web UI."}

    requested_file = os.path.join(DIST_DIR, full_path)
    if full_path and os.path.isfile(requested_file):
        return FileResponse(requested_file)

    return FileResponse(os.path.join(DIST_DIR, "index.html"))
