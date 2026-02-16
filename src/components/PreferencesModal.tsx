import { useState } from 'react';
import { X, Music, MessageCircle, Coffee, Cigarette, Dog, Baby } from 'lucide-react';

export interface UserPreferences {
  musicPreference: 'yes' | 'no' | 'sometimes';
  talkative: 'talkative' | 'quiet' | 'depends';
  smoking: 'smoker' | 'non-smoker';
  petsOk: boolean;
  childSeat: boolean;
}

interface PreferencesModalProps {
  currentPreferences: UserPreferences;
  onSave: (preferences: UserPreferences) => void;
  onClose: () => void;
}

export function PreferencesModal({ currentPreferences, onSave, onClose }: PreferencesModalProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(currentPreferences);

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Fahrt-Präferenzen</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Music Preference */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <Music className="w-5 h-5 text-orange-600" />
              Musik während der Fahrt
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['yes', 'sometimes', 'no'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPreferences({ ...preferences, musicPreference: option })}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    preferences.musicPreference === option
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option === 'yes' && '🎵 Ja'}
                  {option === 'sometimes' && '🎶 Manchmal'}
                  {option === 'no' && '🔇 Nein'}
                </button>
              ))}
            </div>
          </div>

          {/* Talkative */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <MessageCircle className="w-5 h-5 text-orange-600" />
              Gesprächsbereitschaft
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['talkative', 'depends', 'quiet'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPreferences({ ...preferences, talkative: option })}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    preferences.talkative === option
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option === 'talkative' && '💬 Gesprächig'}
                  {option === 'depends' && '😊 Je nach Lust'}
                  {option === 'quiet' && '🤫 Ruhig'}
                </button>
              ))}
            </div>
          </div>

          {/* Smoking */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <Cigarette className="w-5 h-5 text-orange-600" />
              Rauchen
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['non-smoker', 'smoker'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPreferences({ ...preferences, smoking: option })}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    preferences.smoking === option
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option === 'non-smoker' && '🚭 Nichtraucher'}
                  {option === 'smoker' && '🚬 Raucher'}
                </button>
              ))}
            </div>
          </div>

          {/* Pets OK */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.petsOk}
                onChange={(e) => setPreferences({ ...preferences, petsOk: e.target.checked })}
                className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
              />
              <Dog className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">Haustiere erlaubt</span>
            </label>
          </div>

          {/* Child Seat */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.childSeat}
                onChange={(e) => setPreferences({ ...preferences, childSeat: e.target.checked })}
                className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
              />
              <Baby className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">Kindersitz vorhanden</span>
            </label>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}
