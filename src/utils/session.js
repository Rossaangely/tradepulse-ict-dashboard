export function getMarketSession(date = new Date()) {
  const utcHour = date.getUTCHours();

  if (utcHour >= 0 && utcHour < 7) return 'Asia Session';
  if (utcHour >= 7 && utcHour < 12) return 'London Session';
  if (utcHour >= 12 && utcHour < 16) return 'London - New York Overlap';
  if (utcHour >= 16 && utcHour < 21) return 'New York Session';
  return 'After Market / Low Liquidity';
}

export function getKillzone(date = new Date()) {
  const utcHour = date.getUTCHours();
  const utcMinute = date.getUTCMinutes();
  const total = utcHour * 60 + utcMinute;

  const zones = [
    { name: 'London Killzone', start: 7 * 60, end: 10 * 60 },
    { name: 'New York AM Killzone', start: 12 * 60, end: 15 * 60 },
    { name: 'New York PM Killzone', start: 18 * 60, end: 20 * 60 }
  ];

  return zones.find((zone) => total >= zone.start && total <= zone.end)?.name || 'Di luar Killzone';
}

export function getSilverBulletWindow(date = new Date()) {
  const utcHour = date.getUTCHours();

  if (utcHour === 10) return 'London Silver Bullet';
  if (utcHour === 14) return 'New York AM Silver Bullet';
  if (utcHour === 19) return 'New York PM Silver Bullet';
  return 'Menunggu window Silver Bullet';
}
