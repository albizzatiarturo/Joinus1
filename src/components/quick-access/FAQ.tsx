import { HelpCircle, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: 'Allgemein',
    question: 'Was ist JoinUs?',
    answer: 'JoinUs ist eine Plattform zur Vermittlung von Fahrgemeinschaften. Wir bringen Fahrer mit freien Plätzen und Mitfahrer zusammen, um Kosten zu teilen und die Umwelt zu schonen.'
  },
  {
    id: 2,
    category: 'Allgemein',
    question: 'Ist JoinUs kostenlos?',
    answer: 'Die Registrierung ist kostenlos. Pro Fahrt wird eine Plattformgebühr von 15% auf die Kostenbeteiligung, ein Versicherungszuschlag von CHF 1.50 sowie 8.1% MwSt erhoben, um die Plattform zu betreiben, weiterzuentwickeln und alle Mitfahrer zu versichern.'
  },
  {
    id: 3,
    category: 'Registrierung',
    question: 'Wie registriere ich mich?',
    answer: 'Klicke auf "Registrieren" und fülle das Formular mit deinen persönlichen Daten aus. Du musst mindestens 18 Jahre alt sein und eine gültige E-Mail-Adresse angeben.'
  },
  {
    id: 4,
    category: 'Registrierung',
    question: 'Welche Dokumente benötige ich?',
    answer: 'Für die Registrierung benötigst du einen gültigen Ausweis. Als Fahrer brauchst du zusätzlich einen gültigen Führerschein und eine Fahrzeugversicherung.'
  },
  {
    id: 5,
    category: 'Fahrer',
    question: 'Wie biete ich eine Fahrt an?',
    answer: 'Klicke auf "Fahrt anbieten", gib Start, Ziel, Datum und Uhrzeit ein. Wähle dein Fahrzeug aus und gib die Anzahl verfügbarer Plätze an. Der Preis wird automatisch berechnet.'
  },
  {
    id: 6,
    category: 'Fahrer',
    question: 'Wie wird der Preis berechnet?',
    answer: 'Der Preis basiert auf den tatsächlichen Kraftstoffkosten (Verbrauch × Distanz × Kraftstoffpreis), geteilt durch alle Personen. Für Kurzstrecken unter CHF 2.00 wird ein Kleinmengenzuschlag erhoben. Hinzu kommen 15% Plattformgebühr und CHF 1.50 Versicherungszuschlag pro Person.'
  },
  {
    id: 7,
    category: 'Fahrer',
    question: 'Kann ich mehrere Fahrzeuge haben?',
    answer: 'Ja! Du kannst in deinem Profil mehrere Fahrzeuge hinterlegen und bei jeder Fahrt auswählen, welches Fahrzeug du nutzt.'
  },
  {
    id: 8,
    category: 'Mitfahrer',
    question: 'Wie buche ich eine Fahrt?',
    answer: 'Suche nach einer passenden Fahrt, klicke auf "Details anzeigen" und dann auf "Jetzt buchen". Gib deinen gewünschten Abholort an und wähle die Anzahl der Plätze.'
  },
  {
    id: 9,
    category: 'Mitfahrer',
    question: 'Kann ich eine Buchung stornieren?',
    answer: 'Ja. Bis 24h vor Abfahrt ist die Stornierung kostenlos. Bei kurzfristigeren Stornierungen können Gebühren anfallen.'
  },
  {
    id: 10,
    category: 'Zahlung',
    question: 'Welche Zahlungsmethoden werden akzeptiert?',
    answer: 'Wir akzeptieren TWINT, Kreditkarte (Visa, Mastercard), PayPal und nach Absprache mit dem Fahrer auch Bargeld.'
  },
  {
    id: 11,
    category: 'Zahlung',
    question: 'Wann wird der Betrag abgebucht?',
    answer: 'Die Zahlung erfolgt nach Bestätigung der Buchung durch den Fahrer. Bei TWINT und Kreditkarte wird der Betrag sofort reserviert und nach der Fahrt abgebucht.'
  },
  {
    id: 12,
    category: 'Zahlung',
    question: 'Bekomme ich bei Stornierung mein Geld zurück?',
    answer: 'Bei kostenloser Stornierung (bis 24h vor Abfahrt) wird der volle Betrag zurückerstattet. Bei späteren Stornierungen gelten die Stornierungsgebühren.'
  },
  {
    id: 13,
    category: 'Sicherheit',
    question: 'Wie sicher ist JoinUs?',
    answer: 'Wir verifizieren alle Nutzer und ihre Dokumente. Jeder Nutzer erhält Bewertungen, sodass du die Erfahrungen anderer sehen kannst. Außerdem sind alle Fahrten durch die Kfz-Versicherung des Fahrers abgedeckt.'
  },
  {
    id: 14,
    category: 'Sicherheit',
    question: 'Was mache ich bei Problemen während der Fahrt?',
    answer: 'Bei ernsten Problemen wende dich an unseren 24/7-Support über den Live-Chat. Bei Notfällen rufe die Polizei (117) oder Ambulanz (144).'
  },
  {
    id: 15,
    category: 'Sicherheit',
    question: 'Sind meine Daten geschützt?',
    answer: 'Ja! Wir verwenden modernste Verschlüsselungstechnologien und geben deine Daten nicht an Dritte weiter. Mehr in unserer Datenschutzerklärung.'
  },
  {
    id: 16,
    category: 'Bewertungen',
    question: 'Wie funktioniert das Bewertungssystem?',
    answer: 'Nach jeder Fahrt können sich Fahrer und Mitfahrer gegenseitig bewerten (1-5 Sterne) und einen Kommentar hinterlassen. Dies hilft anderen Nutzern bei der Entscheidung.'
  },
  {
    id: 17,
    category: 'Bewertungen',
    question: 'Kann ich eine Bewertung löschen lassen?',
    answer: 'Bewertungen können nur bei nachweisbaren Falschaussagen oder beleidigenden Inhalten gelöscht werden. Kontaktiere dafür unseren Support.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  const categories = ['Alle', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Alle' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-10 h-10 text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-900">Häufig gestellte Fragen</h1>
          </div>
          <p className="text-lg text-gray-600">
            Hier findest du Antworten auf die häufigsten Fragen zu JoinUs
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Durchsuche die FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFAQs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Keine Ergebnisse gefunden</p>
              <p className="text-gray-500 text-sm mt-2">Versuche es mit anderen Suchbegriffen</p>
            </div>
          ) : (
            filteredFAQs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-orange-600 mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.question}
                    </h3>
                  </div>
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0 ml-4" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-orange-50 rounded-xl border border-orange-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Deine Frage wurde nicht beantwortet?
          </h2>
          <p className="text-gray-700 mb-6">
            Unser Support-Team hilft dir gerne weiter!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@joinus.ch"
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium"
            >
              E-Mail senden
            </a>
            <a
              href="tel:+41321234567"
              className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 rounded-lg transition-colors font-medium border border-gray-300"
            >
              Anrufen
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Erreichbar: Mo-Fr 08:00 - 18:00 Uhr
          </p>
        </div>
      </div>
    </div>
  );
}