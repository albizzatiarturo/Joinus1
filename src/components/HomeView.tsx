import { Star, Search } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { InsuranceInfo } from './InsuranceInfo';
import { PackageDeliverySystem } from './PackageDeliverySystem';
import { VoiceCommand } from './VoiceCommand';

interface HomeViewProps {
  onGoToSearch: () => void;
}

const testimonials = [
  {
    name: 'Anna Müller',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    text: 'Dank JoinUs spare ich jeden Monat über 200 CHF an Benzinkosten. Die Fahrer sind super freundlich und zuverlässig!',
    route: 'Solothurn → Bern'
  },
  {
    name: 'Markus Weber',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    text: 'Fantastische Plattform! Ich biete regelmässig Fahrten an und habe bereits viele nette Mitfahrer kennengelernt.',
    route: 'Zürich → Bern'
  },
  {
    name: 'Sarah Schmidt',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
    text: 'Perfekt für meine tägliche Pendelstrecke. Schnell, unkompliziert und umweltfreundlich. Kann ich nur empfehlen!',
    route: 'Bern → Zürich'
  },
  {
    name: 'Thomas Klein',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    rating: 5,
    text: 'Die automatische Kostenberechnung ist genial. Ich weiss immer genau, wie viel ich für eine Fahrt verlangen sollte.',
    route: 'Basel → Bern'
  }
];

const rideImages = [
  {
    url: 'https://images.unsplash.com/photo-1584895073163-433851634c57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Gemeinsam unterwegs',
    description: 'Spare Kosten und schone die Umwelt'
  },
  {
    url: 'https://images.unsplash.com/photo-1719778532480-544012d378a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Neue Freundschaften',
    description: 'Lerne interessante Menschen kennen'
  },
  {
    url: 'https://images.unsplash.com/photo-1678929499710-9157e361674f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Komfortabel reisen',
    description: 'Entspannte Fahrten zu fairen Preisen'
  }
];

export function HomeView({ onGoToSearch }: HomeViewProps) {
  const handleVoiceCommand = (command: string, params: any) => {
    console.log('Voice command:', command, params);
    if (command === 'search' || command === 'popular-routes' || command === 'my-rides') {
      onGoToSearch();
    }
  };

  const handlePackageDeliveryRequest = (delivery: any) => {
    console.log('Package delivery requested:', delivery);
    alert(`Paket-Transport von ${delivery.from} nach ${delivery.to} wurde angefragt! Wir suchen passende Fahrer.`);
  };

  return (
    <div className="space-y-12">
      {/* Voice Command Component */}
      <VoiceCommand onCommand={handleVoiceCommand} />

      {/* Hero Section with Images */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="p-8 md:p-12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Willkommen bei JoinUs
            </h1>
            <p className="text-xl text-orange-100 mb-6">
              Teile freie Plätze in deinem Auto und spare Kosten. 
              Finde Mitfahrgelegenheiten für deine täglichen Strecken.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <p className="font-semibold">Kosten sparen</p>
                  <p className="text-sm text-orange-100">Bis zu 70% günstiger reisen</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <p className="font-semibold">Umwelt schonen</p>
                  <p className="text-sm text-orange-100">CO2-Ausstoss reduzieren</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <p className="font-semibold">Neue Leute kennenlernen</p>
                  <p className="text-sm text-orange-100">Vernetze dich mit anderen</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block h-full">
            <ImageWithFallback 
              src={rideImages[0].url}
              alt="Gemeinsam unterwegs"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Large Search Button */}
      <section className="text-center">
        <button
          onClick={onGoToSearch}
          className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-xl text-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <Search className="w-8 h-8" />
          <span>Fahrt Suche hier klicken</span>
        </button>
      </section>

      {/* Package Delivery Section */}
      <section>
        <PackageDeliverySystem onRequestDelivery={handlePackageDeliveryRequest} />
      </section>

      {/* Ride Images Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Erlebe Fahrgemeinschaften
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {rideImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-1">{image.title}</h3>
                <p className="text-white/90 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insurance Info Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Deine Sicherheit steht an erster Stelle
        </h2>
        <InsuranceInfo />
      </section>

      {/* User Reviews */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Das sagen unsere Nutzer
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.route}</p>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          JoinUs in Zahlen
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center text-white">
            <div className="text-5xl font-bold mb-2">10'000+</div>
            <div className="text-orange-100">Aktive Nutzer</div>
          </div>
          <div className="text-center text-white">
            <div className="text-5xl font-bold mb-2">50'000+</div>
            <div className="text-orange-100">Erfolgreiche Fahrten</div>
          </div>
          <div className="text-center text-white">
            <div className="text-5xl font-bold mb-2">2.5 Mio</div>
            <div className="text-orange-100">Gesparte Kilometer</div>
          </div>
          <div className="text-center text-white">
            <div className="text-5xl font-bold mb-2">4.9 ⭐</div>
            <div className="text-orange-100">Durchschnittsbewertung</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gray-100 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Bereit loszulegen?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Finde jetzt deine nächste Mitfahrgelegenheit oder biete selbst eine Fahrt an. 
          Gemeinsam machen wir Mobilität günstiger und nachhaltiger!
        </p>
        <button
          onClick={onGoToSearch}
          className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-md hover:shadow-lg transition-all"
        >
          <Search className="w-6 h-6" />
          <span>Jetzt Fahrt suchen</span>
        </button>
      </section>
    </div>
  );
}