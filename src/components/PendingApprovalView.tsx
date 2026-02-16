import logo from 'figma:asset/919c689e1e910dcd8bee9571561898173173a8aa.png';
import { Clock, CheckCircle, Mail } from 'lucide-react';

interface PendingApprovalViewProps {
  email: string;
}

export function PendingApprovalView({ email }: PendingApprovalViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 text-white">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="bg-white p-3 rounded-xl">
              <img 
                src={logo} 
                alt="JoinUs Logo" 
                className="w-14 h-14"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center">JoinUs</h1>
        </div>

        {/* Content */}
        <div className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-orange-100 p-6 rounded-full">
              <Clock className="w-16 h-16 text-orange-500" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Registrierung erfolgreich eingereicht
            </h2>
            <p className="text-gray-600">
              Vielen Dank für Ihre Registrierung!
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-left space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Daten erhalten</p>
                <p className="text-sm text-gray-600">
                  Ihre Registrierungsdaten wurden erfolgreich übermittelt.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Überprüfung läuft</p>
                <p className="text-sm text-gray-600">
                  Unser Team überprüft aktuell Ihre Angaben und den hochgeladenen Ausweis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Benachrichtigung per E-Mail</p>
                <p className="text-sm text-gray-600">
                  Sie erhalten eine Bestätigung an <strong>{email}</strong>, 
                  sobald Ihr Konto freigeschaltet wurde.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>Bearbeitungszeit:</strong> Die Überprüfung dauert in der Regel 1-2 Werktage. 
              Bei Rückfragen kontaktieren wir Sie per E-Mail.
            </p>
          </div>

          {/* Demo Button - nur für Demozwecke */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3">
              Demo-Version: Klicken Sie hier, um die App trotzdem anzusehen
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium underline"
            >
              Zur App (Demo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}