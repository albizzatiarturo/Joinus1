import { Ride } from '../App';
import { RideCard } from './RideCard';
import { LastMinuteDeals } from './LastMinuteDeals';
import { PopularRoutes } from './PopularRoutes';
import { EventRides } from './EventRides';

interface RidesListProps {
  rides: Ride[];
  onSelectRide: (ride: Ride) => void;
}

export function RidesList({ rides, onSelectRide }: RidesListProps) {
  const handleRouteClick = (from: string, to: string) => {
    // This would trigger a search for this route
    console.log(`Search for route: ${from} -> ${to}`);
    // In a real app, this would call onSearch handler
  };

  if (rides.length === 0) {
    return (
      <div className="space-y-8">
        <PopularRoutes rides={rides} onRouteClick={handleRouteClick} />
        <div className="text-center py-12">
          <p className="text-gray-500">Keine Fahrten gefunden. Versuchen Sie eine andere Suche.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Event Rides Section */}
      <EventRides rides={rides} onSelectRide={onSelectRide} />

      {/* Last Minute Deals Section */}
      <LastMinuteDeals rides={rides} onSelectRide={onSelectRide} />

      {/* Popular Routes */}
      <PopularRoutes rides={rides} onRouteClick={handleRouteClick} />

      {/* Regular Rides List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Alle Fahrten ({rides.length})
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {rides.map((ride) => (
            <RideCard 
              key={ride.id} 
              ride={ride} 
              onClick={() => onSelectRide(ride)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}