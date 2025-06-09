import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryAdminn = () => {
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [images, setImages] = useState([]);

  const categories = [
    'Classroom',
    'Office',
    'Students',
    'Interaction',
    'Hostel',
    'Dining Area',
  ];

  const fetchImages = async () => {
    try {
      const res = await axios.get('/api/galleryy');
      setImages(res.data);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!category || !imageFile) return alert('Please select category and image.');

    const formData = new FormData();
    formData.append('category', category);
    formData.append('image', imageFile);

    try {
      await axios.post('/api/galleryy/upload', formData);
      setCategory('');
      setImageFile(null);
      fetchImages();
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      await axios.delete(`/api/galleryy/${id}`);
      fetchImages();
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Categorized Gallery</h2>

      <form onSubmit={handleUpload} className="space-y-4 mb-6">
        <div>
          <label className="block font-medium mb-1">Select Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
          >
            <option value="">-- Choose Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Choose Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Image
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Uploaded Images</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="border rounded overflow-hidden shadow">
            <img
              src={`data:image/jpeg;base64,${img.image_data}`}
              alt={img.category}
              className="w-full h-40 object-cover"
            />
            <div className="p-2 text-center text-sm">
              <p className="font-medium">{img.category}</p>
              <button
                onClick={() => handleDelete(img.id)}
                className="text-red-500 mt-2 text-xs hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryAdminn;
