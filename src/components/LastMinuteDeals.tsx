import { Zap, Clock } from 'lucide-react';
import { Ride } from '../App';
import { RideCard } from './RideCard';

interface LastMinuteDealsProps {
  rides: Ride[];
  onSelectRide: (ride: Ride) => void;
}

export function LastMinuteDeals({ rides, onSelectRide }: LastMinuteDealsProps) {
  // Filter rides that are within the next 2 hours
  const now = new Date();
  const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  const lastMinuteRides = rides.filter(ride => {
    const rideDateTime = new Date(`${ride.date}T${ride.time}`);
    return rideDateTime >= now && rideDateTime <= twoHoursLater;
  }).map(ride => ({
    ...ride,
    // Apply 20% discount for last-minute deals
    pricePerPerson: Math.round(ride.pricePerPerson * 0.8 * 100) / 100,
    isLastMinute: true
  }));

  if (lastMinuteRides.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Last-Minute Deals</h2>
          <p className="text-sm text-gray-600">Fahrten in den nächsten 2 Stunden - 20% Rabatt!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lastMinuteRides.map((ride) => {
          const rideDateTime = new Date(`${ride.date}T${ride.time}`);
          const minutesUntilDeparture = Math.floor((rideDateTime.getTime() - now.getTime()) / 60000);

          return (
            <div key={ride.id} className="relative">
              {/* Last Minute Badge */}
              <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Zap className="w-3 h-3" />
                -20%
              </div>

              {/* Time until departure */}
              <div className="absolute top-2 left-2 z-10 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-orange-600 flex items-center gap-1 shadow-sm">
                <Clock className="w-3 h-3" />
                In {minutesUntilDeparture} Min
              </div>

              <div className="border-2 border-orange-500 rounded-xl overflow-hidden">
                <RideCard ride={ride} onClick={() => onSelectRide(ride)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
