import { Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Datenschutzerklärung</h1>
          </div>

          <p className="text-sm text-gray-500 mb-8">Stand: Februar 2026</p>

          <div className="space-y-8">
            {/* Einleitung */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Einleitung</h2>
              <p className="text-gray-700 leading-relaxed">
                JoinUs nimmt den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
            </section>

            {/* Verantwortlicher */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Verantwortlicher</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>JoinUs GmbH</strong><br />
                  Musterstrasse 123<br />
                  4500 Solothurn<br />
                  Schweiz<br />
                  <br />
                  E-Mail: datenschutz@joinus.ch<br />
                  Tel: +41 32 123 45 67
                </p>
              </div>
            </section>

            {/* Datenerhebung */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-orange-600" />
                3. Welche Daten wir erheben
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">3.1 Bei der Registrierung</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Vorname und Nachname</li>
                    <li>E-Mail-Adresse</li>
                    <li>Telefonnummer</li>
                    <li>Geburtsdatum</li>
                    <li>Wohnort</li>
                    <li>Profilbild (optional)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">3.2 Bei der Nutzung</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Fahrtdaten (Start, Ziel, Zeit, Datum)</li>
                    <li>Fahrzeuginformationen (Marke, Modell, Verbrauch)</li>
                    <li>Buchungsinformationen</li>
                    <li>Bewertungen und Kommentare</li>
                    <li>Zahlungsinformationen (verschlüsselt über Drittanbieter)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">3.3 Automatisch erfasste Daten</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>IP-Adresse</li>
                    <li>Browser-Typ und -Version</li>
                    <li>Betriebssystem</li>
                    <li>Nutzungsdaten (Seitenaufrufe, Verweildauer)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Verwendungszweck */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-orange-600" />
                4. Wofür wir Ihre Daten verwenden
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Bereitstellung und Verbesserung unserer Dienstleistungen</li>
                <li>Vermittlung von Fahrgemeinschaften</li>
                <li>Kommunikation mit Nutzern</li>
                <li>Abwicklung von Zahlungen</li>
                <li>Verhinderung von Betrug und Missbrauch</li>
                <li>Erfüllung gesetzlicher Verpflichtungen</li>
                <li>Personalisierung der Nutzererfahrung</li>
              </ul>
            </section>

            {/* Datenweitergabe */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Weitergabe von Daten</h2>
              <p className="text-gray-700 mb-3">
                Wir geben Ihre personenbezogenen Daten nur in folgenden Fällen an Dritte weiter:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>An andere Nutzer im Rahmen der Fahrtvermittlung (Name, Bewertung, Telefonnummer)</li>
                <li>An Zahlungsdienstleister für die Zahlungsabwicklung</li>
                <li>An IT-Dienstleister für Hosting und technische Unterstützung</li>
                <li>Wenn gesetzlich vorgeschrieben oder behördlich angefordert</li>
              </ul>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-orange-900">
                  <strong>Wichtig:</strong> Wir verkaufen Ihre Daten niemals an Dritte!
                </p>
              </div>
            </section>

            {/* Datensicherheit */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-orange-600" />
                6. Datensicherheit
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Wir verwenden moderne Sicherheitsmaßnahmen zum Schutz Ihrer Daten:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-3">
                <li>SSL/TLS-Verschlüsselung für die Datenübertragung</li>
                <li>Verschlüsselte Speicherung sensibler Daten</li>
                <li>Regelmäßige Sicherheitsupdates</li>
                <li>Zugriffsbeschränkungen für Mitarbeiter</li>
                <li>Regelmäßige Sicherheitsaudits</li>
              </ul>
            </section>

            {/* Ihre Rechte */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-orange-600" />
                7. Ihre Rechte
              </h2>
              <p className="text-gray-700 mb-3">Sie haben folgende Rechte bezüglich Ihrer Daten:</p>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Auskunftsrecht</h4>
                  <p className="text-sm text-gray-600">Sie können jederzeit Auskunft über die von uns gespeicherten Daten verlangen.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Berichtigungsrecht</h4>
                  <p className="text-sm text-gray-600">Sie können die Korrektur unrichtiger Daten verlangen.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Löschungsrecht</h4>
                  <p className="text-sm text-gray-600">Sie können die Löschung Ihrer Daten verlangen.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Widerspruchsrecht</h4>
                  <p className="text-sm text-gray-600">Sie können der Verarbeitung Ihrer Daten widersprechen.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Datenportabilität</h4>
                  <p className="text-sm text-gray-600">Sie können Ihre Daten in einem strukturierten Format erhalten.</p>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Unsere Website verwendet Cookies, um die Funktionalität zu verbessern und das Nutzererlebnis zu optimieren. Sie können Cookies in Ihren Browser-Einstellungen deaktivieren, dies kann jedoch die Funktionalität der Website einschränken.
              </p>
            </section>

            {/* Änderungen */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Änderungen dieser Datenschutzerklärung</h2>
              <p className="text-gray-700 leading-relaxed">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen oder Änderungen unserer Dienstleistungen anzupassen. Die aktuelle Version ist immer auf unserer Website verfügbar.
              </p>
            </section>

            {/* Kontakt */}
            <section className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Kontakt</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Bei Fragen zum Datenschutz können Sie uns jederzeit kontaktieren:
              </p>
              <div className="text-gray-700">
                <p><strong>E-Mail:</strong> datenschutz@joinus.ch</p>
                <p><strong>Tel:</strong> +41 32 123 45 67</p>
                <p><strong>Post:</strong> JoinUs GmbH, Musterstrasse 123, 4500 Solothurn</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
