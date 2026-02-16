import { useState } from 'react';
import { X, Heart, DollarSign } from 'lucide-react';

interface TipModalProps {
  driverName: string;
  onSendTip: (amount: number, message: string) => void;
  onClose: () => void;
}

export function TipModal({ driverName, onSendTip, onClose }: TipModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');

  const quickAmounts = [2, 5, 10, 20];

  const handleSend = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (amount > 0) {
      onSendTip(amount, message);
      onClose();
    }
  };

  const finalAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-900">Trinkgeld geben</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-gray-600 text-center mb-4">
              Möchtest du <span className="font-semibold text-gray-900">{driverName}</span> ein Trinkgeld geben?
            </p>

            {/* Quick Amount Selection */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`py-3 rounded-lg font-semibold transition-all ${
                    selectedAmount === amount
                      ? 'bg-orange-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {amount} CHF
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oder eigener Betrag
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  step="0.05"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="0.00"
                  className="w-full pl-10 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  CHF
                </span>
              </div>
            </div>
          </div>

          {/* Optional Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nachricht (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Danke für die tolle Fahrt! 🚗"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Total Display */}
          {finalAmount > 0 && (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Trinkgeld</span>
                <span className="text-2xl font-bold text-orange-600">
                  CHF {finalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSend}
            disabled={finalAmount <= 0}
            className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            Trinkgeld senden
          </button>
        </div>
      </div>
    </div>
  );
}