import React from "react";
import { motion } from "framer-motion";
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
          <span className="font-semibold">Smart Research Paper Analyzer</span>is a deep learning–based system designed to automatically extract and structure key information from the{" "}
          <span className="font-semibold">first page of research papers.</span> It focuses on identifying crucial elements such as the title, author names, abstract, and introduction, which are often formatted differently across various publications.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Traditional OCR systems struggle to maintain accuracy when applied to research papers containing{" "}
          <span className="font-semibold">multiple columns, figures, and complex layouts.</span>To address this, the project leverages the
          <span className="font-semibold">DocLayout-YOLO, DocLayNet, and PubLayNet.</span>
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Once the document regions are accurately detected and classified, a <span className="font-semibold">targeted OCR process</span>
          is applied to extract text from each identified section. This two-step pipeline—layout analysis followed by
          <span className="font-semibold">adaptive OCR</span>ensures highly precise and structured text extraction from research paper first pages.
        </p>

        <p className="text-grey-700 leading-relaxed mb-4">
          By combining {" "}<span className="font-semibold">deep learning–based layout detection with OCR-driven text recognition</span>,
          Smart Research Paper Analyzer provides an efficient solution for digitizing and understanding research documents, enabling better{" "}
          <span className="font-semibold">metadata extraction, content indexing, and automated academic data processing.</span>
        </p>


      </motion.div>
    </div>
  );
}
