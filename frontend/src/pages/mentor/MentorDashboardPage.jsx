import MainLayout from "../../layouts/MainLayout";
import "../../styles/dashboard.css";

function MentorDashboardPage() {
  return (
    <MainLayout>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>Mentorship Dashboard</h1>
            <p>You are currently guiding 4 interns through their program.</p>
          </div>
          <button className="badge badge-primary" style={{ border: 'none', cursor: 'pointer', padding: '0.5rem 1rem' }}>
            Schedule Team Sync
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>👨‍💻</div>
            <div className="stat-value">4</div>
            <div className="stat-label">Assigned Interns</div>
            <div className="stat-trend">Full capacity</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#10b981' }}>🗨️</div>
            <div className="stat-value">12</div>
            <div className="stat-label">Pending Reviews</div>
            <div className="stat-trend trend-up">↑ 5 new today</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef9c3', color: '#f59e0b' }}>🕒</div>
            <div className="stat-value">1.5h</div>
            <div className="stat-label">Time Spent Today</div>
            <div className="stat-trend">On track</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>💡</div>
            <div className="stat-value">8</div>
            <div className="stat-label">Open Support Tickets</div>
            <div className="stat-trend trend-down">↓ 2 resolved</div>
          </div>
        </div>

        <div className="dashboard-main-grid">
          <div className="card">
            <div className="card-header">
              <h3>Intern Progress Tracking</h3>
              <a href="#" style={{ fontSize: '0.875rem' }}>Full list</a>
            </div>
            <div className="card-body">
              <ul className="activity-list">
                <li className="activity-item">
                  <div style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>JD</div>
                  <div className="activity-content">
                    <div className="activity-title">John Doe - Backend Developer</div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '8px' }}>
                      <div style={{ width: '80%', height: '100%', background: '#10b981', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-success">On Track</span>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>80% done</div>
                  </div>
                </li>
                <li className="activity-item">
                  <div style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AS</div>
                  <div className="activity-content">
                    <div className="activity-title">Alice Smith - UI Designer</div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '8px' }}>
                      <div style={{ width: '45%', height: '100%', background: '#f59e0b', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-warning">Delayed</span>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>45% done</div>
                  </div>
                </li>
                <li className="activity-item">
                  <div style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>BV</div>
                  <div className="activity-content">
                    <div className="activity-title">Bob Vance - QA Intern</div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '8px' }}>
                      <div style={{ width: '95%', height: '100%', background: '#10b981', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-success">On Track</span>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>95% done</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Mentor Tools</h3>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <div className="action-btn">
                  <span>📝</span>
                  Evaluate
                </div>
                <div className="action-btn">
                  <span>📅</span>
                  Sync
                </div>
                <div className="action-btn">
                  <span>📈</span>
                  Stats
                </div>
                <div className="action-btn">
                  <span>🎓</span>
                  Resources
                </div>
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Upcoming Milestone</h4>
                <div style={{ padding: '1rem', background: '#f1f5f9', borderRadius: '8px', borderLeft: '4px solid #4f46e5' }}>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>Mid-term Presentation</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '4px' }}>May 20, 2:00 PM • Main Hall</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default MentorDashboardPage;
