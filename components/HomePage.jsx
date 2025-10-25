import { motion } from "framer-motion";
import Body from "./Body";


export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-900">
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent"
        >
          Document Layout Analysis
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-gray-600"
        >
          A smart tool that analyzes, understands, and processes your documents seamlessly.
        </motion.p>

        {/* <motion.img
          src='./img.jpeg'
          alt="Document Analysis Illustration"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-12 w-full max-w-lg drop-shadow-lg"
        /> */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 text-gray-500 animate-bounce"
        >
          ↓ Scroll Down
        </motion.div>
      </section>

      <section className="py-20 bg-white px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            Why Document Layout Analysis?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Extracting and structuring information from PDFs or scanned documents is crucial
            for automation, research, and digital workflows. Our tool makes it faster,
            more accurate, and easier than ever.
          </motion.p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Accurate Detection",
                desc: "Identifies document sections like titles, tables, paragraphs, and more.",
              },
              {
                title: "AI Powered",
                desc: "Uses advanced AI models to understand complex layouts.",
              },
              {
                title: "Time Saving",
                desc: "Processes your documents in seconds, not hours.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl shadow-md p-6 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="upload" className="py-20 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Body />
        </motion.div>
      </section>
    </div>
  );
}
