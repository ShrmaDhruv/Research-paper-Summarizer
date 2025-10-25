import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash } from "react-icons/fa";

export default function MyDropzone() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://127.0.0.1:8000/upload/", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);
    const data = await res.json();
    alert("✅ File uploaded successfully: " + data.filename);
  } catch (err) {
    console.log("Error:", err);
    alert("❌ Upload failed. Check backend console for details.");
  }
};

  const onDrop = useCallback((acceptedFiles) => {
    const mapped = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(mapped);

    // Auto upload the first file (single file support)
    if (mapped.length > 0) {
      handleUpload(mapped[0]);
    }
  }, []);

  const removeFile = (fileName) => {
    setFiles((files) => files.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [] },
    multiple: false,
    onDrop,
  });

  const thumbs = files.map((file) => (
    <div
      key={file.name}
      className="flex flex-col items-center border rounded-lg p-3 w-40 shadow-md relative bg-white"
    >
      <span className="text-sm font-medium text-gray-800 truncate w-full text-center">
        {file.name}
      </span>
      <span className="text-xs text-gray-500 mt-1">
        {(file.size / 1024).toFixed(1)} KB
      </span>

      <button
        onClick={() => removeFile(file.name)}
        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
      >
        <FaTrash size={14} />
      </button>

      <button
        onClick={() => window.open(file.preview, "_blank")}
        className="text-blue-600 hover:underline text-sm mt-2"
      >
        Preview
      </button>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="flex flex-col items-center justify-center p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-10 w-full max-w-lg text-center cursor-pointer transition ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-400 hover:border-blue-500 hover:bg-blue-50"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? "Drop the PDF here..."
            : "Drag & drop a PDF here, or click to select one"}
        </p>
      </div>

      <aside className="flex flex-wrap gap-4 mt-6">{thumbs}</aside>

      {uploading && (
        <p className="mt-4 text-blue-600 font-medium animate-pulse">
          ⏳ Uploading...
        </p>
      )}
      {uploadMessage && (
        <p
          className={`mt-4 font-medium ${
            uploadMessage.startsWith("✅")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {uploadMessage}
        </p>
      )}
    </section>
  );
}
