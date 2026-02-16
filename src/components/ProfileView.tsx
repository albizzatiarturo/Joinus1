import { User, Mail, Phone, MapPin, Settings, LogOut, Star, Award, Car } from 'lucide-react';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  birthDate: string;
  profileImage: string | null;
  paymentMethods: string[];
}

interface ProfileViewProps {
  userData: UserData;
  onSettingsClick: () => void;
  onVehiclesClick: () => void;
}

export function ProfileView({ userData, onSettingsClick, onVehiclesClick }: ProfileViewProps) {
  // Mock user data
  const user = {
    name: `${userData.firstName} ${userData.lastName}`,
    email: userData.email,
    phone: userData.phone,
    city: userData.city,
    memberSince: 'Januar 2024',
    rating: 4.8,
    totalRides: 24,
    co2Saved: 156 // kg
  };

  return (
    <div className="pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
              {userData.profileImage ? (
                <img 
                  src={userData.profileImage} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-orange-600" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                <span className="text-sm">{user.rating} Bewertung</span>
              </div>
              <p className="text-sm text-orange-100 mt-1">
                Mitglied seit {user.memberSince}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 p-6 border-b border-gray-200">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{user.totalRides}</div>
            <div className="text-sm text-gray-600 mt-1">Gesamte Fahrten</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{user.co2Saved} kg</div>
            <div className="text-sm text-gray-600 mt-1">CO₂ eingespart</div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-6 space-y-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Kontaktinformationen</h3>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-sm text-gray-500">E-Mail</div>
              <div className="text-gray-900">{user.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-sm text-gray-500">Telefon</div>
              <div className="text-gray-900">{user.phone}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-sm text-gray-500">Stadt</div>
              <div className="text-gray-900">{user.city}</div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        {userData.paymentMethods && userData.paymentMethods.length > 0 && (
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Akzeptierte Zahlungsmethoden</h3>
            <div className="flex flex-wrap gap-2">
              {userData.paymentMethods.includes('twint') && (
                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  📱 TWINT
                </span>
              )}
              {userData.paymentMethods.includes('card') && (
                <span className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  💳 Kreditkarte
                </span>
              )}
              {userData.paymentMethods.includes('debit') && (
                <span className="bg-gray-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  💳 Debitkarte
                </span>
              )}
              {userData.paymentMethods.includes('cash') && (
                <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  💵 Bargeld
                </span>
              )}
              {userData.paymentMethods.includes('paypal') && (
                <span className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  🅿️ PayPal
                </span>
              )}
            </div>
          </div>
        )}

        {/* Achievements */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Erfolge</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <Award className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-900">Eco Warrior</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-900">Top Fahrer</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 space-y-2">
          <button 
            onClick={onVehiclesClick}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Meine Fahrzeuge</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button 
            onClick={onSettingsClick}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Einstellungen</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors text-red-600">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              <span>Abmelden</span>
            </div>
            <span className="text-red-400">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}