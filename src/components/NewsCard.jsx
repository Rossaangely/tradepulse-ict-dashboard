import { CalendarDays, ExternalLink, Flame } from 'lucide-react';

export default function NewsCard({ item }) {
  return (
    <div className="news-card">
      <div className="news-top">
        <span className="badge high"><Flame size={14} /> High Impact</span>
        <span className="badge usd">USD</span>
      </div>

      <h3>{item.title}</h3>

      <div className="news-meta">
        <p><CalendarDays size={16} /> {item.date} - {item.time}</p>
        <p>Forecast: <b>{item.forecast || '-'}</b></p>
        <p>Previous: <b>{item.previous || '-'}</b></p>
      </div>

      {item.url && (
        <a href={item.url} target="_blank" rel="noreferrer" className="link-btn">
          Lihat detail <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}
