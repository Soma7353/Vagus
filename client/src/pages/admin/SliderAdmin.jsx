import React, { useEffect, useState } from 'react';

const SliderAdmin = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchImages = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/slider');
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('photo', selectedFile);

    try {
      await fetch('http://localhost:4000/api/slider', {
        method: 'POST',
        body: formData,
      });
      setSelectedFile(null);
      fetchImages();
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/slider/${id}`, {
        method: 'DELETE',
      });
      fetchImages();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-4">Upload Slider Image</h3>

      <form onSubmit={handleUpload} className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="block w-full sm:w-auto"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Upload
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative">
            <img
              src={`http://localhost:4000/api/slider/image/${img.id}`}
              alt="Slider"
              className="w-full h-32 object-cover rounded shadow"
            />
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderAdmin;
