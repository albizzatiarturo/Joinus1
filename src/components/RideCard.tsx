import { Ride } from '../App';
import { MapPin, Clock, User, Users, Repeat, ChevronRight, Car, Navigation } from 'lucide-react';
import { VerifiedBadge } from './VerifiedBadge';
import { SpecialBadges } from './SpecialBadges';

interface RideCardProps {
  ride: Ride;
  onClick: () => void;
}

export function RideCard({ ride, onClick }: RideCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-CH', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getFuelTypeIcon = (fuelType?: string) => {
    if (!fuelType) return '🚗';
    const icons: { [key: string]: string } = {
      petrol: '⛽',
      diesel: '🛢️',
      electric: '🔌',
      hybrid: '🔋'
    };
    return icons[fuelType] || '🚗';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start gap-3">
            {/* Driver Profile Image */}
            {ride.driverImage && (
              <div className="flex-shrink-0 relative">
                <img
                  src={ride.driverImage}
                  alt={ride.driver}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                />
                {/* Verified badge on profile image */}
                {ride.driverVerified && (
                  <div className="absolute -bottom-1 -right-1">
                    <VerifiedBadge size="sm" />
                  </div>
                )}
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900">{ride.from}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-semibold text-gray-900">{ride.to}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(ride.date)} • {ride.time}</span>
                </div>
                {ride.distance && (
                  <div className="flex items-center gap-1 text-orange-600 font-medium">
                    <Navigation className="w-4 h-4" />
                    <span>{ride.distance} km</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>{ride.driver}</span>
                  {ride.driverVerified && <VerifiedBadge size="sm" />}
                </div>
                {ride.recurring && (
                  <div className="flex items-center gap-1 text-orange-600">
                    <Repeat className="w-4 h-4" />
                    <span>Regelmässig</span>
                  </div>
                )}
              </div>

              {/* Special Badges */}
              <SpecialBadges
                womensOnly={ride.womensOnly}
                childFriendly={ride.childFriendly}
                packageDelivery={ride.packageDelivery}
                eventType={ride.eventType}
                size="sm"
              />

              {/* Vehicle Information */}
              {ride.vehicle && (
                <div className="flex items-center gap-2 mt-2 text-sm bg-gray-50 px-3 py-1.5 rounded-lg w-fit">
                  <span className="text-lg">{getFuelTypeIcon(ride.vehicle.fuelType)}</span>
                  <Car className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700 font-medium">{ride.vehicle.model}</span>
                  {ride.vehicle.color && (
                    <span className="text-gray-500">• {ride.vehicle.color}</span>
                  )}
                </div>
              )}

              {ride.recurring && ride.recurringDays && (
                <div className="flex gap-1 mt-2">
                  {ride.recurringDays.map((day) => (
                    <span
                      key={day}
                      className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 md:flex-col md:items-end">
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">
              CHF {ride.pricePerPerson.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">pro Person</div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">
              {ride.availableSeats} von {ride.totalSeats} frei
            </span>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-400 hidden md:block" />
        </div>
      </div>
    </div>
  );
}