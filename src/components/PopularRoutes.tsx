import { TrendingUp, ArrowRight } from 'lucide-react';
import { Ride } from '../App';

interface PopularRoute {
  from: string;
  to: string;
  count: number;
  averagePrice: number;
  distance: number;
}

interface PopularRoutesProps {
  rides: Ride[];
  onRouteClick: (from: string, to: string) => void;
}

export function PopularRoutes({ rides, onRouteClick }: PopularRoutesProps) {
  // Calculate popular routes
  const routeMap = new Map<string, { count: number; totalPrice: number; distance: number }>();

  rides.forEach(ride => {
    const key = `${ride.from}-${ride.to}`;
    const existing = routeMap.get(key);
    
    if (existing) {
      existing.count++;
      existing.totalPrice += ride.pricePerPerson;
    } else {
      routeMap.set(key, {
        count: 1,
        totalPrice: ride.pricePerPerson,
        distance: ride.distance || 0
      });
    }
  });

  // Convert to array and sort by count
  const popularRoutes: PopularRoute[] = Array.from(routeMap.entries())
    .map(([key, data]) => {
      const [from, to] = key.split('-');
      return {
        from,
        to,
        count: data.count,
        averagePrice: Math.round(data.totalPrice / data.count * 100) / 100,
        distance: data.distance
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-500 p-2 rounded-lg">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Beliebte Routen</h2>
          <p className="text-sm text-gray-600">Die meistgenutzten Strecken in der Schweiz</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularRoutes.map((route, index) => (
          <button
            key={`${route.from}-${route.to}`}
            onClick={() => onRouteClick(route.from, route.to)}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-500 hover:shadow-lg transition-all text-left group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">{route.from}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  <span className="text-lg font-bold text-gray-900">{route.to}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>🚗 {route.count} Fahrten</span>
                  <span>📍 {route.distance} km</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                #{index + 1}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-sm text-gray-600">Ø Preis pro Person</span>
              <span className="text-lg font-bold text-orange-600">CHF {route.averagePrice.toFixed(2)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
