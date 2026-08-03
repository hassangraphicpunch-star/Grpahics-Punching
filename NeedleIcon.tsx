import React from 'react';

export const Needle: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Needle Eye */}
    <ellipse cx="12" cy="5" rx="1.5" ry="3" />
    {/* Needle Shaft */}
    <path d="M12 8v12" />
    {/* Thread Loop */}
    <path d="M12 4C8 2 5 5 8 9c2.5 3.3 4 1 4 1" strokeDasharray="2 2" />
  </svg>
);
