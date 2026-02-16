import { Shield, Baby } from 'lucide-react';

interface SpecialBadgesProps {
  womensOnly?: boolean;
  childFriendly?: boolean;
  packageDelivery?: boolean;
  eventType?: string;
  size?: 'sm' | 'md';
}

export function SpecialBadges({ womensOnly, childFriendly, packageDelivery, eventType, size = 'md' }: SpecialBadgesProps) {
  const badgeSize = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className="flex flex-wrap gap-2">
      {womensOnly && (
        <div className={`${badgeSize} bg-pink-100 text-pink-700 rounded-full font-medium flex items-center gap-1.5`}>
          <Shield className={iconSize} />
          <span>👩 Nur Frauen</span>
        </div>
      )}
      
      {childFriendly && (
        <div className={`${badgeSize} bg-blue-100 text-blue-700 rounded-full font-medium flex items-center gap-1.5`}>
          <Baby className={iconSize} />
          <span>Kindersitz verfügbar</span>
        </div>
      )}
      
      {packageDelivery && (
        <div className={`${badgeSize} bg-purple-100 text-purple-700 rounded-full font-medium flex items-center gap-1.5`}>
          <span>📦</span>
          <span>Paket-Mitnahme</span>
        </div>
      )}
      
      {eventType && (
        <div className={`${badgeSize} bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full font-medium flex items-center gap-1.5`}>
          <span>🎉</span>
          <span>{eventType}</span>
        </div>
      )}
    </div>
  );
}
