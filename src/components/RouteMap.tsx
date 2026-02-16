import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface RouteMapProps {
  from: string;
  to: string;
}

export function RouteMap({ from, to }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Google Maps wird hier geladen
    // Für eine echte Integration benötigen Sie einen Google Maps API-Schlüssel
    // Fügen Sie Ihren API-Schlüssel in die URL ein:
    // https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places
    
    if (mapRef.current && from && to) {
      // Mock implementation - replace with actual Google Maps API
      console.log('Loading route from', from, 'to', to);
    }
  }, [from, to]);

  // Create iframe URL for embedded Google Maps
  const getMapUrl = () => {
    if (!from || !to) {
      return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172184.38913114993!2d7.285156!3d47.054493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e39c0d43a1b77%3A0x6f7b5f3c3c9c0c0!2sBern%2C%20Switzerland!5e0!3m2!1sen!2s!4v1234567890';
    }
    
    const origin = encodeURIComponent(from);
    const destination = encodeURIComponent(to);
    
    // Embedded Google Maps with directions
    return `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY_HERE&origin=${origin}&destination=${destination}&mode=driving`;
  };

  if (!from && !to) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="font-semibold text-gray-900 mb-2">Route auf der Karte anzeigen</h3>
        <p className="text-sm text-gray-600">
          Geben Sie Start- und Zielort ein, um die Route anzuzeigen
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <h3 className="font-semibold">Route: {from} → {to}</h3>
        </div>
      </div>
      
      <div className="relative w-full h-[400px] bg-gray-100">
        {/* Mock Map - Replace with actual Google Maps integration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <MapPin className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Kartenvorschau</h4>
            <p className="text-sm text-gray-600 mb-4">
              Route: {from} → {to}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-xs text-blue-800">
                <strong>Hinweis:</strong> Um Google Maps vollständig zu integrieren, 
                fügen Sie Ihren Google Maps API-Schlüssel hinzu.
              </p>
              <p className="text-xs text-blue-700 mt-2">
                API-Schlüssel erhalten Sie unter: <br />
                <a 
                  href="https://developers.google.com/maps/documentation/javascript/get-api-key" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Google Maps Platform
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Uncomment this section when you have a Google Maps API key */}
        {/*
        <iframe
          ref={mapRef}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={getMapUrl()}
        ></iframe>
        */}
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Von: <strong>{from}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Nach: <strong>{to}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
