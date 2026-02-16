import { useState, useEffect } from 'react';
import { Mic, X, CheckCircle } from 'lucide-react';

interface VoiceCommandProps {
  onCommand: (command: string, params: any) => void;
}

export function VoiceCommand({ onCommand }: VoiceCommandProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showButton, setShowButton] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    setResult(null);
    
    // Simulate voice recognition
    // In real app: Use Web Speech API or Siri Shortcuts
    setTimeout(() => {
      const mockCommands = [
        'Finde Fahrt nach Zürich morgen 8 Uhr',
        'Zeige meine Fahrten',
        'Buche Fahrt nach Bern heute Nachmittag',
        'Suche Fahrt von Basel nach Luzern',
        'Zeige beliebte Routen'
      ];
      
      const randomCommand = mockCommands[Math.floor(Math.random() * mockCommands.length)];
      setTranscript(randomCommand);
      
      setTimeout(() => {
        processCommand(randomCommand);
      }, 1000);
    }, 2000);
  };

  const processCommand = (command: string) => {
    setIsListening(false);
    
    // Parse command
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('finde fahrt') || lowerCommand.includes('suche fahrt')) {
      // Extract destination
      const toMatch = lowerCommand.match(/nach (\w+)/);
      const fromMatch = lowerCommand.match(/von (\w+)/);
      const timeMatch = lowerCommand.match(/(\d+) uhr/);
      
      setResult('✓ Suche wird gestartet...');
      setTimeout(() => {
        onCommand('search', {
          to: toMatch?.[1] || '',
          from: fromMatch?.[1] || '',
          time: timeMatch?.[1] || ''
        });
        setTranscript('');
        setResult(null);
      }, 1500);
    } else if (lowerCommand.includes('meine fahrten')) {
      setResult('✓ Öffne deine Fahrten...');
      setTimeout(() => {
        onCommand('my-rides', {});
        setTranscript('');
        setResult(null);
      }, 1500);
    } else if (lowerCommand.includes('beliebte routen')) {
      setResult('✓ Zeige beliebte Routen...');
      setTimeout(() => {
        onCommand('popular-routes', {});
        setTranscript('');
        setResult(null);
      }, 1500);
    } else {
      setResult('❌ Befehl nicht verstanden');
      setTimeout(() => {
        setTranscript('');
        setResult(null);
      }, 2000);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    setTranscript('');
    setResult(null);
  };

  return (
    <>
      {/* Voice Command Button */}
      {showButton && (
        <button
          onClick={startListening}
          className="fixed bottom-40 left-4 z-40 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110"
          title="Voice Command"
        >
          <Mic className="w-6 h-6" />
        </button>
      )}

      {/* Voice Command Modal */}
      {isListening && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                {/* Animated microphone */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <Mic className="w-16 h-16 text-blue-500" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ich höre zu...
              </h3>
              
              {transcript ? (
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 font-medium">{transcript}</p>
                </div>
              ) : (
                <p className="text-gray-600 mb-6">
                  Sage zum Beispiel:<br/>
                  <span className="text-sm italic">"Finde Fahrt nach Zürich morgen 8 Uhr"</span>
                </p>
              )}

              {result && (
                <div className={`flex items-center justify-center gap-2 mb-4 ${
                  result.includes('✓') ? 'text-green-600' : 'text-red-600'
                }`}>
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">{result}</span>
                </div>
              )}

              <button
                onClick={stopListening}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Siri Shortcut Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">🎤 Siri Integration verfügbar</h4>
            <p className="text-sm text-gray-700 mb-2">
              Sage einfach: <strong>"Hey Siri, finde Fahrt nach Zürich mit JoinUs"</strong>
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>• "Hey Siri, zeige meine JoinUs Fahrten"</p>
              <p>• "Hey Siri, suche Mitfahrgelegenheit nach Bern"</p>
              <p>• "Hey Siri, wo ist mein Fahrer bei JoinUs?"</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
