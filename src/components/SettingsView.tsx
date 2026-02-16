import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, X, CreditCard, Wallet } from 'lucide-react';

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

interface SettingsViewProps {
  userData: UserData;
  onSave: (data: UserData) => void;
  onClose: () => void;
}

export function SettingsView({ userData, onSave, onClose }: SettingsViewProps) {
  const [formData, setFormData] = useState<UserData>(userData);
  const [imagePreview, setImagePreview] = useState<string | null>(userData.profileImage);

  const paymentOptions = [
    { id: 'twint', name: 'TWINT', icon: '📱' },
    { id: 'card', name: 'Kreditkarte', icon: '💳' },
    { id: 'debit', name: 'Debitkarte', icon: '💳' },
    { id: 'cash', name: 'Bargeld', icon: '💵' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' }
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, profileImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof UserData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const togglePaymentMethod = (methodId: string) => {
    const currentMethods = formData.paymentMethods || [];
    const newMethods = currentMethods.includes(methodId)
      ? currentMethods.filter(m => m !== methodId)
      : [...currentMethods, methodId];
    setFormData({ ...formData, paymentMethods: newMethods });
  };

  return (
    <div className="pb-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Einstellungen</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 pb-8">{/* Added pb-8 */}
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-4 pb-6 border-b border-gray-200">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-orange-100">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Profilbild" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              <label 
                htmlFor="profile-image" 
                className="absolute bottom-0 right-0 bg-orange-600 text-white p-3 rounded-full cursor-pointer hover:bg-orange-700 transition-colors shadow-lg"
              >
                <Camera className="w-5 h-5" />
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">Klicken Sie auf die Kamera, um ein Profilbild hochzuladen</p>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Persönliche Informationen</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vorname
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nachname
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-Mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefonnummer
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stadt
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Geburtsdatum
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-orange-600" />
              Zahlungsmethoden
            </h3>
            <p className="text-sm text-gray-600">
              Wählen Sie die Zahlungsmethoden aus, die Sie für Fahrten akzeptieren möchten.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentOptions.map((option) => {
                const isSelected = (formData.paymentMethods || []).includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => togglePaymentMethod(option.id)}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">{option.name}</div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}