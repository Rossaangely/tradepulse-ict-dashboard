import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  RefreshCcw,
  ShieldCheck,
} from 'lucide-react';

import NewsCard from './components/NewsCard.jsx';
import SessionPanel from './components/SessionPanel.jsx';
import ICTPanel from './components/ICTPanel.jsx';

import {
  getKillzone,
  getMarketSession,
  getSilverBulletWindow,
} from './utils/session.js';

export default function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState('-');

  const now = new Date();

  const session = useMemo(
    () => getMarketSession(now),
    [now]
  );

  const killzone = useMemo(
    () => getKillzone(now),
    [now]
  );

  const silverBullet = useMemo(
    () => getSilverBulletWindow(now),
    [now]
  );

  async function fetchNews() {
    try {
      setLoading(true);
      setError('');

      // REAL DATA FOREXFACTORY
      const url =
        'https://api.allorigins.win/raw?url=' +
        encodeURIComponent(
          'https://nfs.faireconomy.media/ff_calendar_thisweek.xml'
        );

      const response = await fetch(url);
      const xmlText = await response.text();

      const parser = new DOMParser();

      const xmlDoc =
        parser.parseFromString(
          xmlText,
          'text/xml'
        );

      const events = Array.from(
        xmlDoc.getElementsByTagName(
          'event'
        )
      );

      const data = events
        .map((event) => ({
          title:
            event.getElementsByTagName(
              'title'
            )[0]?.textContent || '-',

          country:
            event.getElementsByTagName(
              'country'
            )[0]?.textContent || '-',

          date:
            event.getElementsByTagName(
              'date'
            )[0]?.textContent || '-',

          time:
            event.getElementsByTagName(
              'time'
            )[0]?.textContent || '-',

          impact:
            event.getElementsByTagName(
              'impact'
            )[0]?.textContent || '-',

          actual:
            event.getElementsByTagName(
              'actual'
            )[0]?.textContent || '-',

          forecast:
            event.getElementsByTagName(
              'forecast'
            )[0]?.textContent || '-',

          previous:
            event.getElementsByTagName(
              'previous'
            )[0]?.textContent || '-',
        }))
        .filter(
          (item) =>
            item.country
              .toUpperCase()
              .includes('USD') &&
            item.impact
              .toLowerCase()
              .includes('high')
        );

      setNews(data);

      setLastUpdate(
        new Date().toLocaleTimeString(
          'id-ID',
          {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        'Gagal mengambil data real ForexFactory.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <main>
      <header className="hero">
        <div>
          <span className="app-label">
            <Activity size={16} />
            {' '}
            TradePulse ICT Dashboard
          </span>

          <h1>
            Trading News, Session,
            <br />
            Silver Bullet & ICT Bias
          </h1>

          <p>
            Dashboard edukasi untuk membaca
            high impact USD news,
            market session, killzone,
            Silver Bullet, dan
            checklist analisis ICT/QT.
          </p>
        </div>

        <button
          onClick={fetchNews}
          className="refresh-btn"
        >
          <RefreshCcw size={16} />
          {' '}
          Refresh News
        </button>
      </header>

      <SessionPanel
        session={session}
        killzone={killzone}
        silverBullet={silverBullet}
      />

      <section className="macro-card">
        <div>
          <h2>QT / QE Macro Bias</h2>

          <p>
            QT biasanya memberi tekanan
            ke aset berisiko karena
            likuiditas mengetat.
            QE biasanya mendukung
            risk-on karena likuiditas
            bertambah. Gunakan ini
            sebagai konteks,
            bukan sinyal entry langsung.
          </p>
        </div>

        <ShieldCheck size={36} />
      </section>

      <div className="content-grid">
        {/* NEWS */}
        <section className="panel news-panel">
          <div className="section-title between">
            <div>
              <h2>
                USD High Impact News
              </h2>

              <p>
                Source:
                ForexFactory /
                Fair Economy XML
              </p>
            </div>

            <span className="last-update">
              Update: {lastUpdate}
            </span>
          </div>

          {loading && (
            <div className="status-box">
              Mengambil data news...
            </div>
          )}

          {error && (
            <div className="error-box">
              <AlertTriangle size={18} />
              {' '}
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            news.length === 0 && (
              <div className="status-box">
                Belum ada USD High
                Impact News minggu ini.
              </div>
            )}

          <div className="news-list">
            {news.map(
              (item, index) => (
                <NewsCard
                  key={`${item.title}-${index}`}
                  item={item}
                />
              )
            )}
          </div>
        </section>

        {/* ICT AUTO SETUP */}
        <ICTPanel
          news={news}
          session={session}
          killzone={killzone}
          silverBullet={silverBullet}
        />
      </div>

      <footer>
        Web ini hanya untuk edukasi
        dan analisis terstruktur,
        bukan ajakan buy/sell
        atau jaminan profit.
      </footer>
    </main>
  );
}