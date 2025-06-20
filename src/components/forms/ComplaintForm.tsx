import React, { useState, useRef } from 'react';
import { X, Camera, Calendar } from 'lucide-react';
import api from '../../services/api';

interface ComplaintFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    citizenName: '',
    phone: '',
    wardNumber: '',
    area: '',
    category: '',
    description: '',
    photo: ''
  });
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Illegal Dumping of C & D Waste',
    'Dead Animals',
    'Practice of Manual Scavenging',
    'Open Defecation',
    'Urination in Public',
    'No Electricity in Public Toilet Stagnant Water on the Road',
    'Sewerage or Storm Water Overflow',
    'Open Manholes or Drains',
    'Improper Disposal of Faccal Waste or Septage',
    'Cleaning of Sewer',
    'Public Toilet Blockage',
    'Public Toilet Cleaning',
    'Cleaning of Drain',
    'No Water Supply in Public Toilet',
    'Garbage Dump',
    'Dustbins Not Cleaned',
    'Sweeping Not Done',
    'Burning of Garbage in Open Space',
    'Garbage Vehicle Not Arrived',
    'Cleaning of Garbage from Public Spaces',
    'Cleaning of Street Roads',
    'Door-To-Door Collection Not Done'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setFormData({ ...formData, photo: base64String });
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/complaints', formData);
      onSubmit();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error submitting complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-green-100">
          <h2 className="text-xl font-semibold text-green-800">Post a Complaint</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Citizen Name *
            </label>
            <input
              type="text"
              name="citizenName"
              value={formData.citizenName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Ward Number *
            </label>
            <input
              type="number"
              name="wardNumber"
              value={formData.wardNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Area *
            </label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Date & Time
            </label>
            <div className="flex items-center px-3 py-2 bg-gray-50 border border-green-200 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-gray-700">{new Date().toLocaleString()}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Complaint Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Capture Photo *
            </label>
            <div className="space-y-3">
              <button
                type="button"
                onClick={triggerCamera}
                className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 transition-colors"
              >
                <Camera className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-green-700">📷 Capture Photo</span>
              </button>
              
              {photoPreview && (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoPreview(null);
                      setFormData({ ...formData, photo: '' });
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoCapture}
              className="hidden"
              required={!formData.photo}
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;