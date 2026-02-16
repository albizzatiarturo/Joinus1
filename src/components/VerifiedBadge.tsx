import { BadgeCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function VerifiedBadge({ size = 'md', showText = false }: VerifiedBadgeProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="inline-flex items-center gap-1">
      <BadgeCheck 
        className={`${sizeClasses[size]} text-orange-500 fill-orange-500`}
        strokeWidth={2}
      />
      {showText && (
        <span className={`${textSizeClasses[size]} text-orange-600 font-medium`}>
          Verifiziert
        </span>
      )}
    </div>
  );
}
