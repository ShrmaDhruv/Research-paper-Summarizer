export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 w-full py-10 mt-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Smart Research Paper Analyzer
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            An AI-powered tool that analyzes, understands, and extracts key
            information from research papers seamlessly.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
