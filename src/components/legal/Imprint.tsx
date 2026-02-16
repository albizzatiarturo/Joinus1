import { Building, Mail, Phone, MapPin, Globe } from 'lucide-react';

export function Imprint() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Building className="w-8 h-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Impressum</h1>
          </div>

          <div className="space-y-8">
            {/* Unternehmen */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Angaben gemäss Schweizer Obligationenrecht</h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">JoinUs GmbH</p>
                    <p className="text-gray-700 text-sm">Gesellschaft mit beschränkter Haftung</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">Musterstrasse 123</p>
                    <p className="text-gray-700">4500 Solothurn</p>
                    <p className="text-gray-700">Schweiz</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">
                      <a href="mailto:info@joinus.ch" className="text-orange-600 hover:text-orange-700 transition-colors">
                        info@joinus.ch
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">
                      <a href="tel:+41321234567" className="text-orange-600 hover:text-orange-700 transition-colors">
                        +41 32 123 45 67
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">
                      <a href="https://www.joinus.ch" className="text-orange-600 hover:text-orange-700 transition-colors">
                        www.joinus.ch
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Handelsregister */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Handelsregistereintrag</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">UID-Nummer</p>
                    <p className="font-semibold text-gray-900">CHE-123.456.789</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Handelsregister-Nr.</p>
                    <p className="font-semibold text-gray-900">CH-501.4.123.456-7</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Handelsregisteramt</p>
                    <p className="font-semibold text-gray-900">Solothurn</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Mehrwertsteuernummer</p>
                    <p className="font-semibold text-gray-900">CHE-123.456.789 MWST</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Geschäftsführung */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Geschäftsführung</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">Max Mustermann, Geschäftsführer</p>
                <p className="text-gray-700 mt-1">Sarah Musterfrau, Geschäftsführerin</p>
              </div>
            </section>

            {/* Aufsichtsbehörde */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Zuständige Aufsichtsbehörde</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">Handelsregisteramt des Kantons Solothurn</p>
                <p className="text-gray-700 mt-1">Ambassadorenhof</p>
                <p className="text-gray-700">4509 Solothurn</p>
                <p className="text-gray-700 mt-2">
                  <a href="https://www.so.ch" className="text-orange-600 hover:text-orange-700 transition-colors">
                    www.so.ch
                  </a>
                </p>
              </div>
            </section>

            {/* Haftungsausschluss */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Haftungsausschluss</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Inhalt des Onlineangebotes</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Verweise und Links</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Bei direkten oder indirekten Verweisen auf fremde Webseiten ("Hyperlinks"), die ausserhalb des Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Urheberrecht</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Der Autor ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken, Tondokumente, Videosequenzen und Texte zu beachten, von ihm selbst erstellte Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen. Das Copyright für veröffentlichte, vom Autor selbst erstellte Objekte bleibt allein beim Autor der Seiten.
                  </p>
                </div>
              </div>
            </section>

            {/* Streitbeilegung */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Online-Streitbeilegung</h2>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <p className="text-gray-700 leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Die Plattform finden Sie unter:
                </p>
                <p className="mt-2">
                  <a 
                    href="https://ec.europa.eu/consumers/odr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 transition-colors font-medium"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </section>

            {/* Design Credits */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Design & Entwicklung</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">
                  <strong>Design:</strong> JoinUs Design Team
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Technische Umsetzung:</strong> JoinUs Development Team
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Bildmaterial:</strong> Unsplash.com (lizenzfrei)
                </p>
              </div>
            </section>

            {/* Kontakt */}
            <section className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Kontakt</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Für Fragen, Anregungen oder Beschwerden stehen wir Ihnen gerne zur Verfügung:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <a href="mailto:info@joinus.ch" className="text-orange-600 hover:text-orange-700 transition-colors font-medium">
                    info@joinus.ch
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <a href="tel:+41321234567" className="text-orange-600 hover:text-orange-700 transition-colors font-medium">
                    +41 32 123 45 67
                  </a>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Erreichbarkeit: Mo-Fr 08:00 - 18:00 Uhr
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Letzte Aktualisierung: Februar 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
