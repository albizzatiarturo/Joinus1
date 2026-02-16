import logo from 'figma:asset/919c689e1e910dcd8bee9571561898173173a8aa.png';

export function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-8 mb-8 text-white">
      <div className="flex flex-col items-center text-center">
        <div className="bg-white p-4 rounded-2xl shadow-lg mb-4">
          <img 
            src={logo} 
            alt="JoinUs Logo" 
            className="w-20 h-20"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
        <h1 className="text-4xl font-bold mb-2">JoinUs</h1>
        <p className="text-xl text-orange-100 mb-4">Gemeinsam unterwegs</p>
        <p className="text-orange-50 max-w-2xl">
          Teile freie Plätze in deinem Auto und spare Kosten. 
          Finde Mitfahrgelegenheiten für deine täglichen Strecken.
        </p>
      </div>
    </div>
  );
}