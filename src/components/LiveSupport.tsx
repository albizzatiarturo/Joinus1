import { useState } from 'react';
import { MessageCircle, X, Send, Phone, Mail, Clock } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export function LiveSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hallo! Willkommen beim JoinUs Support. Wie können wir Ihnen helfen?',
      sender: 'support',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    'Wie funktioniert die Buchung?',
    'Zahlungsmethoden',
    'Fahrzeug hinzufügen',
    'Sicherheitsfragen'
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulate typing indicator
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      setIsTyping(false);
      const supportResponse = getSupportResponse(text.trim());
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: supportResponse,
        sender: 'support',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supportMessage]);
    }, 1500);
  };

  const getSupportResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();

    if (lowerText.includes('buchung') || lowerText.includes('buchen')) {
      return 'Um eine Fahrt zu buchen, suchen Sie nach Ihrer gewünschten Route, wählen Sie eine passende Fahrt aus und klicken Sie auf "Platz reservieren". Der Fahrer wird Ihre Anfrage dann bestätigen.';
    }
    if (lowerText.includes('zahlung') || lowerText.includes('bezahlen')) {
      return 'Wir unterstützen verschiedene Zahlungsmethoden: TWINT, Kreditkarte, Debitkarte, PayPal und Bargeld. Sie können Ihre bevorzugten Zahlungsmethoden in den Einstellungen festlegen.';
    }
    if (lowerText.includes('fahrzeug') || lowerText.includes('auto')) {
      return 'Sie können Ihr Fahrzeug in den Einstellungen unter "Meine Fahrzeuge" hinzufügen. Die Verbrauchsdaten werden automatisch geladen, um Ihre Fahrkosten präzise zu berechnen.';
    }
    if (lowerText.includes('sicherheit') || lowerText.includes('sicher')) {
      return 'Ihre Sicherheit ist uns wichtig! Alle Fahrer werden verifiziert, und wir empfehlen, Bewertungen zu lesen. Bei Problemen können Sie jederzeit den Support kontaktieren.';
    }
    if (lowerText.includes('kosten') || lowerText.includes('preis')) {
      return 'Die Kosten werden automatisch basierend auf Fahrzeugverbrauch, Distanz und aktuellen Kraftstoffpreisen berechnet. Der angezeigte Preis ist der empfohlene Betrag pro Mitfahrer.';
    }
    if (lowerText.includes('hallo') || lowerText.includes('hi')) {
      return 'Hallo! Schön, Sie bei JoinUs zu haben. Wie kann ich Ihnen heute helfen?';
    }
    if (lowerText.includes('danke') || lowerText.includes('vielen dank')) {
      return 'Gerne! Wenn Sie weitere Fragen haben, stehe ich Ihnen jederzeit zur Verfügung. 😊';
    }

    return 'Vielen Dank für Ihre Nachricht. Ein Support-Mitarbeiter wird sich in Kürze bei Ihnen melden. Für dringende Fragen können Sie uns auch telefonisch unter +41 58 123 45 67 erreichen.';
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
          aria-label="Live-Support öffnen"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="font-semibold">JoinUs Support</h3>
                  <p className="text-xs text-orange-100 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-orange-600 text-white rounded-br-none'
                      : 'bg-white text-gray-900 shadow-sm rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('de-CH', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Häufige Fragen:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full hover:bg-orange-100 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(inputMessage);
                  }
                }}
                placeholder="Nachricht eingeben..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!inputMessage.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Contact Options */}
            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-600">
              <a href="tel:+41581234567" className="flex items-center gap-1 hover:text-orange-600">
                <Phone className="w-3 h-3" />
                <span>+41 58 123 45 67</span>
              </a>
              <a href="mailto:support@joinus.ch" className="flex items-center gap-1 hover:text-orange-600">
                <Mail className="w-3 h-3" />
                <span>support@joinus.ch</span>
              </a>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Mo-Fr: 08:00 - 18:00 Uhr</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
