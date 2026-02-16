import { X, MapPin, Calendar, Clock, User, Users, Repeat, MessageCircle, Car, Star, Navigation, Info, Shield, Receipt } from 'lucide-react';
import { Ride } from '../App';
import { useState } from 'react';
import { BookingModal } from './BookingModal';
import { calculateDetailedPricePerPerson } from '../utils/costCalculation';

interface RideDetailModalProps {
  ride: Ride;
  onClose: () => void;
}

export function RideDetailModal({ ride, onClose }: RideDetailModalProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-CH', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getFuelTypeIcon = (fuelType?: string) => {
    if (!fuelType) return '🚗';
    const icons: { [key: string]: string } = {
      petrol: '⛽',
      diesel: '🛢️',
      electric: '🔌',
      hybrid: '🔋'
    };
    return icons[fuelType] || '🚗';
  };

  const getFuelTypeLabel = (fuelType?: string) => {
    if (!fuelType) return 'Benzin';
    const labels: { [key: string]: string } = {
      petrol: 'Benzin',
      diesel: 'Diesel',
      electric: 'Elektro',
      hybrid: 'Hybrid'
    };
    return labels[fuelType] || 'Benzin';
  };

  const handleBooking = () => {
    setShowBookingModal(true);
  };

  const handleConfirmBooking = (pickupLocation: string, seats: number) => {
    alert(`Buchung bestätigt!\nAbholungsort: ${pickupLocation}\nAnzahl Plätze: ${seats}`);
  };

  const handleContact = () => {
    alert('Kontaktfunktion würde hier implementiert werden.');
  };

  // Calculate detailed price breakdown
  const priceBreakdown = ride.vehicle && ride.distance
    ? calculateDetailedPricePerPerson(
        { fuelType: ride.vehicle.fuelType, consumption: ride.vehicle.consumption },
        ride.distance,
        ride.totalSeats
      )
    : null;

  // Fallback for rides without vehicle data
  const baseFuelCost = priceBreakdown?.baseFuelCost || ride.pricePerPerson;
  const smallAmountSurcharge = priceBreakdown?.smallAmountSurcharge || 0;
  const subtotalBeforeFee = priceBreakdown?.subtotalBeforeFee || baseFuelCost;
  const platformFee = priceBreakdown?.platformFee || baseFuelCost * 0.15;
  const insuranceSurcharge = priceBreakdown?.insuranceSurcharge || 1.50;
  const subtotalBeforeTax = priceBreakdown?.subtotalBeforeTax || (baseFuelCost + platformFee + insuranceSurcharge);
  const tax = priceBreakdown?.tax || subtotalBeforeTax * 0.081;
  const totalPricePerPerson = priceBreakdown?.totalPrice || (subtotalBeforeTax + tax);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Fahrtdetails</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Driver Profile Section */}
            {ride.driverImage && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <img
                  src={ride.driverImage}
                  alt={ride.driver}
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-300"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{ride.driver}</h3>
                  <div className="flex items-center gap-1 text-sm text-orange-600 mt-1">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-gray-600">(4.9)</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-6 h-6 text-orange-600" />
                <div className="flex items-center gap-2 text-lg">
                  <span className="font-semibold text-gray-900">{ride.from}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-semibold text-gray-900">{ride.to}</span>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            {ride.vehicle && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <Car className="w-6 h-6 text-gray-700" />
                  <h3 className="font-semibold text-gray-900">Fahrzeug</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-sm text-gray-500">Modell</div>
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <span className="text-lg">{getFuelTypeIcon(ride.vehicle.fuelType)}</span>
                      {ride.vehicle.model}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Treibstoff</div>
                    <div className="font-medium text-gray-900">{getFuelTypeLabel(ride.vehicle.fuelType)}</div>
                  </div>
                  {ride.vehicle.color && (
                    <div>
                      <div className="text-sm text-gray-500">Farbe</div>
                      <div className="font-medium text-gray-900">{ride.vehicle.color}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-500">Datum</div>
                  <div className="font-medium text-gray-900">{formatDate(ride.date)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-500">Abfahrtszeit</div>
                  <div className="font-medium text-gray-900">{ride.time} Uhr</div>
                </div>
              </div>

              {ride.distance && (
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <Navigation className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-sm text-gray-500">Distanz</div>
                    <div className="font-medium text-orange-700">{ride.distance} km</div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-500">Verfügbare Plätze</div>
                  <div className="font-medium text-gray-900">
                    {ride.availableSeats} von {ride.totalSeats}
                  </div>
                </div>
              </div>
            </div>

            {ride.recurring && ride.recurringDays && (
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <Repeat className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Regelmässige Fahrt</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {ride.recurringDays.map((day) => (
                    <span
                      key={day}
                      className="px-3 py-1 bg-white text-orange-700 text-sm rounded border border-orange-200"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {ride.description && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Beschreibung</h3>
                <p className="text-gray-600">{ride.description}</p>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Preisübersicht pro Person</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Kraftstoffkosten</span>
                  <span className="font-medium text-gray-900">CHF {baseFuelCost.toFixed(2)}</span>
                </div>
                
                {smallAmountSurcharge > 0 && (
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>Kleinmengenzuschlag</span>
                      <div className="group relative">
                        <Info className="w-4 h-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded-lg p-2 z-10">
                          Mindestbetrag CHF 2.00 für Kurzstrecken
                        </div>
                      </div>
                    </div>
                    <span className="font-medium">CHF {smallAmountSurcharge.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>Plattformgebühr (15%)</span>
                    <div className="group relative">
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded-lg p-2 z-10">
                        Diese Gebühr unterstützt die Entwicklung und den Betrieb der Plattform
                      </div>
                    </div>
                  </div>
                  <span className="font-medium">CHF {platformFee.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-blue-700">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>Versicherungszuschlag</span>
                    <div className="group relative">
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 bg-gray-900 text-white text-xs rounded-lg p-2 z-10">
                        Beinhaltet Versicherungsschutz für alle Mitfahrer während der Fahrt
                      </div>
                    </div>
                  </div>
                  <span className="font-medium">CHF {insuranceSurcharge.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-green-700">
                  <div className="flex items-center gap-1">
                    <Receipt className="w-4 h-4" />
                    <span>MwSt (8.1%)</span>
                    <div className="group relative">
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded-lg p-2 z-10">
                        Schweizer Mehrwertsteuer auf Transportdienstleistungen
                      </div>
                    </div>
                  </div>
                  <span className="font-medium">CHF {tax.toFixed(2)}</span>
                </div>
                
                <div className="pt-2 border-t border-gray-300">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Gesamtpreis</span>
                    <span className="text-2xl font-bold text-orange-600">
                      CHF {totalPricePerPerson.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleContact}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Kontaktieren
              </button>
              <button
                onClick={handleBooking}
                className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                disabled={ride.availableSeats === 0}
              >
                {ride.availableSeats === 0 ? 'Ausgebucht' : 'Platz buchen'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          ride={ride}
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </>
  );
}