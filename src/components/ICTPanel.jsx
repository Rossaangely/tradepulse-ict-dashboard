import {
  CheckCircle2,
  Circle,
  Target,
} from 'lucide-react';

export default function ICTPanel({
  news = [],
  session,
  killzone,
  silverBullet,
}) {
  const hasHighImpactNews =
    news.length > 0;

  const isNYSession =
    session?.title
      ?.toLowerCase()
      .includes('new york') ||
    session?.name
      ?.toLowerCase()
      .includes('new york');

  const isKillzone =
    killzone?.title
      ?.toLowerCase()
      .includes('killzone') &&
    !killzone?.title
      ?.toLowerCase()
      .includes('di luar');

  const isSilverBullet =
    silverBullet?.title
      ?.toLowerCase()
      .includes('silver') &&
    !silverBullet?.title
      ?.toLowerCase()
      .includes('menunggu');

  const checklist = [
    {
      label:
        'Tentukan HTF bias: bullish / bearish',
      done: isNYSession,
    },
    {
      label:
        'Tandai liquidity: buy-side dan sell-side',
      done: hasHighImpactNews,
    },
    {
      label:
        'Tunggu liquidity sweep sebelum entry',
      done: false, // manual chart
    },
    {
      label:
        'Cari displacement candle yang jelas',
      done: false, // manual chart
    },
    {
      label:
        'Tandai Fair Value Gap / Order Block',
      done: false, // manual chart
    },
    {
      label:
        'Entry hanya saat retracement ke area POI',
      done: false, // manual chart
    },
    {
      label:
        'Risk management maksimal 1-2%',
      done: true,
    },
  ];

  return (
    <aside className="panel ict-panel">
      <div className="section-title">
        <Target size={26} />
        <h2>
          ICT Analysis Checklist
        </h2>
      </div>

      <div className="checklist">
        {checklist.map(
          (item, index) => (
            <div
              className="check-item"
              key={index}
            >
              {item.done ? (
                <CheckCircle2
                  size={20}
                />
              ) : (
                <Circle size={20} />
              )}

              <span>
                {item.label}
              </span>
            </div>
          )
        )}
      </div>

      <div
        style={{
          marginTop: '18px',
          fontSize: '13px',
          opacity: 0.7,
          lineHeight: 1.6,
        }}
      >
        Checklist chart
        (sweep, displacement,
        FVG, POI) tetap harus
        dianalisis manual di
        TradingView.
      </div>
    </aside>
  );
}