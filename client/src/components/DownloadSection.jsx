import React, { useEffect, useState } from 'react';
import api from '../api';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DownloadSection = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const res = await api.get('/api/downloads');
        setDownloads(res.data || []);
      } catch (err) {
        console.error('Error fetching downloads:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  if (!API_BASE_URL) {
    return (
      <div className="text-center text-red-600 py-10">
        ⚠️ <code>REACT_APP_API_BASE_URL</code> not configured.
      </div>
    );
  }

  return (
    <section id="downloads" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Download Study Materials</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading files...</p>
        ) : downloads.length === 0 ? (
          <p className="text-center text-gray-500">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {downloads.map((doc) => (
              <li
                key={doc.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded shadow"
              >
                <span className="text-gray-800 font-medium">{doc.title}</span>
                <a
                  href={`${API_BASE_URL}${doc.filePath}`}
                  download
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
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
