import React from 'react';

// Tier 'off': no WebGL. Two soft gradient forms stand in for the Monolith.
export default function StaticFallback() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute right-[-8%] top-[6%] w-[52vw] h-[52vw] max-w-[720px] max-h-[720px] rounded-[45%_55%_52%_48%/48%_46%_54%_52%] bg-[radial-gradient(circle_at_35%_30%,rgba(143,227,255,0.32),rgba(201,163,255,0.16)_45%,rgba(6,7,11,0)_70%)] blur-2xl opacity-90" />
      <div className="absolute left-[-15%] bottom-[-12%] w-[42vw] h-[42vw] rounded-full bg-[radial-gradient(circle,rgba(201,163,255,0.14),rgba(6,7,11,0)_65%)] blur-3xl" />
    </div>
  );
}
