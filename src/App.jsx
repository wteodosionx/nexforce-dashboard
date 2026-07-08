import { useState } from 'react'
import './App.css'

const menuItems = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'sales', label: 'Vendas', icon: '💰' },
  { id: 'customers', label: 'Clientes', icon: '👥' },
  { id: 'settings', label: 'Configurações', icon: '⚙️' },
]

const kpiData = [
  { title: 'Receita Total', value: 'R$ 847.230', change: '+12.5%', positive: true, icon: '💰' },
  { title: 'Pedidos', value: '1.847', change: '+8.2%', positive: true, icon: '📦' },
  { title: 'Conversão', value: '3,24%', change: '-0.8%', positive: false, icon: '🎯' },
  { title: 'Clientes Ativos', value: '2.341', change: '+18.7%', positive: true, icon: '👥' },
]

const monthlyData = [
  { month: 'Jan', value: 42000 }, { month: 'Fev', value: 38000 },
  { month: 'Mar', value: 51000 }, { month: 'Abr', value: 46000 },
  { month: 'Mai', value: 54000 }, { month: 'Jun', value: 62000 },
  { month: 'Jul', value: 58000 }, { month: 'Ago', value: 72000 },
  { month: 'Set', value: 68000 }, { month: 'Out', value: 79000 },
  { month: 'Nov', value: 85000 }, { month: 'Dez', value: 91000 },
]

const recentOrders = [
  { id: '#00124', cliente: 'Tech Solutions Ltda', valor: 'R$ 12.400', status: 'completed', data: '08/07/2026' },
  { id: '#00123', cliente: 'Digital Commerce S.A.', valor: 'R$ 8.720', status: 'pending', data: '07/07/2026' },
  { id: '#00122', cliente: 'CloudNine Hospedagem', valor: 'R$ 23.150', status: 'completed', data: '06/07/2026' },
  { id: '#00121', cliente: 'Nexforce Brasil', valor: 'R$ 5.600', status: 'processing', data: '05/07/2026' },
  { id: '#00120', cliente: 'DataFlow Analytics', valor: 'R$ 15.300', status: 'completed', data: '04/07/2026' },
  { id: '#00119', cliente: 'Innova Sistemas', valor: 'R$ 9.880', status: 'cancelled', data: '03/07/2026' },
]

const statusCfg = {
  completed: { label: 'Concluído', cls: 'status-completed' },
  pending: { label: 'Pendente', cls: 'status-pending' },
  processing: { label: 'Processando', cls: 'status-processing' },
  cancelled: { label: 'Cancelado', cls: 'status-cancelled' },
}

function KpiCard({ title, value, change, positive, icon }) {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <span className="kpi-icon">{icon}</span>
        <span className={`kpi-change ${positive ? 'up' : 'down'}`}>{change}</span>
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-title">{title}</div>
      <div className="kpi-bar">
        <div className={`kpi-bar-fill ${positive ? 'fill-up' : 'fill-down'}`} style={{ width: positive ? '76%' : '32%' }} />
      </div>
    </div>
  )
}

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div className="chart-container">
      <h3>Receita Mensal</h3>
      <div className="chart-bars">
        {data.map((d, i) => (
          <div key={i} className="bar-group">
            <div className="bar-wrapper">
              <div className="bar" style={{ height: `${(d.value / max) * 100}%` }}>
                <span className="bar-tooltip">R$ {d.value.toLocaleString('pt-BR')}</span>
              </div>
            </div>
            <span className="bar-label">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrdersTable({ orders }) {
  return (
    <div className="orders-container">
      <h3>Pedidos Recentes</h3>
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const st = statusCfg[order.status]
              return (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.cliente}</td>
                  <td className="order-value">{order.valor}</td>
                  <td className="order-date">{order.data}</td>
                  <td><span className={`status-badge ${st.cls}`}>{st.label}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function App() {
  const [activeMenu, setActiveMenu] = useState('overview')

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">◆</span>
          <span className="brand-text">Nexforce</span>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button key={item.id} className={`nav-item ${activeMenu === item.id ? 'active' : ''}`} onClick={() => setActiveMenu(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">W</div>
            <div className="user-details">
              <span className="user-name">Willian</span>
              <span className="user-role">Admin</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h1>Dashboard</h1>
          <div className="topbar-actions">
            <span className="notification-bell">🔔</span>
            <span className="date-badge">Jul 2026</span>
          </div>
        </header>

        <div className="content">
          <section className="kpi-grid">
            {kpiData.map((kpi, i) => <KpiCard key={i} {...kpi} />)}
          </section>

          <section className="charts-section">
            <BarChart data={monthlyData} />
            <div className="quick-stats">
              <h3>Resumo Rápido</h3>
              <div className="stat-rows">
                <div className="stat-row"><span className="stat-label">Ticket Médio</span><span className="stat-value">R$ 458,00</span></div>
                <div className="stat-row"><span className="stat-label">Tempo de Resposta</span><span className="stat-value">2.4h</span></div>
                <div className="stat-row"><span className="stat-label">NPS</span><span className="stat-value">87</span></div>
                <div className="stat-row"><span className="stat-label">Churn Rate</span><span className="stat-value">1.2%</span></div>
              </div>
              <div className="progress-card">
                <span className="progress-label">Meta Anual</span>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '68%' }} /></div>
                <span className="progress-pct">68%</span>
              </div>
            </div>
          </section>

          <section className="orders-section">
            <OrdersTable orders={recentOrders} />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
