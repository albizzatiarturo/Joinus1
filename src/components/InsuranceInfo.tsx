import { Shield, CheckCircle, AlertCircle, FileText, Phone, Camera, Upload, X } from 'lucide-react';
import { useState } from 'react';

export function InsuranceInfo() {
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimForm, setClaimForm] = useState({
    date: '',
    time: '',
    location: '',
    description: '',
    witnesses: '',
    policeReport: false,
  });
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index));
  };

  const handleSubmitClaim = () => {
    // Hier würde die Schadensmeldung an den Server gesendet
    alert('Schadensmeldung erfolgreich eingereicht! Unser Team wird sich innerhalb von 24 Stunden bei dir melden.');
    setShowClaimModal(false);
    setClaimForm({
      date: '',
      time: '',
      location: '',
      description: '',
      witnesses: '',
      policeReport: false,
    });
    setUploadedPhotos([]);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Versicherungsschutz</h3>
            <p className="text-sm text-gray-600">Deine Sicherheit ist uns wichtig</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Coverage Overview */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Vollständiger Schutz während der Fahrt
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Haftpflichtversicherung</p>
                  <p className="text-sm text-gray-600">Bis zu CHF 100'000'000 Deckungssumme</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Unfallversicherung</p>
                  <p className="text-sm text-gray-600">Für alle Insassen während der Fahrt</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Rechtsschutz</p>
                  <p className="text-sm text-gray-600">Kostenlose rechtliche Beratung im Schadensfall</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Insassenschutz</p>
                  <p className="text-sm text-gray-600">Personenschäden bis CHF 5'000'000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="border border-yellow-300 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-900">
                <p className="font-semibold mb-1">Wichtig zu wissen:</p>
                <ul className="space-y-1 ml-4 list-disc">
                  <li>Der Versicherungsschutz gilt nur während bestätigter JoinUs-Fahrten</li>
                  <li>Fahrer müssen über eine gültige Fahrerlaubnis verfügen</li>
                  <li>Das Fahrzeug muss ordnungsgemäss versichert sein</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Insurance Partner */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold text-gray-900 mb-3">Versicherungspartner</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Allianz Suisse</p>
                <p className="text-sm text-gray-600">Führender Versicherer in der Schweiz</p>
              </div>
            </div>
          </div>

          {/* Claims Process */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              Im Schadensfall
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>1. Dokumentiere den Schaden mit Fotos</p>
              <p>2. Melde den Vorfall innerhalb von 24h über die App</p>
              <p>3. Fülle den Schadensbericht online aus</p>
              <p>4. Unser Team bearbeitet deinen Fall innerhalb von 2 Werktagen</p>
            </div>
          </div>

          {/* Contact */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-orange-600" />
              Notfall-Hotline
            </h4>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-2xl font-bold text-orange-600 mb-1">+41 800 123 456</p>
              <p className="text-sm text-gray-600">24/7 erreichbar • Kostenlos aus der ganzen Schweiz</p>
            </div>
          </div>

          {/* Download Documents */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Versicherungsdetails PDF
            </button>
            <button 
              onClick={() => setShowClaimModal(true)}
              className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              Schaden jetzt melden
            </button>
          </div>
        </div>
      </div>

      {/* Claims Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Schadensmeldung</h3>
              <button 
                onClick={() => setShowClaimModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Alert */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-orange-900">
                    <p className="font-semibold mb-1">Wichtiger Hinweis:</p>
                    <p>Bitte melde den Schaden innerhalb von 24 Stunden. Je detaillierter deine Angaben und Fotos, desto schneller können wir deinen Fall bearbeiten.</p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Datum des Vorfalls *
                    </label>
                    <input
                      type="date"
                      value={claimForm.date}
                      onChange={(e) => setClaimForm({...claimForm, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Uhrzeit *
                    </label>
                    <input
                      type="time"
                      value={claimForm.time}
                      onChange={(e) => setClaimForm({...claimForm, time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ort des Vorfalls *
                  </label>
                  <input
                    type="text"
                    value={claimForm.location}
                    onChange={(e) => setClaimForm({...claimForm, location: e.target.value})}
                    placeholder="z.B. Bahnhofstrasse 15, 8001 Zürich"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beschreibung des Schadens *
                  </label>
                  <textarea
                    value={claimForm.description}
                    onChange={(e) => setClaimForm({...claimForm, description: e.target.value})}
                    placeholder="Bitte beschreibe den Vorfall so detailliert wie möglich..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-32"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zeugen (optional)
                  </label>
                  <input
                    type="text"
                    value={claimForm.witnesses}
                    onChange={(e) => setClaimForm({...claimForm, witnesses: e.target.value})}
                    placeholder="Namen und Kontaktdaten von Zeugen"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="policeReport"
                    checked={claimForm.policeReport}
                    onChange={(e) => setClaimForm({...claimForm, policeReport: e.target.checked})}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="policeReport" className="text-sm text-gray-700">
                    Polizeibericht wurde erstellt
                  </label>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fotos hochladen *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Klicke hier um Fotos hochzuladen
                      </p>
                      <p className="text-xs text-gray-500">
                        Oder ziehe Dateien hier her (PNG, JPG bis 10MB)
                      </p>
                    </label>
                  </div>

                  {/* Preview Uploaded Photos */}
                  {uploadedPhotos.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {uploadedPhotos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={photo} 
                            alt={`Schaden Foto ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {uploadedPhotos.length} Foto(s) hochgeladen
                  </p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowClaimModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleSubmitClaim}
                  disabled={!claimForm.date || !claimForm.time || !claimForm.location || !claimForm.description || uploadedPhotos.length === 0}
                  className="flex-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Schadensmeldung einreichen
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                * Pflichtfelder müssen ausgefüllt werden
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}