
export function TrophyGoldIcon({ className, size = 64 }: { className?: string, size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldCup" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="30%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        <linearGradient id="goldBase" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      
      {/* Handles */}
      <path d="M 24 35 C -2 35 5 70 30 60" fill="none" stroke="url(#goldCup)" strokeWidth="7" strokeLinecap="round" />
      <path d="M 76 35 C 102 35 95 70 70 60" fill="none" stroke="url(#goldCup)" strokeWidth="7" strokeLinecap="round" />
      
      {/* Base */}
      <path d="M 35 95 L 65 95 L 60 75 L 40 75 Z" fill="url(#goldBase)" />
      
      {/* Stem */}
      <rect x="46" y="65" width="8" height="15" fill="#92400E" />
      <rect x="45" y="70" width="10" height="3" fill="#FEF08A" opacity="0.8" />
      
      {/* Cup Bowl */}
      <path d="M 20 25 L 80 25 C 80 60 65 72 50 72 C 35 72 20 60 20 25 Z" fill="url(#goldCup)" />
      
      {/* Outer Rim */}
      <ellipse cx="50" cy="25" rx="30" ry="8" fill="#FBBF24" />
      
      {/* Inner Hole */}
      <ellipse cx="50" cy="26" rx="26" ry="5" fill="#78350F" />
      
      {/* Highlights / Reflections */}
      <path d="M 24 32 C 26 48 35 58 45 65 C 33 55 28 40 28 28 Z" fill="#FEF08A" opacity="0.6" />
      <circle cx="35" cy="40" r="2.5" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

export function MedalSilverIcon({ className, size = 64 }: { className?: string, size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silverCoin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="40%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="ribbonRed" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#B91C1C" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
      </defs>
      {/* Ribbon */}
      <path d="M 25 0 L 45 45 L 55 45 L 75 0 L 60 0 L 50 25 L 40 0 Z" fill="url(#ribbonRed)" />
      
      {/* Coin Background */}
      <circle cx="50" cy="62" r="30" fill="url(#silverCoin)" />
      <circle cx="50" cy="62" r="26" fill="none" stroke="#F1F5F9" strokeWidth="2" strokeOpacity="0.6" />
      
      {/* Shadow / Edge */}
      <circle cx="50" cy="62" r="28" fill="none" stroke="#1E293B" strokeWidth="1" strokeOpacity="0.5" />

      {/* Shine/Reflection */}
      <path d="M 26 50 Q 50 20 74 50 Q 50 40 26 50 Z" fill="#FFFFFF" opacity="0.2" />

      {/* Text 2 */}
      <text x="50" y="76" fontSize="36" fontFamily="Arial, sans-serif" fontWeight="900" textAnchor="middle" fill="#0F172A" opacity="0.7">2</text>
      <text x="49" y="75" fontSize="36" fontFamily="Arial, sans-serif" fontWeight="900" textAnchor="middle" fill="#F8FAFC">2</text>
    </svg>
  );
}

export function MedalBronzeIcon({ className, size = 64 }: { className?: string, size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bronzeCoin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="40%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id="ribbonBlue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      {/* Ribbon */}
      <path d="M 25 0 L 45 45 L 55 45 L 75 0 L 60 0 L 50 25 L 40 0 Z" fill="url(#ribbonBlue)" />
      
      {/* Coin Background */}
      <circle cx="50" cy="62" r="30" fill="url(#bronzeCoin)" />
      <circle cx="50" cy="62" r="26" fill="none" stroke="#FEF3C7" strokeWidth="2" strokeOpacity="0.5" />
      
      {/* Shadow / Edge */}
      <circle cx="50" cy="62" r="28" fill="none" stroke="#451A03" strokeWidth="1" strokeOpacity="0.5" />

      {/* Shine/Reflection */}
      <path d="M 26 50 Q 50 20 74 50 Q 50 40 26 50 Z" fill="#FFFFFF" opacity="0.2" />

      {/* Text 3 */}
      <text x="50" y="76" fontSize="36" fontFamily="Arial, sans-serif" fontWeight="900" textAnchor="middle" fill="#451A03" opacity="0.7">3</text>
      <text x="49" y="75" fontSize="36" fontFamily="Arial, sans-serif" fontWeight="900" textAnchor="middle" fill="#FEF3C7">3</text>
    </svg>
  );
}
