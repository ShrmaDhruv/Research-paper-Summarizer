// src/App.js
import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom/client'

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    // fetch('http://localhost:5000/api/data')  // Flask
    fetch('http://127.0.0.1:8000/api/data')  // FastAPI
      .then(res => res.json())
      .then(json => setData(json.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>React + Python</h1>
      <p>{data}</p>
    </div>
  );
}
const root = ReactDom.createRoot(document.getElementById('root'))
root.render(<App/>)
