import { Ride } from '../App';
import { RideCard } from './RideCard';
import { Calendar, Car } from 'lucide-react';

interface MyRidesViewProps {
  rides: Ride[];
  onSelectRide: (ride: Ride) => void;
}

export function MyRidesView({ rides, onSelectRide }: MyRidesViewProps) {
  // Mock: Filter rides where the current user is the driver
  const myOfferedRides = rides.filter(ride => ride.driver === 'Anna Müller');
  
  // Mock: Rides the user has booked (in a real app, this would come from a database)
  const myBookedRides: Ride[] = [
    {
      id: 'booked-1',
      from: 'Bern',
      to: 'Zürich',
      date: '2026-01-24',
      time: '18:00',
      driver: 'Markus Weber',
      availableSeats: 2,
      totalSeats: 3,
      pricePerPerson: 12,
      recurring: false,
      description: 'Rückfahrt nach Zürich'
    }
  ];

  return (
    <div className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        {/* Offered Rides */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Car className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Meine angebotenen Fahrten ({myOfferedRides.length})
            </h2>
          </div>
          
          {myOfferedRides.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Sie haben noch keine Fahrten angeboten.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myOfferedRides.map((ride) => (
                <RideCard 
                  key={ride.id} 
                  ride={ride} 
                  onClick={() => onSelectRide(ride)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Booked Rides */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Gebuchte Fahrten ({myBookedRides.length})
            </h2>
          </div>
          
          {myBookedRides.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Sie haben noch keine Fahrten gebucht.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myBookedRides.map((ride) => (
                <RideCard 
                  key={ride.id} 
                  ride={ride} 
                  onClick={() => onSelectRide(ride)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}