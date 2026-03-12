import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS, WEATHER_OPTIONS } from '../constants/mockData';
import { ArrowLeft, Upload, X } from 'lucide-react';

const DPRForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === parseInt(projectId));

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weather: 'Sunny',
    description: '',
    workerCount: '',
    images: []
  });

  const [errors, setErrors] = useState({});

  // Image Preview Logic
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file) // Creates a temporary URL for the thumbnail
    }));

    setFormData({ ...formData, images: [...formData.images, ...newImages] });
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.workerCount || formData.workerCount <= 0) newErrors.workerCount = "Valid worker count is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("DPR Submitted Successfully!");
      console.log("Submitted Data:", formData);
      navigate('/projects');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <nav className="bg-white p-4 shadow-sm flex items-center gap-4">
        <button onClick={() => navigate('/projects')} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-lg">DPR: {project?.name}</h1>
      </nav>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-md space-y-6">
        {/* Date & Weather Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input 
              type="date" 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Weather</label>
            <select 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.weather}
              onChange={(e) => setFormData({...formData, weather: e.target.value})}
            >
              {WEATHER_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        {/* Worker Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Worker Count</label>
          <input 
            type="number" 
            placeholder="Total workers on site"
            className={`mt-1 block w-full border rounded-md p-2 ${errors.workerCount ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.workerCount}
            onChange={(e) => setFormData({...formData, workerCount: e.target.value})}
          />
          {errors.workerCount && <p className="text-red-500 text-xs mt-1">{errors.workerCount}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Work Description</label>
          <textarea 
            rows="4"
            placeholder="What was accomplished today?"
            className={`mt-1 block w-full border rounded-md p-2 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photos (Max 3)</label>
          <div className="flex gap-4 flex-wrap">
            {formData.images.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <img src={img.preview} alt="preview" className="w-full h-full object-cover rounded-md shadow" />
                <button 
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            {formData.images.length < 3 && (
              <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 text-gray-400">
                <Upload size={24} />
                <span className="text-[10px] mt-1">Upload</span>
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors"
        >
          Submit Daily Report
        </button>
      </form>
    </div>
  );
};

export default DPRForm;