import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const courses = [
    'NEET UG',
    'NEET Crash Course',
    '11th Foundation',
    '12th Foundation',
    'Repeater Batch'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  const { name, email, phone, course, message } = formData;

  if (!name || !email || !phone || !course || !message) {
    alert('Please fill in all fields');
    return;
  }

  const whatsappText = `
Hello! I'm interested in your NEET program.

Name: ${name}
Email: ${email}
Phone: ${phone}
Course: ${course}
Message: ${message}
  `.trim();

  const encodedText = encodeURIComponent(whatsappText);
  const whatsappURL = `https://wa.me/917353049113?text=${encodedText}`;

  // ✅ Open WhatsApp chat in a new tab
  const newTab = window.open(whatsappURL, '_blank');
  if (!newTab) {
    alert('Please allow pop-ups for this site.');
  }
};

  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select a Course</option>
            {courses.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            rows="4"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
          >
            Send on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
