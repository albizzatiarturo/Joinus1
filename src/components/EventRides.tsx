import { Calendar, Music, MapPin, Users, Ticket } from 'lucide-react';
import { Ride } from '../App';
import { RideCard } from './RideCard';

interface EventRidesProps {
  rides: Ride[];
  onSelectRide: (ride: Ride) => void;
}

interface EventCategory {
  name: string;
  icon: string;
  color: string;
  gradient: string;
}

const eventCategories: { [key: string]: EventCategory } = {
  'Konzert': { name: 'Konzert', icon: '🎵', color: 'purple', gradient: 'from-purple-500 to-pink-500' },
  'Festival': { name: 'Festival', icon: '🎪', color: 'orange', gradient: 'from-orange-500 to-red-500' },
  'Sport': { name: 'Sport-Event', icon: '⚽', color: 'green', gradient: 'from-green-500 to-teal-500' },
  'Messe': { name: 'Messe', icon: '🏢', color: 'blue', gradient: 'from-blue-500 to-cyan-500' },
  'Theater': { name: 'Theater', icon: '🎭', color: 'indigo', gradient: 'from-indigo-500 to-purple-500' }
};

export function EventRides({ rides, onSelectRide }: EventRidesProps) {
  // Filter rides that have an eventType
  const eventRides = rides.filter(ride => ride.eventType);

  if (eventRides.length === 0) {
    return null;
  }

  // Group rides by event type
  const groupedEvents = eventRides.reduce((acc, ride) => {
    const type = ride.eventType || 'Sonstiges';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(ride);
    return acc;
  }, {} as { [key: string]: Ride[] });

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
          <Ticket className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🎉 Event-Fahrten</h2>
          <p className="text-sm text-gray-600">Fahrten zu Konzerten, Festivals, Sport-Events & mehr</p>
        </div>
      </div>

      {/* Event Categories Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {Object.entries(groupedEvents).map(([eventType, eventRides]) => {
          const category = eventCategories[eventType] || { 
            name: eventType, 
            icon: '🎉', 
            color: 'gray',
            gradient: 'from-gray-500 to-gray-600'
          };
          
          return (
            <div
              key={eventType}
              className={`bg-gradient-to-r ${category.gradient} text-white rounded-lg p-4 text-center`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-semibold text-sm">{category.name}</div>
              <div className="text-xs mt-1 opacity-90">{eventRides.length} Fahrten</div>
            </div>
          );
        })}
      </div>

      {/* Event Rides by Category */}
      <div className="space-y-6">
        {Object.entries(groupedEvents).map(([eventType, eventRides]) => {
          const category = eventCategories[eventType] || { 
            name: eventType, 
            icon: '🎉', 
            color: 'gray',
            gradient: 'from-gray-500 to-gray-600'
          };

          return (
            <div key={eventType}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                <span className="text-sm text-gray-500">({eventRides.length})</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventRides.map((ride) => (
                  <div key={ride.id} className="relative">
                    {/* Event Badge */}
                    <div className={`absolute -top-2 -right-2 z-10 bg-gradient-to-r ${category.gradient} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg`}>
                      <span>{category.icon}</span>
                      {ride.eventName && <span>{ride.eventName}</span>}
                    </div>
                    
                    <div className={`border-2 border-${category.color}-500 rounded-xl overflow-hidden`}>
                      <RideCard ride={ride} onClick={() => onSelectRide(ride)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Ticket className="w-5 h-5 text-orange-600" />
          Event-Fahrten - So funktioniert's
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-orange-500">•</span>
            <span><strong>Automatische Gruppierung:</strong> Fahrten zum gleichen Event werden zusammengefasst</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500">•</span>
            <span><strong>Meet-up Points:</strong> Gemeinsame Treffpunkte für Event-Besucher</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500">•</span>
            <span><strong>Rückfahrt-Option:</strong> Buche Hin- und Rückfahrt direkt zusammen</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500">•</span>
            <span><strong>Event-Community:</strong> Lerne andere Fans/Besucher kennen</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
