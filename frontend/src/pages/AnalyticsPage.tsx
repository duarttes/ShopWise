import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  getMonthlySpending,
  getSpendingByMarket,
  getMostExpensiveProducts,
  getStoredUserId,
} from '../services/api';
import { Card, PageHeader, SectionLabel } from '../components/ui';
import { PageLoading } from '../components/PageLoading';
import { PageError } from '../components/PageError';

const COLORS = ['#4a9a5a', '#6ab87a', '#8dd4a0', '#b0e8c0', '#c8f0d4', '#347a44', '#1a5a2a'];

const monthLabels: Record<string, string> = {
  '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr',
  '05': 'Mai', '06': 'Jun', '07': 'Jul', '08': 'Ago',
  '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez',
};

function formatMonth(label: string) {
  const [year, month] = label.split('-');
  return `${monthLabels[month] ?? month}/${year?.slice(2)}`;
}

function formatCurrency(value: number) {
  return `R$ ${value.toFixed(0)}`;
}

export function AnalyticsPage() {
  const userId = getStoredUserId()!;

  const [monthly, setMonthly] = useState<any>(null);
  const [byMarket, setByMarket] = useState<any>(null);
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      getMonthlySpending(userId),
      getSpendingByMarket(userId),
      getMostExpensiveProducts(userId),
    ])
      .then(([m, b, p]) => {
        setMonthly(m);
        setByMarket(b);
        setProducts(p);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <PageLoading label="Carregando analytics..." />;
  if (error) return <PageError message={error} onRetry={() => window.location.reload()} />;

  const monthlyData = (monthly?.months ?? []).map((m: any) => ({
    name: formatMonth(m.label),
    total: m.totalSpent,
    notas: m.receiptsCount,
  }));

  const marketData = (byMarket?.markets ?? []).slice(0, 5).map((m: any) => ({
    name: m.marketName.length > 16 ? m.marketName.slice(0, 14) + '…' : m.marketName,
    value: m.totalSpent,
  }));

  const productData = (products?.products ?? []).slice(0, 6);

  const totalSpent = byMarket?.markets?.reduce((s: number, m: any) => s + m.totalSpent, 0) ?? 0;

  const hasMonthly = monthlyData.length > 0;
  const hasByMarket = marketData.length > 0;
  const hasProducts = productData.length > 0;

  return (
    <div style={{ paddingBottom: 24 }}>
      <PageHeader title="Analytics" subtitle="Inteligência das suas compras" />

      <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Gastos mensais */}
        <div>
          <SectionLabel>Gastos por mês</SectionLabel>
          {!hasMonthly ? (
            <Card>
              <div style={{ textAlign: 'center', color: 'var(--text-subtle)', fontSize: 13, padding: '16px 0' }}>
                Sem dados suficientes ainda.
              </div>
            </Card>
          ) : (
            <Card style={{ padding: '16px 8px 8px' }}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData} margin={{ top: 0, right: 8, left: -16, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fontFamily: 'Nunito Sans', fill: '#6a8a6a' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={formatCurrency}
                    tick={{ fontSize: 10, fontFamily: 'Nunito Sans', fill: '#90aa90' }}
                    axisLine={false}
                    tickLine={false}
                    width={60}
                  />
                  <Tooltip
                    formatter={(v: any) => typeof v === 'number' && v !== undefined ? `R$ ${v.toFixed(2)}` : ''}
                    labelStyle={{ fontFamily: 'Nunito', fontWeight: 700 }}
                    contentStyle={{
                      borderRadius: 10,
                      border: '1px solid #c8e0c8',
                      fontFamily: 'Nunito Sans',
                      fontSize: 13,
                    }}
                  />
                  <Bar dataKey="total" fill="#4a9a5a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          )}
        </div>

        {/* Gastos por mercado */}
        <div>
          <SectionLabel>Distribuição por mercado</SectionLabel>
          {!hasByMarket ? (
            <Card>
              <div style={{ textAlign: 'center', color: 'var(--text-subtle)', fontSize: 13, padding: '16px 0' }}>
                Sem dados suficientes ainda.
              </div>
            </Card>
          ) : (
            <Card style={{ padding: '16px 8px' }}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={marketData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {marketData.map((_: any, index: number) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => {
                      const amount = typeof value === 'number' ? value : Number(value ?? 0);
                      return [`R$ ${amount.toFixed(2)}`, 'Gasto'];
                    }}
                    contentStyle={{
                      borderRadius: 10,
                      border: '1px solid #c8e0c8',
                      fontFamily: 'Nunito Sans',
                      fontSize: 13,
                    }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12, fontFamily: 'Nunito Sans' }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div style={{ textAlign: 'center', marginTop: 4 }}>
                <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 20, color: 'var(--green)' }}>
                  R$ {totalSpent.toFixed(2)}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-subtle)' }}>total histórico</div>
              </div>
            </Card>
          )}
        </div>

        {/* Produtos mais caros */}
        <div>
          <SectionLabel>Onde mais você gasta</SectionLabel>
          {!hasProducts ? (
            <Card>
              <div style={{ textAlign: 'center', color: 'var(--text-subtle)', fontSize: 13, padding: '16px 0' }}>
                Sem dados suficientes ainda.
              </div>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {productData.map((p: any, i: number) => {
                const maxSpent = productData[0]?.totalSpent ?? 1;
                const pct = Math.round((p.totalSpent / maxSpent) * 100);
                return (
                  <Card key={p.productId}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div style={{ flex: 1, marginRight: 12 }}>
                        <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 13, lineHeight: 1.3, color: 'var(--text)' }}>
                          {p.productName}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
                          {p.purchaseCount}x comprado
                        </div>
                      </div>
                      <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 15, color: 'var(--green)', whiteSpace: 'nowrap' }}>
                        R$ {p.totalSpent.toFixed(2)}
                      </div>
                    </div>
                    <div style={{ height: 6, background: '#f0f7f0', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: COLORS[i % COLORS.length],
                        borderRadius: 4,
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}