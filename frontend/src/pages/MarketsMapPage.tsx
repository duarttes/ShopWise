import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getMarkets } from '../services/api';
import { PageHeader, Card, SectionLabel } from '../components/ui';
import { PageLoading } from '../components/PageLoading';
import { PageError } from '../components/PageError';
import 'leaflet/dist/leaflet.css';
import { updateLocation } from '../services/api';

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
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

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await updateLocation(pos.coords.latitude, pos.coords.longitude);
        } catch {}
      },
      undefined,
      { timeout: 8000, maximumAge: 1000 * 60 * 10 }
    );
  }, []);


  if (loading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={() => window.location.reload()} />;

  const marketsWithCoords = markets.filter((m) => m.latitude != null && m.longitude != null);
  const center: [number, number] = marketsWithCoords.length > 0
    ? [marketsWithCoords[0].latitude, marketsWithCoords[0].longitude]
    : [-22.9068, -43.1729];

  return (
    <div>
      <PageHeader title="Mercados" subtitle={`${marketsWithCoords.length} mercado(s) mapeado(s)`} />

      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
          {marketsWithCoords.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, color: 'var(--text-muted)', fontSize: 14, textAlign: 'center', padding: 24 }}>
              Nenhum mercado com localização.<br />Importe mais notas para popular o mapa.
            </div>
          ) : (
            <MapContainer center={center} zoom={14} style={{ height: 320, width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {marketsWithCoords.map((market) => (
                <Marker key={market.id} position={[market.latitude, market.longitude]} icon={greenIcon}>
                  <Popup>
                    <div style={{ fontFamily: 'Nunito, sans-serif', minWidth: 140 }}>
                      <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 3, color: '#1a2e1a' }}>
                        {market.displayName ?? market.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#6a8a6a' }}>{market.city} · {market.state}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {marketsWithCoords.length > 0 && (
          <div>
            <SectionLabel>Lista de mercados</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {marketsWithCoords.map((market) => (
                <Card key={market.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green-light)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>
                        {market.displayName ?? market.name}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{market.city} · {market.state}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}