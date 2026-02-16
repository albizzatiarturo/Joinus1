import { Shield, CheckCircle, Lock, UserCheck, AlertTriangle, Phone } from 'lucide-react';

export function Safety() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-900">Sicherheit bei JoinUs</h1>
          </div>
          <p className="text-lg text-gray-600">
            Deine Sicherheit ist unsere höchste Priorität
          </p>
        </div>

        <div className="space-y-8">
          {/* Intro */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <p className="text-gray-700 leading-relaxed text-lg">
              Bei JoinUs nehmen wir Sicherheit ernst. Wir haben umfassende Maßnahmen implementiert, um sicherzustellen, dass du vertrauensvoll und geschützt mitfahren oder Fahrten anbieten kannst.
            </p>
          </div>

          {/* Verification */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-8 h-8 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Verifizierung</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Identitätsprüfung</h3>
                  <p className="text-gray-700">
                    Alle Nutzer müssen sich mit einem gültigen Ausweisdokument (Pass oder ID) verifizieren. Unser Team prüft jede Registrierung manuell.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Führerscheinprüfung</h3>
                  <p className="text-gray-700">
                    Fahrer müssen einen gültigen Führerschein vorweisen. Wir überprüfen die Gültigkeit und speichern die Daten verschlüsselt.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Telefonnummer-Verifizierung</h3>
                  <p className="text-gray-700">
                    Jede Telefonnummer wird per SMS-Code verifiziert, um sicherzustellen, dass du erreichbar bist.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bewertungssystem */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Bewertungssystem</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nach jeder Fahrt können sich Fahrer und Mitfahrer gegenseitig bewerten. Dies schafft Transparenz und Vertrauen innerhalb der Community.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex text-orange-400">
                  {'★'.repeat(5)}
                </div>
                <span className="text-sm text-gray-700">5-Sterne-Bewertungssystem</span>
              </div>
              <p className="text-sm text-gray-600">
                Nutzer mit wiederholt schlechten Bewertungen werden automatisch überprüft und können bei Verstößen gesperrt werden.
              </p>
            </div>
          </div>

          {/* Datenschutz */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Datenschutz & Verschlüsselung</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">SSL/TLS-Verschlüsselung</h3>
                  <p className="text-gray-700">
                    Alle Datenübertragungen sind mit modernster SSL/TLS-Technologie verschlüsselt.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Datenschutz-konform</h3>
                  <p className="text-gray-700">
                    Wir halten uns strikt an die Schweizer Datenschutzgesetze und geben deine Daten niemals an Dritte weiter.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Sichere Zahlungen</h3>
                  <p className="text-gray-700">
                    Zahlungsdaten werden ausschließlich über zertifizierte Zahlungsdienstleister (PCI-DSS konform) verarbeitet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Versicherung */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Versicherungsschutz</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Jede Fahrt ist durch die Kfz-Haftpflichtversicherung des Fahrers abgedeckt. Diese deckt:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Personenschäden bei Unfällen</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Sachschäden an Dritten</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Vermögensschäden</span>
              </li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-900">
                <strong>Empfehlung:</strong> Wir empfehlen allen Nutzern, eine private Unfallversicherung abzuschließen.
              </p>
            </div>
          </div>

          {/* Sicherheitstipps */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Sicherheitstipps</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Für Mitfahrer</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Prüfe das Profil und die Bewertungen des Fahrers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Teile Freunden/Familie mit, wann und mit wem du fährst</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Vertraue deinem Bauchgefühl – bei Unbehagen die Fahrt absagen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Schnalle dich immer an</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Für Fahrer</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Überprüfe dein Fahrzeug regelmäßig auf Verkehrssicherheit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Halte dich an alle Verkehrsregeln und Geschwindigkeitsbegrenzungen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Fahre niemals unter Einfluss von Alkohol oder Drogen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Mache ausreichend Pausen bei langen Fahrten</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl shadow-lg p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="w-8 h-8" />
              <h2 className="text-2xl font-bold">24/7 Support</h2>
            </div>
            <p className="text-orange-50 mb-6 leading-relaxed">
              Unser Support-Team ist rund um die Uhr für dich erreichbar. Bei Problemen oder Notfällen während einer Fahrt kannst du uns jederzeit kontaktieren.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-orange-100 mb-1">Notfall-Hotline</p>
                <a href="tel:+41321234567" className="text-xl font-bold hover:text-orange-100 transition-colors">
                  +41 32 123 45 67
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-orange-100 mb-1">E-Mail Support</p>
                <a href="mailto:support@joinus.ch" className="text-xl font-bold hover:text-orange-100 transition-colors break-all">
                  support@joinus.ch
                </a>
              </div>
            </div>
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-orange-100 mb-1">Live-Chat</p>
              <p className="text-white">Klicke auf das Chat-Symbol unten rechts für sofortige Hilfe</p>
            </div>
          </div>

          {/* Notfallnummern */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-900 mb-4">Wichtige Notfallnummern Schweiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <p className="text-sm text-gray-600 mb-1">Polizei</p>
                <a href="tel:117" className="text-2xl font-bold text-red-600 hover:text-red-700">
                  117
                </a>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <p className="text-sm text-gray-600 mb-1">Ambulanz</p>
                <a href="tel:144" className="text-2xl font-bold text-red-600 hover:text-red-700">
                  144
                </a>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <p className="text-sm text-gray-600 mb-1">Feuerwehr</p>
                <a href="tel:118" className="text-2xl font-bold text-red-600 hover:text-red-700">
                  118
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
