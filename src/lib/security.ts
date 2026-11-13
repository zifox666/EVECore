// SPDX-License-Identifier: MIT
// Security status colours and EVE rounding rules. Shared by SystemChip and any star map.

export const SECURITY_COLORS: Record<string, string> = {
  '1.0': '#2C75E1',
  '0.9': '#399AEB',
  '0.8': '#4ECEF8',
  '0.7': '#60DBA3',
  '0.6': '#71E754',
  '0.5': '#F5FF83',
  '0.4': '#DC6C06',
  '0.3': '#CE440F',
  '0.2': '#BB1116',
  '0.1': '#731F1F',
  '0.0': '#8D3163',
};

/**
 * Round a true security status the way the EVE client displays it:
 * 0.05 rounds up to 0.1, anything in (0, 0.05) shows as 0.1, ≤ 0 shows as its value rounded to 1 dp.
 */
export function roundSecurity(sec: number): number {
  if (sec > 0 && sec < 0.05) return 0.1;
  const r = Math.round(sec * 10 + 1e-9) / 10;
  return Math.max(-1, Math.min(1, r));
}

export function formatSecurity(sec: number): string {
  return roundSecurity(sec).toFixed(1);
}

export function securityColor(sec: number): string {
  const r = roundSecurity(sec);
  if (r <= 0) return SECURITY_COLORS['0.0'];
  return SECURITY_COLORS[r.toFixed(1)];
}

/** `#RRGGBB` + alpha (0–1) → `rgba()` */
export function withAlpha(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
