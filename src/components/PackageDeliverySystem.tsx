import { Package, MapPin, Calendar, User, Phone, X } from 'lucide-react';
import { useState } from 'react';

interface PackageDelivery {
  id: string;
  from: string;
  to: string;
  packageSize: 'small' | 'medium' | 'large';
  description: string;
  sender: string;
  senderPhone: string;
  recipient: string;
  recipientPhone: string;
  pickupDate: string;
  deliveryDate: string;
  price: number;
  status: 'pending' | 'in-transit' | 'delivered';
}

interface PackageDeliverySystemProps {
  onRequestDelivery: (delivery: Partial<PackageDelivery>) => void;
}

export function PackageDeliverySystem({ onRequestDelivery }: PackageDeliverySystemProps) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    packageSize: 'medium' as const,
    description: '',
    recipient: '',
    recipientPhone: '',
    pickupDate: ''
  });

  const handleSubmit = () => {
    onRequestDelivery(formData);
    setShowModal(false);
    setFormData({
      from: '',
      to: '',
      packageSize: 'medium',
      description: '',
      recipient: '',
      recipientPhone: '',
      pickupDate: ''
    });
  };

  const getSizeInfo = (size: string) => {
    const sizeInfo = {
      small: { label: 'Klein', desc: 'bis 30x30x30cm, max 5kg', emoji: '📦', price: 'CHF 5-10' },
      medium: { label: 'Mittel', desc: 'bis 50x50x50cm, max 15kg', emoji: '📦📦', price: 'CHF 10-20' },
      large: { label: 'Gross', desc: 'bis 80x80x80cm, max 30kg', emoji: '📦📦📦', price: 'CHF 20-40' }
    };
    return sizeInfo[size as keyof typeof sizeInfo];
  };

  return (
    <>
      {/* Feature Card */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Package className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">📦 Paket-Mitnahme Service</h3>
            <p className="text-gray-700 mb-4">
              Sende Pakete günstig und umweltfreundlich mit Fahrern, die sowieso in deine Richtung fahren!
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {(['small', 'medium', 'large'] as const).map((size) => {
                const info = getSizeInfo(size);
                return (
                  <div key={size} className="bg-white rounded-lg p-3 border border-purple-200">
                    <div className="text-2xl mb-1">{info.emoji}</div>
                    <div className="font-semibold text-gray-900">{info.label}</div>
                    <div className="text-xs text-gray-600 mb-1">{info.desc}</div>
                    <div className="text-sm font-bold text-purple-600">{info.price}</div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Paket-Transport anfragen
            </button>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">Paket-Transport anfragen</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Route */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Von (Abholung)
                  </label>
                  <input
                    type="text"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    placeholder="z.B. Zürich"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Nach (Lieferung)
                  </label>
                  <input
                    type="text"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    placeholder="z.B. Bern"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Package Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Package className="w-4 h-4 inline mr-1" />
                  Paketgrösse
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['small', 'medium', 'large'] as const).map((size) => {
                    const info = getSizeInfo(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setFormData({ ...formData, packageSize: size })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.packageSize === size
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{info.emoji}</div>
                        <div className="font-semibold text-gray-900 text-sm">{info.label}</div>
                        <div className="text-xs text-gray-600 mt-1">{info.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paketbeschreibung
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Was ist im Paket? (z.B. Bücher, Kleidung, Elektronik...)"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Recipient Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Empfänger Name
                  </label>
                  <input
                    type="text"
                    value={formData.recipient}
                    onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                    placeholder="Name des Empfängers"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Empfänger Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.recipientPhone}
                    onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                    placeholder="+41 79 123 45 67"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Pickup Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Gewünschtes Abholdatum
                </label>
                <input
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>ℹ️ So funktioniert's:</strong><br/>
                  1. Du gibst die Paketdetails ein<br/>
                  2. Wir finden Fahrer auf dieser Route<br/>
                  3. Fahrer bringt dein Paket mit<br/>
                  4. Bezahlung erfolgt über JoinUs (70% günstiger als Post!)
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors font-semibold"
              >
                Anfrage senden
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
