import { FileText, AlertCircle, Shield, Users, Car, CreditCard } from 'lucide-react';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Allgemeine Geschäftsbedingungen (AGB)</h1>
          </div>

          <p className="text-sm text-gray-500 mb-8">Stand: Februar 2026</p>

          <div className="space-y-8">
            {/* Geltungsbereich */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Geltungsbereich</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") regeln die Nutzung der Plattform JoinUs, betrieben von der JoinUs GmbH, Musterstrasse 123, 4500 Solothurn, Schweiz.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Mit der Registrierung und Nutzung der Plattform akzeptieren Sie diese AGB in ihrer jeweils gültigen Fassung.
              </p>
            </section>

            {/* Leistungsbeschreibung */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Car className="w-6 h-6 text-orange-600" />
                2. Leistungsbeschreibung
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                JoinUs ist eine Online-Plattform zur Vermittlung von Fahrgemeinschaften. Die Plattform ermöglicht es:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Fahrten anzubieten und freie Plätze im eigenen Fahrzeug zu teilen</li>
                <li>Nach verfügbaren Fahrten zu suchen und diese zu buchen</li>
                <li>Sich an den Fahrtkosten fair zu beteiligen</li>
                <li>Mit anderen Nutzern zu kommunizieren</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-900">
                  <strong>Wichtig:</strong> JoinUs ist lediglich Vermittler und nicht Vertragspartei der zwischen Fahrer und Mitfahrer geschlossenen Beförderungsverträge.
                </p>
              </div>
            </section>

            {/* Registrierung */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-orange-600" />
                3. Registrierung und Nutzerkonto
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">3.1 Voraussetzungen</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Mindestalter: 18 Jahre</li>
                    <li>Wahrheitsgemäße Angaben bei der Registrierung</li>
                    <li>Gültige E-Mail-Adresse und Telefonnummer</li>
                    <li>Für Fahrer: Gültiger Führerschein und Fahrzeugversicherung</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">3.2 Pflichten des Nutzers</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Geheimhaltung der Zugangsdaten</li>
                    <li>Sofortige Meldung bei unbefugter Nutzung</li>
                    <li>Aktualisierung der persönlichen Daten</li>
                    <li>Keine Weitergabe des Accounts an Dritte</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Pflichten Fahrer */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Pflichten des Fahrers</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Besitz eines gültigen Führerscheins der entsprechenden Klasse</li>
                <li>Gültige Fahrzeugversicherung und -zulassung</li>
                <li>Verkehrssicherer Zustand des Fahrzeugs</li>
                <li>Einhaltung aller Verkehrsvorschriften</li>
                <li>Pünktlichkeit und Zuverlässigkeit</li>
                <li>Angemessene Kommunikation mit Mitfahrern</li>
                <li>Keine gewerbliche Personenbeförderung</li>
                <li>Maximale Kostenbeteiligung: Selbstkosten (Kraftstoff, Verschleiß)</li>
              </ul>
            </section>

            {/* Pflichten Mitfahrer */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Pflichten des Mitfahrers</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Pünktlichkeit am vereinbarten Treffpunkt</li>
                <li>Respektvoller Umgang mit Fahrer und Fahrzeug</li>
                <li>Zahlung der vereinbarten Kostenbeteiligung</li>
                <li>Rechtzeitige Absage bei Verhinderung</li>
                <li>Befolgen der Anweisungen des Fahrers</li>
              </ul>
            </section>

            {/* Buchung und Stornierung */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Buchung und Stornierung</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">6.1 Buchungsvorgang</h3>
                  <p className="text-gray-700">
                    Die Buchung einer Fahrt stellt eine verbindliche Anfrage dar. Der Vertrag kommt zustande, sobald der Fahrer die Buchung bestätigt.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">6.2 Stornierungsrechte</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Bis 24h vor Abfahrt:</strong> Kostenlose Stornierung</li>
                    <li><strong>24h-6h vor Abfahrt:</strong> 50% Kostenbeteiligung fällig</li>
                    <li><strong>Weniger als 6h vor Abfahrt:</strong> 100% Kostenbeteiligung fällig</li>
                    <li><strong>No-Show:</strong> 100% Kostenbeteiligung + mögliche Sperrung</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Zahlung */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-orange-600" />
                7. Zahlung und Gebühren
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">7.1 Kostenbeteiligung</h3>
                  <p className="text-gray-700">
                    Die Kostenbeteiligung wird transparent berechnet auf Basis von Kraftstoffverbrauch und Distanz. Für Kurzstrecken gilt ein Mindestbetrag von CHF 2.00 (Kleinmengenzuschlag). Hinzu kommen 15% Plattformgebühr, CHF 1.50 Versicherungszuschlag und 8.1% MwSt pro Person und Fahrt. Der angezeigte Preis ist der finale Endpreis inkl. aller Gebühren und Steuern.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">7.2 Zahlungsarten</h3>
                  <p className="text-gray-700 mb-2">Folgende Zahlungsarten werden akzeptiert:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>TWINT</li>
                    <li>Kreditkarte (Visa, Mastercard)</li>
                    <li>PayPal</li>
                    <li>Bargeld (direkte Absprache mit Fahrer)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">7.3 Plattformgebühr</h3>
                  <p className="text-gray-700">
                    JoinUs erhebt eine Plattformgebühr von 15% auf die Kostenbeteiligung zur Deckung der Betriebskosten und Weiterentwicklung der Plattform.
                  </p>
                </div>
              </div>
            </section>

            {/* Haftung */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-orange-600" />
                8. Haftung
              </h2>
              <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-yellow-900 mb-2">Wichtiger Haftungsausschluss</h3>
                      <p className="text-sm text-yellow-800">
                        JoinUs ist ausschließlich Vermittler und übernimmt keine Haftung für Schäden, die während oder im Zusammenhang mit der Fahrt entstehen. Dies umfasst insbesondere:
                      </p>
                    </div>
                  </div>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Unfälle, Verletzungen oder Sachschäden während der Fahrt</li>
                  <li>Verspätungen oder Ausfälle von Fahrten</li>
                  <li>Verlust oder Beschädigung von mitgeführtem Gepäck</li>
                  <li>Verhalten anderer Nutzer</li>
                  <li>Unrichtige oder unvollständige Angaben von Nutzern</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Der Fahrer haftet im Rahmen seiner Kfz-Haftpflichtversicherung. Nutzer sollten über eine ausreichende Privathaftpflicht- und Unfallversicherung verfügen.
                </p>
              </div>
            </section>

            {/* Bewertungen */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Bewertungen</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Nutzer können sich gegenseitig bewerten. Bewertungen müssen:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Wahrheitsgemäß und sachlich sein</li>
                <li>Keine beleidigenden oder diffamierenden Inhalte enthalten</li>
                <li>Sich auf die konkrete Fahrt beziehen</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                JoinUs behält sich vor, unangemessene Bewertungen zu löschen.
              </p>
            </section>

            {/* Sperrung */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Sperrung und Kündigung</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                JoinUs kann Nutzerkonten sperren oder löschen bei:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Verstoß gegen diese AGB</li>
                <li>Falschen oder irreführenden Angaben</li>
                <li>Wiederholten No-Shows oder Stornierungen</li>
                <li>Unangemessenem Verhalten gegenüber anderen Nutzern</li>
                <li>Verdacht auf betrügerische Aktivitäten</li>
                <li>Gewerblicher Nutzung ohne Lizenz</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Nutzer können ihr Konto jederzeit ohne Angabe von Gründen kündigen.
              </p>
            </section>

            {/* Änderungen */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Änderungen der AGB</h2>
              <p className="text-gray-700 leading-relaxed">
                JoinUs behält sich vor, diese AGB jederzeit zu ändern. Nutzer werden über wesentliche Änderungen informiert. Die Nutzung der Plattform nach Inkrafttreten der Änderungen gilt als Zustimmung.
              </p>
            </section>

            {/* Salvatorische Klausel */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Salvatorische Klausel</h2>
              <p className="text-gray-700 leading-relaxed">
                Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
              </p>
            </section>

            {/* Anwendbares Recht */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Anwendbares Recht und Gerichtsstand</h2>
              <p className="text-gray-700 leading-relaxed">
                Es gilt ausschließlich Schweizer Recht. Gerichtsstand ist Solothurn, Schweiz.
              </p>
            </section>

            {/* Kontakt */}
            <section className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">14. Kontakt</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Bei Fragen zu diesen AGB kontaktieren Sie uns:
              </p>
              <div className="text-gray-700">
                <p><strong>JoinUs GmbH</strong></p>
                <p>Musterstrasse 123</p>
                <p>4500 Solothurn, Schweiz</p>
                <p className="mt-2"><strong>E-Mail:</strong> info@joinus.ch</p>
                <p><strong>Tel:</strong> +41 32 123 45 67</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}