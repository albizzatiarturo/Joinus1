import { useState } from 'react';
import { X, MapPin, Users, DollarSign, AlertCircle, Info, Fuel, Calculator, ChevronDown, ChevronUp, Shield, Receipt } from 'lucide-react';
import { Ride } from '../App';
import { FUEL_PRICES, calculateTripCost, calculateDetailedPricePerPerson } from '../utils/costCalculation';

interface BookingModalProps {
  ride: Ride;
  onClose: () => void;
  onConfirm: (pickupLocation: string, seats: number) => void;
}

export function BookingModal({ ride, onClose, onConfirm }: BookingModalProps) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [seats, setSeats] = useState(1);
  const [showCalculation, setShowCalculation] = useState(true); // Changed to true - always show by default

  // Calculate pricing breakdown using new detailed calculation
  const priceBreakdown = ride.vehicle && ride.distance
    ? calculateDetailedPricePerPerson(
        { fuelType: ride.vehicle.fuelType, consumption: ride.vehicle.consumption },
        ride.distance,
        ride.totalSeats
      )
    : null;

  // Use detailed breakdown or fallback
  const baseFuelCost = priceBreakdown?.baseFuelCost || ride.pricePerPerson;
  const smallAmountSurcharge = priceBreakdown?.smallAmountSurcharge || 0;
  const platformFee = priceBreakdown?.platformFee || baseFuelCost * 0.15;
  const insuranceSurcharge = priceBreakdown?.insuranceSurcharge || 1.50;
  const tax = priceBreakdown?.tax || (baseFuelCost + platformFee + insuranceSurcharge) * 0.081;
  const totalPricePerSeat = priceBreakdown?.totalPrice || (baseFuelCost + platformFee + insuranceSurcharge + tax);
  
  const totalPrice = totalPricePerSeat * seats; // Total price for all seats

  // Old calculation for comparison/display
  const costBreakdown = ride.vehicle && ride.distance
    ? calculateTripCost({
        vehicle: {
          id: '1',
          brand: ride.vehicle.model.split(' ')[0],
          model: ride.vehicle.model,
          year: 2022,
          fuelType: ride.vehicle.fuelType as 'petrol' | 'diesel' | 'electric' | 'hybrid',
          consumption: ride.vehicle.consumption,
          isDefault: true
        },
        distance: ride.distance
      })
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pickupLocation.trim() && seats > 0 && seats <= ride.availableSeats) {
      onConfirm(pickupLocation.trim(), seats);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-900">Fahrt buchen</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Ride Info */}
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-gray-900">{ride.from}</span>
              <span className="text-gray-400">→</span>
              <span className="font-semibold text-gray-900">{ride.to}</span>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              {ride.date} • {ride.time} Uhr
              {ride.distance && <span className="ml-2">• {ride.distance} km</span>}
            </div>
            {ride.vehicle && (
              <div className="text-sm text-gray-600 mt-1">
                Fahrzeug: {ride.vehicle.model} ({ride.vehicle.color})
              </div>
            )}
          </div>

          {/* Detailed Cost Calculation */}
          {costBreakdown && (
            <div className="bg-blue-50 rounded-lg border border-blue-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowCalculation(!showCalculation)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">Kostenberechnung anzeigen</span>
                </div>
                {showCalculation ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>
              
              {showCalculation && (
                <div className="px-4 pb-4 space-y-3 text-sm">
                  <div className="border-t border-blue-200 pt-3">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Fuel className="w-4 h-4" />
                      Fahrzeugdaten
                    </h4>
                    <div className="space-y-1 text-blue-800">
                      <div className="flex justify-between">
                        <span>Fahrzeug:</span>
                        <span className="font-medium">{ride.vehicle?.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kraftstoff:</span>
                        <span className="font-medium">{costBreakdown.fuelType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Verbrauch:</span>
                        <span className="font-medium">{costBreakdown.baseConsumption.toFixed(1)} {costBreakdown.unit}/100km</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-blue-200 pt-3">
                    <h4 className="font-semibold text-blue-900 mb-2">Streckenberechnung</h4>
                    <div className="space-y-1 text-blue-800">
                      <div className="flex justify-between">
                        <span>Distanz:</span>
                        <span className="font-medium">{ride.distance} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kraftstoffpreis:</span>
                        <span className="font-medium">CHF {FUEL_PRICES[ride.vehicle.fuelType as keyof typeof FUEL_PRICES].toFixed(2)}/{costBreakdown.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gesamtverbrauch:</span>
                        <span className="font-medium">{costBreakdown.totalFuelConsumption.toFixed(2)} {costBreakdown.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kraftstoffkosten gesamt:</span>
                        <span className="font-medium">CHF {costBreakdown.totalFuelCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kosten pro km:</span>
                        <span className="font-medium">CHF {costBreakdown.costPerKm.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-blue-200 pt-3 bg-blue-100 -mx-4 px-4 py-3">
                    <h4 className="font-semibold text-blue-900 mb-2">Kostenaufteilung</h4>
                    <div className="space-y-1 text-blue-800">
                      <div className="flex justify-between">
                        <span>Gesamtkosten Fahrt:</span>
                        <span className="font-medium">CHF {costBreakdown.totalFuelCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Anzahl Personen (inkl. Fahrer):</span>
                        <span className="font-medium">{ride.totalSeats + 1} Personen</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Anteil pro Person (nur Kraftstoff):</span>
                        <span className="font-medium">CHF {(costBreakdown.totalFuelCost / (ride.totalSeats + 1)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-blue-700 pt-1">
                        <span>+ Plattformgebühr (15%):</span>
                        <span className="font-medium">CHF {platformFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-orange-600 pt-2 border-t border-blue-300">
                        <span>Finaler Preis pro Person:</span>
                        <span>CHF {totalPricePerSeat.toFixed(2)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-blue-700 mt-2 italic">
                      * Dies ist der finale Preis, den jede Person zahlt (Kraftstoffanteil + Plattformgebühr)
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pickup Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Abholungsort *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="z.B. Hauptbahnhof Solothurn"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Geben Sie an, wo Sie vom Fahrer abgeholt werden möchten
            </p>
          </div>

          {/* Number of Seats */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anzahl Plätze *
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={seats}
                onChange={(e) => setSeats(parseInt(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
              >
                {Array.from({ length: ride.availableSeats }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Platz' : 'Plätze'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
              <DollarSign className="w-5 h-5 text-gray-600" />
              Preisübersicht
            </div>
            
            <div className="space-y-2 text-sm">
              {/* Pro Person Aufschlüsselung */}
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-xs font-semibold text-gray-600 mb-2">Pro Person:</div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Kraftstoffkosten</span>
                    <span>CHF {baseFuelCost.toFixed(2)}</span>
                  </div>
                  
                  {smallAmountSurcharge > 0 && (
                    <div className="flex items-center justify-between text-gray-600 text-xs">
                      <div className="flex items-center gap-1">
                        <span>+ Kleinmengenzuschlag</span>
                        <div className="group relative">
                          <Info className="w-3 h-3 text-gray-400 cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded-lg p-2 z-10">
                            Mindestbetrag CHF 2.00 für Kurzstrecken
                          </div>
                        </div>
                      </div>
                      <span>CHF {smallAmountSurcharge.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-gray-600 text-xs">
                    <div className="flex items-center gap-1">
                      <span>+ Plattformgebühr (15%)</span>
                      <div className="group relative">
                        <Info className="w-3 h-3 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded-lg p-2 z-10">
                          Diese Gebühr unterstützt die Entwicklung und den Betrieb der Plattform
                        </div>
                      </div>
                    </div>
                    <span>CHF {platformFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-blue-700 text-xs">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>+ Versicherungszuschlag</span>
                      <div className="group relative">
                        <Info className="w-3 h-3 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 bg-gray-900 text-white text-xs rounded-lg p-2 z-10">
                          Beinhaltet Versicherungsschutz für alle Mitfahrer während der Fahrt
                        </div>
                      </div>
                    </div>
                    <span>CHF {insuranceSurcharge.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-green-700 text-xs">
                    <div className="flex items-center gap-1">
                      <Receipt className="w-3 h-3" />
                      <span>+ MwSt (8.1%)</span>
                      <div className="group relative">
                        <Info className="w-3 h-3 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded-lg p-2 z-10">
                          Schweizer Mehrwertsteuer auf Transportdienstleistungen
                        </div>
                      </div>
                    </div>
                    <span>CHF {tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between font-semibold text-orange-600 pt-1 border-t border-gray-200">
                    <span>Preis pro Person:</span>
                    <span>CHF {totalPricePerSeat.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Gesamtübersicht wenn mehrere Plätze */}
              {seats > 1 && (
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                  <div className="text-xs font-semibold text-orange-800 mb-2">
                    Sie buchen {seats} Plätze:
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-orange-900">
                      <span>{seats} × CHF {totalPricePerSeat.toFixed(2)}</span>
                      <span className="font-bold">CHF {totalPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-orange-700 mt-1">
                      Jede Person zahlt nur ihren eigenen Anteil von CHF {totalPricePerSeat.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between font-bold text-gray-900 pt-2 border-t border-gray-300 text-base">
                <span>Sie zahlen insgesamt</span>
                <span className="text-orange-600">CHF {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Info Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Der Fahrer wird Ihre Buchungsanfrage prüfen und bestätigen. Sie erhalten eine Benachrichtigung über den Status.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={!pickupLocation.trim()}
              className="flex-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Jetzt buchen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}