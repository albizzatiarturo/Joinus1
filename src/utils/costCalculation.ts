import { Vehicle } from '../components/VehicleManagement';

// Current fuel prices in CHF per liter/kWh (Stand Februar 2026)
export const FUEL_PRICES = {
  petrol: 1.65,      // CHF per liter
  diesel: 1.70,      // CHF per liter
  electric: 0.20,    // CHF per kWh
  hybrid: 1.65       // CHF per liter (uses petrol price)
};

interface CostCalculationParams {
  vehicle: Vehicle;
  distance: number; // in km
  drivingStyle?: 'eco' | 'normal' | 'sport'; // Optional driving style
  load?: 'empty' | 'half' | 'full'; // Optional vehicle load
  fuelPrice?: number; // Optional custom fuel price
}

interface CostCalculationResult {
  totalFuelConsumption: number; // in L or kWh
  totalFuelCost: number; // in CHF
  costPerKm: number; // in CHF
  costPerPerson: number; // in CHF (total cost divided by available seats)
  baseConsumption: number; // in L/100km or kWh/100km
  adjustedConsumption: number; // in L/100km or kWh/100km after adjustments
  fuelType: string;
  unit: string; // 'L' or 'kWh'
  breakdown: {
    drivingStyleAdjustment: number; // percentage
    loadAdjustment: number; // percentage
    totalAdjustment: number; // percentage
  };
}

/**
 * Calculate fuel cost for a trip based on vehicle data and trip parameters
 */
export function calculateTripCost(params: CostCalculationParams): CostCalculationResult {
  const {
    vehicle,
    distance,
    drivingStyle = 'normal',
    load = 'empty',
    fuelPrice
  } = params;

  // Get base consumption from vehicle
  let adjustedConsumption = vehicle.consumption;

  // Driving style adjustments
  const drivingStyleMultipliers = {
    eco: 0.85,      // -15% for eco driving
    normal: 1.0,    // no adjustment
    sport: 1.25     // +25% for sporty driving
  };

  // Load adjustments
  const loadMultipliers = {
    empty: 1.0,     // no adjustment
    half: 1.10,     // +10% for half load
    full: 1.20      // +20% for full load
  };

  const drivingStyleFactor = drivingStyleMultipliers[drivingStyle];
  const loadFactor = loadMultipliers[load];

  // Calculate adjustments
  const drivingStyleAdjustment = ((drivingStyleFactor - 1) * 100);
  const loadAdjustment = ((loadFactor - 1) * 100);
  const totalAdjustment = drivingStyleAdjustment + loadAdjustment;

  // Apply adjustments
  adjustedConsumption = vehicle.consumption * drivingStyleFactor * loadFactor;

  // Calculate total fuel consumption
  const totalFuelConsumption = (adjustedConsumption / 100) * distance;

  // Get fuel price
  const pricePerUnit = fuelPrice || FUEL_PRICES[vehicle.fuelType];

  // Calculate total fuel cost
  const totalFuelCost = totalFuelConsumption * pricePerUnit;

  // Calculate cost per km
  const costPerKm = totalFuelCost / distance;

  // Calculate cost per person (assuming driver + 3 passengers = 4 total)
  const costPerPerson = totalFuelCost / 4;

  // Determine unit
  const unit = vehicle.fuelType === 'electric' ? 'kWh' : 'L';
  const fuelTypeLabel = {
    petrol: 'Benzin',
    diesel: 'Diesel',
    electric: 'Strom',
    hybrid: 'Hybrid'
  }[vehicle.fuelType];

  return {
    totalFuelConsumption,
    totalFuelCost,
    costPerKm,
    costPerPerson,
    baseConsumption: vehicle.consumption,
    adjustedConsumption,
    fuelType: fuelTypeLabel,
    unit,
    breakdown: {
      drivingStyleAdjustment,
      loadAdjustment,
      totalAdjustment
    }
  };
}

/**
 * Calculate the price per person for a ride based on vehicle, distance, and available seats
 * Returns the FINAL price including all fees (platform fee, insurance, tax)
 */
export function calculatePricePerPerson(
  vehicle: { fuelType: string; consumption?: number } | undefined,
  distance: number | undefined,
  totalSeats: number | undefined
): number {
  try {
    // Default values
    const defaultConsumption = 6.5;
    const defaultDistance = 10;
    const defaultSeats = 3;

    const consumption = vehicle?.consumption || defaultConsumption;
    const dist = distance || defaultDistance;
    const seats = totalSeats || defaultSeats;

    // Get fuel price
    const fuelType = vehicle?.fuelType || 'petrol';
    const pricePerUnit = FUEL_PRICES[fuelType as keyof typeof FUEL_PRICES] || FUEL_PRICES.petrol;

    // Calculate total fuel consumption
    const totalFuelConsumption = (consumption / 100) * dist;

    // Calculate total fuel cost
    const totalFuelCost = totalFuelConsumption * pricePerUnit;

    // Calculate cost per person (total seats + driver)
    const totalPersons = seats + 1;
    const baseFuelCost = roundToFiveRappen(totalFuelCost / totalPersons);

    // Calculate small amount surcharge (if base cost < CHF 2.00)
    const MIN_AMOUNT = 2.00;
    const smallAmountSurcharge = baseFuelCost < MIN_AMOUNT ? roundToFiveRappen(MIN_AMOUNT - baseFuelCost) : 0;

    // Subtotal before platform fee
    const subtotalBeforeFee = roundToFiveRappen(baseFuelCost + smallAmountSurcharge);

    // Calculate 15% platform fee on subtotal
    const platformFee = roundToFiveRappen(subtotalBeforeFee * 0.15);

    // Fixed insurance surcharge
    const insuranceSurcharge = 1.50;

    // Subtotal before tax
    const subtotalBeforeTax = roundToFiveRappen(subtotalBeforeFee + platformFee + insuranceSurcharge);

    // Calculate 8.1% tax (MwSt)
    const tax = roundToFiveRappen(subtotalBeforeTax * 0.081);

    // Total price (FINAL PRICE)
    const totalPrice = roundToFiveRappen(subtotalBeforeTax + tax);

    return totalPrice;
  } catch (error) {
    console.error('Error calculating price per person:', error);
    return 5.00; // Safe fallback
  }
}

/**
 * Round to 5 Rappen (0.05 CHF) - Swiss rounding standard
 */
function roundToFiveRappen(amount: number): number {
  return Math.round(amount * 20) / 20;
}

/**
 * Detailed price calculation with breakdown
 */
export interface PriceBreakdown {
  baseFuelCost: number; // Kraftstoffkosten pro Person
  smallAmountSurcharge: number; // Kleinmengenzuschlag (um auf mind. CHF 2.00 zu kommen)
  subtotalBeforeFee: number; // Zwischensumme vor Plattformgebühr
  platformFee: number; // 15% Plattformgebühr
  insuranceSurcharge: number; // CHF 1.50 Versicherungszuschlag
  subtotalBeforeTax: number; // Zwischensumme vor Steuern
  tax: number; // 8.1% Steuern (MwSt)
  totalPrice: number; // Gesamtpreis
}

export function calculateDetailedPricePerPerson(
  vehicle: { fuelType: string; consumption?: number },
  distance: number,
  totalSeats: number
): PriceBreakdown {
  try {
    // Default consumption values if not provided
    const consumption = vehicle.consumption || 
      (vehicle.fuelType === 'petrol' ? 6.5 : 
       vehicle.fuelType === 'diesel' ? 5.5 : 
       vehicle.fuelType === 'electric' ? 18 : 6.0);

    // Get fuel price
    const pricePerUnit = FUEL_PRICES[vehicle.fuelType as keyof typeof FUEL_PRICES] || FUEL_PRICES.petrol;

    // Calculate total fuel consumption
    const totalFuelConsumption = (consumption / 100) * distance;

    // Calculate total fuel cost
    const totalFuelCost = totalFuelConsumption * pricePerUnit;

    // Calculate cost per person (total seats + driver)
    const totalPersons = Math.max(totalSeats + 1, 1); // Ensure at least 1 person
    const baseFuelCost = roundToFiveRappen(totalFuelCost / totalPersons);

    // Calculate small amount surcharge (if base cost < CHF 2.00)
    const MIN_AMOUNT = 2.00;
    const smallAmountSurcharge = baseFuelCost < MIN_AMOUNT ? roundToFiveRappen(MIN_AMOUNT - baseFuelCost) : 0;

    // Subtotal before platform fee
    const subtotalBeforeFee = roundToFiveRappen(baseFuelCost + smallAmountSurcharge);

    // Calculate 15% platform fee on subtotal
    const platformFee = roundToFiveRappen(subtotalBeforeFee * 0.15);

    // Fixed insurance surcharge
    const insuranceSurcharge = 1.50;

    // Subtotal before tax
    const subtotalBeforeTax = roundToFiveRappen(subtotalBeforeFee + platformFee + insuranceSurcharge);

    // Calculate 8.1% tax (MwSt)
    const tax = roundToFiveRappen(subtotalBeforeTax * 0.081);

    // Total price
    const totalPrice = roundToFiveRappen(subtotalBeforeTax + tax);

    return {
      baseFuelCost,
      smallAmountSurcharge,
      subtotalBeforeFee,
      platformFee,
      insuranceSurcharge,
      subtotalBeforeTax,
      tax,
      totalPrice
    };
  } catch (error) {
    console.error('Error in calculateDetailedPricePerPerson:', error);
    // Return safe fallback values
    return {
      baseFuelCost: 2.00,
      smallAmountSurcharge: 0.00,
      subtotalBeforeFee: 2.00,
      platformFee: 0.30,
      insuranceSurcharge: 1.50,
      subtotalBeforeTax: 3.80,
      tax: 0.30,
      totalPrice: 4.10
    };
  }
}

/**
 * Estimate distance between two cities (mock implementation)
 * In production, use Google Maps Distance Matrix API or similar
 */
export function estimateDistance(from: string, to: string): number {
  // Mock distances between Swiss cities in km
  const distances: { [key: string]: number } = {
    'solothurn-bern': 35,
    'bern-solothurn': 35,
    'zürich-bern': 125,
    'bern-zürich': 125,
    'basel-bern': 95,
    'bern-basel': 95,
    'genf-bern': 160,
    'bern-genf': 160,
    'luzern-bern': 100,
    'bern-luzern': 100,
    'zürich-basel': 85,
    'basel-zürich': 85,
    'zürich-luzern': 50,
    'luzern-zürich': 50,
  };

  const key = `${from.toLowerCase()}-${to.toLowerCase()}`;
  
  // Return mock distance or estimate based on name length (very rough approximation)
  return distances[key] || Math.floor(Math.random() * 100) + 50;
}

/**
 * Format currency in Swiss Francs
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Format consumption value with unit
 */
export function formatConsumption(value: number, unit: string): string {
  return `${value.toFixed(1)} ${unit}/100km`;
}