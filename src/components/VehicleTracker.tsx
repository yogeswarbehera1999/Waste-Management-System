import React, { useState, useEffect } from 'react';
import { MapPin, Truck, Clock, Activity } from 'lucide-react';
import api from '../services/api';

interface VehicleData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  lastUpdated: string;
  status: string;
}

const VehicleTracker: React.FC = () => {
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicleLocation();
    const interval = setInterval(fetchVehicleLocation, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchVehicleLocation = async () => {
    try {
      const response = await api.get('/vehicle/location');
      setVehicleData(response.data);
    } catch (error) {
      console.error('Error fetching vehicle location:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-green-100 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          <span className="ml-3 text-gray-600">Loading vehicle location...</span>
        </div>
      </div>
    );
  }

  if (!vehicleData) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-green-100 p-8">
        <div className="text-center text-gray-500">
          <Truck className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>Vehicle location not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Vehicle Status Card */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-green-800">Live Vehicle Tracking</h2>
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            vehicleData.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <Activity className="w-4 h-4 mr-1" />
            {vehicleData.status.charAt(0).toUpperCase() + vehicleData.status.slice(1)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vehicle Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Truck className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Vehicle</p>
                <p className="font-medium text-gray-900">{vehicleData.name}</p>
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Current Location</p>
                <p className="font-medium text-gray-900">
                  {vehicleData.latitude.toFixed(6)}, {vehicleData.longitude.toFixed(6)}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-medium text-gray-900">
                  {new Date(vehicleData.lastUpdated).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Vehicle Location</p>
              <p className="text-sm text-gray-500 mt-1">
                Lat: {vehicleData.latitude.toFixed(4)} | Lng: {vehicleData.longitude.toFixed(4)}
              </p>
              <div className="mt-4 text-xs text-gray-400">
                * In production, this would show an interactive map
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={fetchVehicleLocation}
            className="flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Activity className="w-5 h-5 mr-2" />
            Refresh Location
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <MapPin className="w-5 h-5 mr-2" />
            View Route History
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleTracker;