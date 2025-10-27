from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import sys
import Python.OCR as my
from Python.page1 import SummarizeSection

# filename=""

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_location = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            my.output(file.filename)
            # filename=file.filename
        return {"filename": file.filename, "message": "File uploaded successfully"}
    except Exception as e:
        print(f"❌ Error while saving file: {e}")
        return {"error": str(e)}
    
