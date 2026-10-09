import React from 'react';

interface BrandLogoProps {
  variant?: 'header' | 'hero' | 'footer';
  className?: string;
  customLogoUrl?: string;
}

/**
 * Exact recreation of the uploaded "Bite & Savor" gold script & crescent croissant logo:
 * - Features the flowing gold script "Bite & Savor"
 * - The long crossbar of the 't' in "Bite" sweeps continuously upward into the left tip of the tilted crescent croissant
 * - The croissant is perched directly above "& Savor" with delicate laminated segments and a trailing flourish on the right
 * - Also supports rendering an uploaded custom logo image if configured in the Bakery Owner Studio.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'header',
  className = '',
  customLogoUrl,
}) => {
  const dimensions = {
    header: 'h-11 md:h-13 w-auto',
    hero: 'h-24 md:h-28 w-auto',
    footer: 'h-20 md:h-24 w-auto',
  }[variant];

  if (customLogoUrl) {
    return (
      <span className={`inline-flex items-center select-none shrink-0 ${className}`}>
        <img
          src={customLogoUrl}
          alt="Bite & Savor Logo"
          referrerPolicy="no-referrer"
          className={`${dimensions} object-contain ${
            variant === 'footer' ? 'brightness-110' : 'mix-blend-multiply'
          }`}
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center select-none shrink-0 ${className}`}
      aria-label="Bite & Savor — Bite of Savour Bakery Logo"
    >
      <svg
        viewBox="0 0 360 155"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={dimensions}
        role="img"
        aria-label="Bite & Savor gold script and croissant logo"
      >
        <defs>
          <linearGradient id="biteSavorGold" x1="0%" y1="0%" x2="100%" y2="25%">
            <stop offset="0%" stopColor="#C5A358" />
            <stop offset="50%" stopColor="#D4B46A" />
            <stop offset="100%" stopColor="#B69348" />
          </linearGradient>
        </defs>

        {/* Continuous sweeping crossbar of the 't' in "Bite" flowing into the left tip of the croissant */}
        <path
          d="M 96 93 C 126 98, 156 95, 177 77"
          stroke="url(#biteSavorGold)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* Exact Line-Art Crescent Croissant arched over "& Savor" */}
        <g
          stroke="url(#biteSavorGold)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* 1. Far-left tiny tip where the 't' crossbar meets the croissant */}
          <path
            d="M 177 77 C 174 74, 176 69, 181 70 C 183 74, 180 78, 177 77 Z"
            strokeWidth="1.65"
          />
          <path
            d="M 178 78 C 183 81, 190 79, 194 74"
            strokeWidth="1.55"
          />

          {/* 2. Second left segment */}
          <path
            d="M 181 70 C 181 61, 187 54, 195 56 C 192 63, 187 69, 181 70"
            strokeWidth="1.65"
          />
          {/* Subtle inner texture strokes on left segment */}
          <path d="M 186 64 C 188 60, 191 58, 194 58" strokeWidth="1.1" opacity="0.85" />
          <path d="M 192 73 C 197 72, 203 70, 208 69" strokeWidth="1.5" />

          {/* 3. Central high-domed main crescent body */}
          <path
            d="M 193 56 C 197 38, 211 26, 227 28 C 234 29, 238 35, 235 44 C 225 36, 208 42, 199 58"
            strokeWidth="1.8"
          />
          {/* Inner contour & flaky layer lines inside central dome */}
          <path
            d="M 200 58 C 208 59, 216 62, 224 67"
            strokeWidth="1.6"
          />
          <path
            d="M 205 64 C 211 65, 217 66, 223 68"
            strokeWidth="1.35"
          />
          <path
            d="M 202 47 C 207 37, 216 32, 225 34"
            strokeWidth="1.15"
            opacity="0.8"
          />

          {/* 4. First right curved laminated rib */}
          <path
            d="M 225 30 C 237 31, 246 40, 245 53 C 244 60, 238 65, 232 63 C 235 54, 233 42, 224 36"
            strokeWidth="1.75"
          />
          {/* Double-line rib crease */}
          <path
            d="M 229 35 C 237 40, 240 50, 236 60"
            strokeWidth="1.3"
          />

          {/* 5. Second right curved laminated rib */}
          <path
            d="M 239 40 C 248 44, 252 54, 248 64 C 245 70, 239 72, 234 69 C 240 64, 243 55, 240 46"
            strokeWidth="1.65"
          />
          <path
            d="M 243 46 C 247 52, 247 60, 242 66"
            strokeWidth="1.25"
          />

          {/* 6. Third right curved rib */}
          <path
            d="M 246 53 C 252 57, 253 66, 248 73 C 244 77, 238 77, 235 73"
            strokeWidth="1.6"
          />

          {/* 7. Right tucked tip & delicate trailing line sweeping down-right */}
          <path
            d="M 247 68 C 250 72, 249 78, 244 81 C 240 82, 237 79, 238 75"
            strokeWidth="1.5"
          />
          <path
            d="M 245 78 C 249 85, 255 93, 261 99"
            strokeWidth="1.4"
          />
        </g>

        {/* Calligraphic Script matching the uploaded image: "Bite & Savor" */}
        <text
          x="18"
          y="122"
          fill="url(#biteSavorGold)"
          className="font-script-logo"
          fontSize="58"
          letterSpacing="0.5"
        >
          Bite
        </text>

        <text
          x="144"
          y="124"
          fill="url(#biteSavorGold)"
          className="font-script-logo"
          fontSize="50"
        >
          &amp;
        </text>

        <text
          x="198"
          y="122"
          fill="url(#biteSavorGold)"
          className="font-script-logo"
          fontSize="58"
          letterSpacing="0.5"
        >
          Savor
        </text>
      </svg>
    </span>
  );
};
