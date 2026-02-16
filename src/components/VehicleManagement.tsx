import { useState } from 'react';
import { Car, Plus, Edit2, Trash2, X, Save, Fuel, Calendar, Settings as SettingsIcon } from 'lucide-react';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  consumption: number; // L/100km or kWh/100km
  isDefault: boolean;
}

interface VehicleManagementProps {
  vehicles: Vehicle[];
  onAddVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  onUpdateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  onDeleteVehicle: (id: string) => void;
  onClose: () => void;
}

// Mock database of vehicles with their consumption data
const vehicleDatabase = {
  'VW Golf': {
    petrol: { '2020-2024': 6.2, '2015-2019': 6.8, '2010-2014': 7.2 },
    diesel: { '2020-2024': 4.8, '2015-2019': 5.2, '2010-2014': 5.6 },
    hybrid: { '2020-2024': 4.5, '2015-2019': 5.0 }
  },
  'VW Polo': {
    petrol: { '2020-2024': 5.8, '2015-2019': 6.2, '2010-2014': 6.6 },
    diesel: { '2020-2024': 4.5, '2015-2019': 4.8, '2010-2014': 5.2 }
  },
  'BMW 3er': {
    petrol: { '2020-2024': 7.2, '2015-2019': 7.8, '2010-2014': 8.5 },
    diesel: { '2020-2024': 5.5, '2015-2019': 6.0, '2010-2014': 6.5 },
    hybrid: { '2020-2024': 5.0, '2015-2019': 5.5 }
  },
  'Audi A4': {
    petrol: { '2020-2024': 7.0, '2015-2019': 7.5, '2010-2014': 8.2 },
    diesel: { '2020-2024': 5.2, '2015-2019': 5.8, '2010-2014': 6.2 }
  },
  'Mercedes C-Klasse': {
    petrol: { '2020-2024': 7.5, '2015-2019': 8.0, '2010-2014': 8.8 },
    diesel: { '2020-2024': 5.8, '2015-2019': 6.2, '2010-2014': 6.8 }
  },
  'Tesla Model 3': {
    electric: { '2020-2024': 15.0, '2015-2019': 16.5 }
  },
  'Renault Zoe': {
    electric: { '2020-2024': 17.0, '2015-2019': 18.5, '2010-2014': 19.0 }
  },
  'Toyota Prius': {
    hybrid: { '2020-2024': 4.2, '2015-2019': 4.5, '2010-2014': 4.8 }
  },
  'Fiat 500': {
    petrol: { '2020-2024': 5.2, '2015-2019': 5.6, '2010-2014': 6.0 }
  },
  'Opel Corsa': {
    petrol: { '2020-2024': 5.5, '2015-2019': 6.0, '2010-2014': 6.5 },
    diesel: { '2020-2024': 4.2, '2015-2019': 4.6, '2010-2014': 5.0 }
  }
};

export function VehicleManagement({ vehicles, onAddVehicle, onUpdateVehicle, onDeleteVehicle, onClose }: VehicleManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    fuelType: 'petrol' as Vehicle['fuelType'],
    consumption: 0,
    isDefault: false
  });

  const brands = Object.keys(vehicleDatabase);

  const getYearRange = (year: number): string => {
    if (year >= 2020) return '2020-2024';
    if (year >= 2015) return '2015-2019';
    if (year >= 2010) return '2010-2014';
    return '2010-2014';
  };

  const handleModelChange = (model: string) => {
    setFormData({ ...formData, model });
    
    // Auto-calculate consumption based on database
    const vehicleData = vehicleDatabase[model as keyof typeof vehicleDatabase];
    if (vehicleData) {
      const yearRange = getYearRange(formData.year);
      const fuelData = vehicleData[formData.fuelType];
      if (fuelData) {
        const consumption = fuelData[yearRange as keyof typeof fuelData] || Object.values(fuelData)[0];
        setFormData(prev => ({ ...prev, consumption }));
      }
    }
  };

  const handleFuelTypeChange = (fuelType: Vehicle['fuelType']) => {
    setFormData({ ...formData, fuelType });
    
    // Auto-calculate consumption
    if (formData.model) {
      const vehicleData = vehicleDatabase[formData.model as keyof typeof vehicleDatabase];
      if (vehicleData) {
        const yearRange = getYearRange(formData.year);
        const fuelData = vehicleData[fuelType];
        if (fuelData) {
          const consumption = fuelData[yearRange as keyof typeof fuelData] || Object.values(fuelData)[0];
          setFormData(prev => ({ ...prev, consumption }));
        }
      }
    }
  };

  const handleYearChange = (year: number) => {
    setFormData({ ...formData, year });
    
    // Auto-calculate consumption
    if (formData.model) {
      const vehicleData = vehicleDatabase[formData.model as keyof typeof vehicleDatabase];
      if (vehicleData) {
        const yearRange = getYearRange(year);
        const fuelData = vehicleData[formData.fuelType];
        if (fuelData) {
          const consumption = fuelData[yearRange as keyof typeof fuelData] || Object.values(fuelData)[0];
          setFormData(prev => ({ ...prev, consumption }));
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      onUpdateVehicle(editingId, formData);
      setEditingId(null);
    } else {
      onAddVehicle(formData);
    }
    
    setFormData({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      fuelType: 'petrol',
      consumption: 0,
      isDefault: false
    });
    setShowAddForm(false);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setFormData({
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      fuelType: vehicle.fuelType,
      consumption: vehicle.consumption,
      isDefault: vehicle.isDefault
    });
    setEditingId(vehicle.id);
    setShowAddForm(true);
  };

  const getFuelTypeLabel = (fuelType: Vehicle['fuelType']) => {
    const labels = {
      petrol: 'Benzin',
      diesel: 'Diesel',
      electric: 'Elektro',
      hybrid: 'Hybrid'
    };
    return labels[fuelType];
  };

  const getFuelTypeIcon = (fuelType: Vehicle['fuelType']) => {
    const icons = {
      petrol: '⛽',
      diesel: '🛢️',
      electric: '🔌',
      hybrid: '🔋'
    };
    return icons[fuelType];
  };

  return (
    <div className="pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Car className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Meine Fahrzeuge</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Vehicle List */}
          {vehicles.length > 0 && (
            <div className="space-y-4 mb-6">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`border-2 rounded-lg p-4 ${
                    vehicle.isDefault ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{getFuelTypeIcon(vehicle.fuelType)}</span>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {vehicle.model}
                        </h3>
                        {vehicle.isDefault && (
                          <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
                            Standard
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Baujahr: {vehicle.year}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Fuel className="w-4 h-4" />
                          <span>{getFuelTypeLabel(vehicle.fuelType)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 col-span-2">
                          <SettingsIcon className="w-4 h-4" />
                          <span>
                            Verbrauch: {vehicle.consumption} {vehicle.fuelType === 'electric' ? 'kWh' : 'L'}/100km
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(vehicle)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDeleteVehicle(vehicle.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Vehicle Button */}
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors"
            >
              <Plus className="w-6 h-6" />
              <span className="font-medium">Fahrzeug hinzufügen</span>
            </button>
          )}

          {/* Add/Edit Form */}
          {showAddForm && (
            <form onSubmit={handleSubmit} className="border-2 border-orange-300 rounded-lg p-6 bg-orange-50/30">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">
                {editingId ? 'Fahrzeug bearbeiten' : 'Neues Fahrzeug hinzufügen'}
              </h3>

              <div className="space-y-4">
                {/* Model Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modell *
                  </label>
                  <select
                    value={formData.model}
                    onChange={(e) => handleModelChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Modell auswählen</option>
                    {brands.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Die Verbrauchsdaten werden automatisch aus unserer Datenbank geladen
                  </p>
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Baujahr *
                  </label>
                  <input
                    type="number"
                    min="2000"
                    max={new Date().getFullYear()}
                    value={formData.year}
                    onChange={(e) => handleYearChange(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Treibstoffart *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['petrol', 'diesel', 'electric', 'hybrid'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleFuelTypeChange(type)}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                          formData.fuelType === type
                            ? 'border-orange-500 bg-orange-100 text-orange-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <span className="text-xl">{getFuelTypeIcon(type)}</span>
                        <span className="font-medium">{getFuelTypeLabel(type)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Consumption */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durchschnittsverbrauch *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.consumption}
                      onChange={(e) => setFormData({ ...formData, consumption: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      {formData.fuelType === 'electric' ? 'kWh/100km' : 'L/100km'}
                    </div>
                  </div>
                  {formData.consumption > 0 && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Automatisch berechnet basierend auf Fahrzeugdaten
                    </p>
                  )}
                </div>

                {/* Default Vehicle */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="isDefault" className="text-sm text-gray-700">
                    Als Standardfahrzeug festlegen
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingId(null);
                      setFormData({
                        brand: '',
                        model: '',
                        year: new Date().getFullYear(),
                        fuelType: 'petrol',
                        consumption: 0,
                        isDefault: false
                      });
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {editingId ? 'Speichern' : 'Hinzufügen'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
