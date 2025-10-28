import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Process() {
  const location = useLocation();
  const navigate = useNavigate();
  const content = location.state?.content || "No content available.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 md:p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Processed Document Content
        </h2>

        <div className="border border-gray-200 rounded-lg p-6 max-h-[70vh] overflow-y-auto bg-gray-50">
          <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {content}
          </pre>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ⬅ Back to Upload
          </button>
        </div>
      </div>
    </div>
  );
}
