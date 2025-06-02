import React, { useEffect, useState } from 'react';
import api from '../api';

const DownloadSection = () => {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    api.get('/api/downloads')
      .then(res => setDownloads(res.data))
      .catch(err => console.error('Error fetching downloads:', err));
  }, []);

  return (
    <section id="downloads" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Download Study Materials</h2>

        {downloads.length === 0 ? (
          <p className="text-center text-gray-500">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {downloads.map(doc => (
              <li key={doc.id} className="flex justify-between items-center bg-gray-100 p-4 rounded shadow">
                <span className="text-gray-800 font-medium">{doc.title}</span>
                <a
                  href={`http://localhost:5000${doc.filePath}`}
                  download
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default DownloadSection;
