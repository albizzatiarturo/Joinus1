import { useState } from 'react';
import { CheckCircle, Circle, MapPin, Clock } from 'lucide-react';

interface CheckInOutSystemProps {
  rideInfo: {
    from: string;
    to: string;
    driverName: string;
    time: string;
  };
  onCheckIn: () => void;
  onCheckOut: () => void;
}

export function CheckInOutSystem({ rideInfo, onCheckIn, onCheckOut }: CheckInOutSystemProps) {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);

  const handleCheckIn = () => {
    setCheckedIn(true);
    setCheckInTime(new Date());
    onCheckIn();
  };

  const handleCheckOut = () => {
    setCheckedOut(true);
    setCheckOutTime(new Date());
    onCheckOut();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Fahrt-Status</h3>

      <div className="space-y-4">
        {/* Check-In */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            {checkedIn ? (
              <CheckCircle className="w-6 h-6 text-green-500 fill-green-500" />
            ) : (
              <Circle className="w-6 h-6 text-gray-300" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium text-gray-900">Check-In am Startpunkt</h4>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {rideInfo.from}
                </p>
                {checkInTime && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ Eingecheckt um {checkInTime.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
              {!checkedIn && (
                <button
                  onClick={handleCheckIn}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
                >
                  Einchecken
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Divider with travel time */}
        <div className="flex items-center gap-3 ml-3">
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Fahrzeit: ca. {rideInfo.time}</span>
          </div>
        </div>

        {/* Check-Out */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            {checkedOut ? (
              <CheckCircle className="w-6 h-6 text-green-500 fill-green-500" />
            ) : (
              <Circle className="w-6 h-6 text-gray-300" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium text-gray-900">Check-Out am Ziel</h4>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {rideInfo.to}
                </p>
                {checkOutTime && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ Ausgecheckt um {checkOutTime.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
              {checkedIn && !checkedOut && (
                <button
                  onClick={handleCheckOut}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
                >
                  Auschecken
                </button>
              )}
              {!checkedIn && (
                <button
                  disabled
                  className="px-4 py-2 bg-gray-200 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  Auschecken
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {checkedOut && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-900 font-medium text-center">
            ✅ Fahrt erfolgreich abgeschlossen!
          </p>
          <p className="text-sm text-green-700 text-center mt-1">
            Danke, dass du JoinUs nutzt. Sichere Fahrt! 🚗
          </p>
        </div>
      )}

      {!checkedOut && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-900">
            💡 <strong>Sicherheitshinweis:</strong> Check-In und Check-Out helfen uns, deine Sicherheit zu gewährleisten. Deine Notfallkontakte werden automatisch benachrichtigt, wenn du nicht rechtzeitig auscheckst.
          </p>
        </div>
      )}
    </div>
  );
}
