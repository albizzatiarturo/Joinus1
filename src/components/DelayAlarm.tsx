import { useState, useEffect } from 'react';
import { AlertTriangle, X, Navigation, Clock } from 'lucide-react';

interface TrafficAlert {
  route: string;
  delay: number; // in minutes
  reason: string;
  affectedRides: string[];
}

interface DelayAlarmProps {
  currentRoute?: {
    from: string;
    to: string;
  };
  departureTime?: string;
}

export function DelayAlarm({ currentRoute, departureTime }: DelayAlarmProps) {
  const [alerts, setAlerts] = useState<TrafficAlert[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Simulate traffic monitoring
    // In real app: Connect to traffic API (Google Maps Traffic, TomTom, etc.)
    const checkTraffic = () => {
      if (!currentRoute) return;

      // Mock traffic data
      const mockAlerts: TrafficAlert[] = [
        {
          route: 'Zürich-Bern',
          delay: 15,
          reason: 'Stau auf A1 bei Bern Wankdorf',
          affectedRides: ['2', '3']
        },
        {
          route: 'Basel-Zürich',
          delay: 25,
          reason: 'Unfall auf A3 bei Rheinfelden',
          affectedRides: ['9', '22']
        },
        {
          route: 'Genf-Lausanne',
          delay: 10,
          reason: 'Baustelle auf A1',
          affectedRides: ['7', '21']
        }
      ];

      // Check if current route is affected
      const routeKey = `${currentRoute.from}-${currentRoute.to}`;
      const relevantAlert = mockAlerts.find(alert => 
        routeKey.includes(alert.route.split('-')[0]) || 
        routeKey.includes(alert.route.split('-')[1])
      );

      if (relevantAlert) {
        setAlerts([relevantAlert]);
      }
    };

    checkTraffic();
    const interval = setInterval(checkTraffic, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [currentRoute]);

  if (alerts.length === 0 || dismissed) {
    return null;
  }

  const alert = alerts[0];

  // Calculate recommended departure time
  const getRecommendedTime = () => {
    if (!departureTime) return null;
    
    const [hours, minutes] = departureTime.split(':').map(Number);
    const originalTime = new Date();
    originalTime.setHours(hours, minutes, 0);
    
    const recommendedTime = new Date(originalTime.getTime() - alert.delay * 60000);
    return recommendedTime.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full mx-4">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl shadow-2xl p-5 animate-pulse">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg">⚠️ Verspätungs-Alarm</h3>
              <button
                onClick={() => setDismissed(true)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-white/95 mb-3">{alert.reason}</p>
            
            <div className="bg-white/20 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">Voraussichtliche Verzögerung: +{alert.delay} Minuten</span>
              </div>
              
              {getRecommendedTime() && (
                <div className="flex items-center gap-2 text-sm">
                  <Navigation className="w-4 h-4" />
                  <span>
                    Empfehlung: Fahre um <strong>{getRecommendedTime()}</strong> statt {departureTime} ab
                  </span>
                </div>
              )}
            </div>
            
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  // In real app: Open Google Maps with alternative route
                  alert('Alternative Route wird in Google Maps geöffnet...');
                }}
                className="flex-1 px-4 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-white/90 transition-colors text-sm"
              >
                Alternative Route
              </button>
              <button
                onClick={() => {
                  // In real app: Notify passengers
                  alert('Mitfahrer werden über Verspätung informiert');
                  setDismissed(true);
                }}
                className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors text-sm"
              >
                Mitfahrer informieren
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
