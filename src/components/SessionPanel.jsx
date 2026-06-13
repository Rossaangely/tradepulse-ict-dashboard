import { Clock, Zap } from 'lucide-react';

export default function SessionPanel({ session, killzone, silverBullet }) {
  return (
    <section className="session-grid">
      <div className="session-card">
        <Clock size={24} />
        <p>Market Session</p>
        <h3>{session}</h3>
      </div>

      <div className="session-card">
        <Zap size={24} />
        <p>ICT Killzone</p>
        <h3>{killzone}</h3>
      </div>

      <div className="session-card highlight">
        <Zap size={24} />
        <p>Silver Bullet</p>
        <h3>{silverBullet}</h3>
      </div>
    </section>
  );
}
