import { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Clock, Users, DollarSign, Car, Calculator, TrendingUp } from 'lucide-react';
import { Ride } from '../App';
import { Vehicle } from './VehicleManagement';
import { calculateTripCost, estimateDistance, formatCurrency, formatConsumption } from '../utils/costCalculation';

interface OfferRideModalProps {
  onClose: () => void;
  onSubmit: (ride: Omit<Ride, 'id'>) => void;
  vehicles: Vehicle[];
}

export function OfferRideModal({ onClose, onSubmit, vehicles }: OfferRideModalProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [driver, setDriver] = useState('');
  const [totalSeats, setTotalSeats] = useState(3);
  const [pricePerPerson, setPricePerPerson] = useState(5);
  const [recurring, setRecurring] = useState(false);
  const [recurringDays, setRecurringDays] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  
  // New vehicle-related states
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(
    vehicles.find(v => v.isDefault) || vehicles[0] || null
  );
  const [drivingStyle, setDrivingStyle] = useState<'eco' | 'normal' | 'sport'>('normal');
  const [load, setLoad] = useState<'empty' | 'half' | 'full'>('empty');
  const [showCostCalculation, setShowCostCalculation] = useState(false);

  const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  // Auto-calculate cost when vehicle, from, to, or driving parameters change
  useEffect(() => {
    if (selectedVehicle && from && to) {
      const distance = estimateDistance(from, to);
      const costResult = calculateTripCost({
        vehicle: selectedVehicle,
        distance,
        drivingStyle,
        load
      });
      
      // Set suggested price (cost per person + small margin)
      const suggestedPrice = Math.ceil(costResult.costPerPerson * 1.1 * 2) / 2; // Round to nearest 0.5
      setPricePerPerson(suggestedPrice);
      setShowCostCalculation(true);
    } else {
      setShowCostCalculation(false);
    }
  }, [selectedVehicle, from, to, drivingStyle, load]);

  const getCostCalculation = () => {
    if (!selectedVehicle || !from || !to) return null;
    
    const distance = estimateDistance(from, to);
    return calculateTripCost({
      vehicle: selectedVehicle,
      distance,
      drivingStyle,
      load
    });
  };

  const costCalc = getCostCalculation();

  const toggleRecurringDay = (day: string) => {
    if (recurringDays.includes(day)) {
      setRecurringDays(recurringDays.filter(d => d !== day));
    } else {
      setRecurringDays([...recurringDays, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      from,
      to,
      date,
      time,
      driver,
      availableSeats: totalSeats,
      totalSeats,
      pricePerPerson,
      recurring,
      recurringDays: recurring ? recurringDays : undefined,
      description
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Fahrt anbieten</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Vehicle Selection */}
          {vehicles.length > 0 && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Car className="w-5 h-5 text-orange-600" />
                Fahrzeug auswählen *
              </label>
              <div className="space-y-2">
                {vehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    type="button"
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedVehicle?.id === vehicle.id
                        ? 'border-orange-500 bg-white shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{vehicle.model}</div>
                        <div className="text-sm text-gray-600">
                          {vehicle.fuelType === 'electric' ? '🔌' : '⛽'} {vehicle.consumption} {vehicle.fuelType === 'electric' ? 'kWh' : 'L'}/100km
                        </div>
                      </div>
                      {selectedVehicle?.id === vehicle.id && (
                        <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {vehicles.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
              💡 Tipp: Fügen Sie in den Einstellungen ein Fahrzeug hinzu, um automatische Kostenberechnungen zu erhalten.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Von *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Startort"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nach *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Zielort"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Datum *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Uhrzeit *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ihr Name *
              </label>
              <input
                type="text"
                required
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verfügbare Plätze *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  required
                  min="1"
                  max="8"
                  value={totalSeats}
                  onChange={(e) => setTotalSeats(parseInt(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preis pro Person (CHF) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  required
                  min="0"
                  step="0.05"
                  value={pricePerPerson.toFixed(2)}
                  onChange={(e) => setPricePerPerson(parseFloat(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              {showCostCalculation && costCalc && (
                <p className="text-xs text-green-600 mt-1">
                  💡 Empfohlener Preis basierend auf Fahrzeugkosten
                </p>
              )}
            </div>
          </div>

          {/* Cost Calculation Display */}
          {showCostCalculation && costCalc && selectedVehicle && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Automatische Kostenberechnung</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Geschätzte Distanz</div>
                  <div className="text-lg font-bold text-gray-900">
                    {estimateDistance(from, to)} km
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Gesamtkosten {costCalc.fuelType}</div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatCurrency(costCalc.totalFuelCost)}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Verbrauch</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {costCalc.totalFuelConsumption.toFixed(1)} {costCalc.unit}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Kosten pro Person</div>
                  <div className="text-sm font-semibold text-green-600">
                    {formatCurrency(costCalc.costPerPerson)}
                  </div>
                </div>
              </div>

              {/* Advanced Options */}
              <details className="text-sm">
                <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900 mb-2">
                  Erweiterte Optionen
                </summary>
                
                <div className="space-y-3 mt-3">
                  {/* Driving Style */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      <TrendingUp className="w-4 h-4 inline mr-1" />
                      Fahrstil
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['eco', 'normal', 'sport'] as const).map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setDrivingStyle(style)}
                          className={`px-3 py-2 rounded text-xs transition-all ${
                            drivingStyle === style
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {style === 'eco' && '🌱 Eco'}
                          {style === 'normal' && '🚗 Normal'}
                          {style === 'sport' && '🏎️ Sport'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Load */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Beladung
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['empty', 'half', 'full'] as const).map((loadLevel) => (
                        <button
                          key={loadLevel}
                          type="button"
                          onClick={() => setLoad(loadLevel)}
                          className={`px-3 py-2 rounded text-xs transition-all ${
                            load === loadLevel
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {loadLevel === 'empty' && 'Leer'}
                          {loadLevel === 'half' && 'Halb'}
                          {loadLevel === 'full' && 'Voll'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Adjustments Info */}
                  <div className="bg-white rounded p-2 text-xs text-gray-600">
                    <div>Basisverbrauch: {formatConsumption(costCalc.baseConsumption, costCalc.unit)}</div>
                    <div>Angepasster Verbrauch: {formatConsumption(costCalc.adjustedConsumption, costCalc.unit)}</div>
                    {costCalc.breakdown.totalAdjustment !== 0 && (
                      <div className="text-orange-600 font-medium mt-1">
                        Anpassung: {costCalc.breakdown.totalAdjustment > 0 ? '+' : ''}{costCalc.breakdown.totalAdjustment.toFixed(1)}%
                      </div>
                    )}
                  </div>
                </div>
              </details>
            </div>
          )}

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Regelmässige Fahrt
              </span>
            </label>
          </div>

          {recurring && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wochentage
              </label>
              <div className="flex flex-wrap gap-2">
                {weekDays.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleRecurringDay(day)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      recurringDays.includes(day)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beschreibung (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Zusätzliche Informationen zur Fahrt..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              Fahrt erstellen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}