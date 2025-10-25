import React from "react";
import { motion } from "framer-motion";
import docImage from "./1.jpg"; // ✅ correct relative import (same folder as About.jsx)

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl bg-white shadow-xl rounded-2xl p-10"
      >
        <h2 className="text-3xl font-extrabold text-indigo-600 mb-6 text-center">
          About This Project
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This project is focused on <span className="font-semibold">Document
          Layout Analysis</span>, with a special emphasis on extracting
          meaningful structure from complex documents like{" "}
          <span className="italic">research papers</span> and{" "}
          <span className="italic">newspapers</span>. Traditional OCR often
          struggles with accuracy when applied directly to a whole page,
          especially when documents contain multiple columns, tables, figures,
          and headings.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          To address this, I explored multiple models including{" "}
          <span className="font-semibold">DocLayout-YOLO</span>,{" "}
          <span className="font-semibold">DocLayNet</span>, and{" "}
          <span className="font-semibold">PubLayNet</span>-based approaches. The
          goal is to first detect and classify document regions such as titles,
          paragraphs, tables, images, and captions. Once identified, these
          regions are processed individually with OCR, ensuring{" "}
          <span className="font-semibold">higher text extraction accuracy</span>.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          This two-step pipeline—layout analysis followed by targeted OCR—creates
          a system that can handle diverse document types more reliably. By
          combining <span className="text-indigo-500 font-medium">deep learning
          models for layout detection</span> with{" "}
          <span className="text-indigo-500 font-medium">OCR engines for text
          recognition</span>, the project aims to improve the way digital systems
          process and understand complex, multi-format documents.
        </p>

        {/* <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-8 flex justify-center"
        >
          <img
            src={docImage}
            alt="Document Layout Illustration"
            className="rounded-xl shadow-lg w-full max-w-2xl"
          />
        </motion.div> */}
      </motion.div>
    </div>
  );
}
