# MetaData Extractor

React + FastAPI app for extracting metadata from research-paper PDFs.

## Deploy on Render

This repo includes a `render.yaml` Blueprint and Dockerfile. The Docker image:

- builds the Parcel/React frontend,
- serves the built frontend from FastAPI,
- installs Tesseract and Poppler for OCR/PDF processing,
- starts Uvicorn on Render's `PORT`.

Steps:

1. Push this project to GitHub.
2. In Render, choose **New > Blueprint**.
3. Select the GitHub repo that contains this project.
4. Render will detect `render.yaml` and create the `metadata-extractor` web service.
5. Deploy it.

The service exposes:

- `/` for the web app
- `/upload/` for PDF upload
- `/process/` for metadata extraction
- `/health` for Render health checks

## Local Development

Frontend:

```bash
npm install
npm start
```

Backend:

```bash
pip install -r requirements.txt
python -m spacy download en_core_web_md
uvicorn main:app --reload
```

The deployed app runs as a single Docker service, so frontend API calls use relative URLs.
