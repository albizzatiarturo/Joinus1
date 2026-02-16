import { useState } from 'react';
import { Car, Upload, User, Mail, Phone, Calendar, FileText } from 'lucide-react';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  idDocument: File | null;
}

interface RegistrationViewProps {
  onSubmit: (data: RegistrationData) => void;
}

export function RegistrationView({ onSubmit }: RegistrationViewProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    idDocument: null
  });
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, idDocument: file });
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 text-white">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="bg-white p-3 rounded-xl">
              <Car className="w-10 h-10 text-orange-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Willkommen bei JoinUs</h1>
          <p className="text-center text-orange-100">
            Bitte vervollständigen Sie Ihre Registrierung
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 flex items-start gap-2">
              <FileText className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <span>
                Ihre Daten werden sicher gespeichert und von unserem Team überprüft. 
                Nach der Bestätigung erhalten Sie Zugriff auf die Plattform.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vorname *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Max"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nachname *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Muster"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-Mail-Adresse *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="max.muster@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefonnummer *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+41 79 123 45 67"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Geburtsdatum *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                required
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amtlicher Ausweis (ID/Pass) *
            </label>
            <div className="relative">
              <input
                type="file"
                required
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
                id="id-upload"
              />
              <label
                htmlFor="id-upload"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors cursor-pointer"
              >
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">
                  {fileName || 'Klicken Sie hier zum Hochladen'}
                </span>
              </label>
              {fileName && (
                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                  ✓ {fileName}
                </p>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Akzeptierte Formate: JPG, PNG, PDF (max. 10 MB)
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>Hinweis:</strong> Ihre Registrierung wird von unserem Team überprüft. 
              Dies kann 1-2 Werktage dauern. Sie erhalten eine E-Mail, sobald Ihr Konto freigeschaltet wurde.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Registrierung abschicken
          </button>

          <p className="text-xs text-center text-gray-500">
            Mit der Registrierung stimmen Sie unseren Nutzungsbedingungen und 
            Datenschutzrichtlinien zu.
          </p>
        </form>
      </div>
    </div>
  );
}
