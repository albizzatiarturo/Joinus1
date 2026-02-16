import { useState } from 'react';
import { AlertTriangle, Phone, MapPin, X } from 'lucide-react';

interface SOSButtonProps {
  riderId: string;
  rideInfo: {
    from: string;
    to: string;
    driverName: string;
  };
}

export function SOSButton({ riderId, rideInfo }: SOSButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const handleActivate = () => {
    setIsActivated(true);
    setShowConfirm(false);
    
    // In real app: Send emergency alert with GPS coordinates
    console.log('SOS activated!', {
      riderId,
      rideInfo,
      timestamp: new Date(),
      gps: { lat: 47.0502, lng: 8.3093 }
    });

    // Show confirmation
    setTimeout(() => {
      alert('Notfall gemeldet! Die Behörden wurden benachrichtigt und deine Notfallkontakte erhalten eine SMS mit deinem Standort.');
    }, 500);
  };

  if (isActivated) {
    return (
      <div className="fixed bottom-24 right-4 z-40 bg-red-500 text-white px-6 py-3 rounded-full shadow-2xl animate-pulse">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-bold">Notfall aktiviert</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="fixed bottom-24 right-4 z-40 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110"
        title="Notfall-Alarm"
      >
        <AlertTriangle className="w-6 h-6" />
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="bg-red-600 text-white px-6 py-4 rounded-t-xl">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8" />
                <h2 className="text-xl font-bold">Notfall-Alarm</h2>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-900 font-semibold mb-2">
                  ⚠️ Bist du in einer Notlage?
                </p>
                <p className="text-sm text-red-800">
                  Bei Aktivierung werden sofort:
                </p>
                <ul className="text-sm text-red-800 mt-2 space-y-1 ml-4">
                  <li>• Die Polizei benachrichtigt (117)</li>
                  <li>• Deine GPS-Position übermittelt</li>
                  <li>• Notfallkontakte per SMS informiert</li>
                  <li>• JoinUs-Support alarmiert</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Aktuelle Fahrt</p>
                    <p className="text-gray-600">{rideInfo.from} → {rideInfo.to}</p>
                    <p className="text-gray-600">Fahrer: {rideInfo.driverName}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-900">
                  💡 Für nicht-dringende Anliegen nutze bitte den Live-Support oder kontaktiere den Fahrer direkt.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Abbrechen
              </button>
              <button
                onClick={handleActivate}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Notruf 117
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
