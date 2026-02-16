import { useState, useEffect } from 'react';
import { MapPin, Navigation, X, User } from 'lucide-react';

interface LiveTrackingProps {
  riderId: string;
  riderName: string;
  riderImage: string;
  from: string;
  to: string;
  estimatedArrival: string;
  onClose: () => void;
}

export function LiveTracking({ riderId, riderName, riderImage, from, to, estimatedArrival, onClose }: LiveTrackingProps) {
  const [currentLocation, setCurrentLocation] = useState({ lat: 47.0502, lng: 8.3093 }); // Mock: Luzern
  const [progress, setProgress] = useState(35);

  // Simulate movement (in real app, this would be actual GPS data)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Navigation className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-900">Live-Tracking</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative">
          {/* Mock Map */}
          <div className="h-96 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
            {/* Simplified map visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mb-4 animate-pulse mx-auto">
                  <MapPin className="w-12 h-12 text-white" />
                </div>
                <p className="text-gray-600 text-sm">Live-Position wird aktualisiert...</p>
                <p className="text-gray-500 text-xs mt-1">
                  GPS: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                </p>
              </div>
            </div>

            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="10%"
                y1="50%"
                x2="90%"
                y2="50%"
                stroke="#e5e7eb"
                strokeWidth="4"
                strokeDasharray="10,5"
              />
              <line
                x1="10%"
                y1="50%"
                x2={`${10 + (progress * 0.8)}%`}
                y2="50%"
                stroke="#f97316"
                strokeWidth="4"
              />
            </svg>

            {/* Start marker */}
            <div className="absolute left-[8%] top-1/2 -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              📍 {from}
            </div>

            {/* End marker */}
            <div className="absolute right-[8%] top-1/2 -translate-y-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              🏁 {to}
            </div>
          </div>

          {/* Info Overlay */}
          <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={riderImage}
                  alt={riderName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{riderName}</h3>
                  <p className="text-sm text-gray-600">Fahrer ist unterwegs</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Ankunft</p>
                <p className="text-lg font-bold text-orange-600">{estimatedArrival}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Info */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Fortschritt</span>
              <span className="text-sm font-bold text-orange-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 mb-1">Geschwindigkeit</p>
              <p className="text-lg font-bold text-gray-900">85 km/h</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 mb-1">Verbleibend</p>
              <p className="text-lg font-bold text-gray-900">42 km</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 mb-1">ETA</p>
              <p className="text-lg font-bold text-gray-900">28 Min</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              💡 <strong>Tipp:</strong> Deine Freunde und Familie können diese Fahrt in Echtzeit verfolgen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
