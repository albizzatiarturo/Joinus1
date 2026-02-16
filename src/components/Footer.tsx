import logo from 'figma:asset/919c689e1e910dcd8bee9571561898173173a8aa.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="JoinUs Logo" 
                className="h-28 w-auto"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
            <p className="text-sm text-gray-600">
              Kosteneffiziente, nachhaltige Mobilität für alle. Teile freie Plätze und reduziere unnötige Leerfahrten.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Schnellzugriff</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-orange-600 transition-colors">Über uns</button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-orange-600 transition-colors">Wie es funktioniert</button>
              </li>
              <li>
                <button onClick={() => onNavigate('safety')} className="hover:text-orange-600 transition-colors">Sicherheit</button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-orange-600 transition-colors">FAQ</button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-orange-600 transition-colors">Datenschutz</button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-orange-600 transition-colors">AGB</button>
              </li>
              <li>
                <button onClick={() => onNavigate('imprint')} className="hover:text-orange-600 transition-colors">Impressum</button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-orange-600 transition-colors">Kontakt</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm font-semibold text-gray-700 mb-2">Akzeptierte Zahlungsmethoden</p>
              <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
                {/* TWINT */}
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
                  TWINT
                </div>
                
                {/* Credit Cards */}
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <svg className="w-8 h-6" viewBox="0 0 48 32" fill="none">
                    <rect width="48" height="32" rx="4" fill="#1434CB"/>
                    <circle cx="18" cy="16" r="7" fill="#EB001B"/>
                    <circle cx="30" cy="16" r="7" fill="#FF5F00"/>
                    <path d="M24 11a7.003 7.003 0 0 0 0 10 7.003 7.003 0 0 0 0-10z" fill="#F79E1B"/>
                  </svg>
                  <svg className="w-8 h-6" viewBox="0 0 48 32" fill="none">
                    <rect width="48" height="32" rx="4" fill="#0066B2"/>
                    <path d="M20 11h8v10h-8z" fill="#FFAA00"/>
                    <circle cx="17" cy="16" r="6" fill="#EB001B" opacity="0.9"/>
                    <circle cx="31" cy="16" r="6" fill="#F79E1B" opacity="0.9"/>
                  </svg>
                </div>

                {/* PayPal */}
                <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                  PayPal
                </div>

                {/* Cash */}
                <div className="bg-green-600 text-white px-3 py-2 rounded-lg text-2xl">
                  💵
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-600 text-center md:text-right">
              <p>&copy; 2026 JoinUs. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}