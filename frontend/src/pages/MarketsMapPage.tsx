import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getMarkets } from '../services/api';
import { PageHeader } from '../components/ui';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export function MarketsMapPage() {
  const [markets, setMarkets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMarkets()
      .then((res) => setMarkets(res.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  const marketsWithCoords = markets.filter(
    (m) => m.latitude != null && m.longitude != null
  );

  const center: [number, number] = marketsWithCoords.length > 0
    ? [marketsWithCoords[0].latitude, marketsWithCoords[0].longitude]
    : [-22.9068, -43.1729];

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text-muted)' }}>
      Carregando...
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Mercados"
        subtitle={`${marketsWithCoords.length} mercado(s) no mapa`}
      />

      <div style={{ padding: '0 16px 16px' }}>
        {marketsWithCoords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontSize: 14 }}>
            Nenhum mercado com localização disponível ainda.
            <br />Importe mais notas para popular o mapa.
          </div>
        ) : (
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 0 var(--green-muted), 0 6px 16px rgba(80,140,80,0.10)' }}>
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: 420, width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {marketsWithCoords.map((market) => (
                <Marker
                  key={market.id}
                  position={[market.latitude, market.longitude]}
                >
                  <Popup>
                    <div style={{ fontFamily: 'Nunito, sans-serif', minWidth: 140 }}>
                      <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4 }}>
                        {market.displayName ?? market.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#6a8a6a' }}>
                        {market.city} · {market.state}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
}