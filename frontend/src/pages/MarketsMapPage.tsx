import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getMarkets } from '../services/api';
import { PageHeader } from '../components/ui';
import 'leaflet/dist/leaflet.css';
import { PageLoading } from '../components/PageLoading';
import { PageError } from '../components/PageError';

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function MarketsMapPage() {
  const [markets, setMarkets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMarkets()
      .then((res) => setMarkets(res.data ?? []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const marketsWithCoords = markets.filter(
    (m) => m.latitude != null && m.longitude != null
  );

  const center: [number, number] = marketsWithCoords.length > 0
    ? [marketsWithCoords[0].latitude, marketsWithCoords[0].longitude]
    : [-22.9068, -43.1729];

    if (loading) return <PageLoading />;
    if (error) return <PageError message={error} onRetry={() => window.location.reload()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      <PageHeader
        title="Mercados"
        subtitle={`${marketsWithCoords.length} mercado(s) mapeado(s)`}
      />

      <div style={{ flex: 1, padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{
          flex: 1,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 4px 0 var(--green-muted), 0 6px 16px rgba(80,140,80,0.10)',
          minHeight: 300,
        }}>
          {marketsWithCoords.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: 14, textAlign: 'center', padding: 24 }}>
              Nenhum mercado com localização.<br />Importe mais notas para popular o mapa.
            </div>
          ) : (
            <MapContainer
              center={center}
              zoom={14}
              style={{ height: '100%', width: '100%', minHeight: 300 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {marketsWithCoords.map((market) => (
                <Marker
                  key={market.id}
                  position={[market.latitude, market.longitude]}
                  icon={greenIcon}
                >
                  <Popup>
                    <div style={{ fontFamily: 'Nunito, sans-serif', minWidth: 150 }}>
                      <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4, color: '#1a2e1a' }}>
                        {market.displayName ?? market.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#6a8a6a' }}>
                        {market.city} · {market.state}
                      </div>
                      {market.address && (
                        <div style={{ fontSize: 11, color: '#90aa90', marginTop: 2 }}>
                          {market.address.split(',').slice(0, 2).join(',')}
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {marketsWithCoords.map((market) => (
            <div key={market.id} style={{
              background: '#fff',
              borderRadius: 12,
              padding: '10px 14px',
              boxShadow: '0 3px 0 var(--green-muted), 0 4px 10px rgba(80,140,80,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--green)',
                flexShrink: 0,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>
                  {market.displayName ?? market.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  {market.city} · {market.state}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}