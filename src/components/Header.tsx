import { Car, Plus } from 'lucide-react';
import logo from 'figma:asset/919c689e1e910dcd8bee9571561898173173a8aa.png';

interface HeaderProps {
  onOfferRide: () => void;
}

export function Header({ onOfferRide }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Spacer for centering logo */}
          <div className="flex-1"></div>
          
          {/* Centered Logo */}
          <div className="flex items-center justify-center">
            <img 
              src={logo} 
              alt="JoinUs Logo" 
              className="h-40 sm:h-48 w-auto"
              style={{ mixBlendMode: 'multiply', backgroundColor: 'transparent' }}
            />
          </div>

          {/* Button on the right */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={onOfferRide}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Fahrt anbieten</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}