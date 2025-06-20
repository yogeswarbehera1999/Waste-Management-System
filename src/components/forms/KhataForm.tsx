import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import api from '../../services/api';

interface KhataFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

const KhataForm: React.FC<KhataFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    supervisorName: '',
    contactNumber: '',
    generation: '',
    stock: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/khata', formData);
      onSubmit();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error submitting Mo Khata entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-green-100">
          <h2 className="text-xl font-semibold text-green-800">Mo Khata Report</h2>
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
              Supervisor Name *
            </label>
            <input
              type="text"
              name="supervisorName"
              value={formData.supervisorName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Contact Number *
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
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
              Mo Khata Generation *
            </label>
            <input
              type="text"
              name="generation"
              value={formData.generation}
              onChange={handleInputChange}
              placeholder="Mo Khata Generation"
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Mo Khata Stock *
            </label>
            <input
              type="text"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="Mo Khata Stock"
              className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
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
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KhataForm;