import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axios.get('http://localhost:5000/api/workflows')
        .then(res => {
          setRuns(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setRuns([]);
          setLoading(false);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  function formatDuration(start, end) {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationMs = endTime - startTime;

    const seconds = Math.floor((durationMs / 1000) % 60);
    const minutes = Math.floor((durationMs / (1000 * 60)) % 60);

    return `${minutes} min ${seconds} sec`;
  }

  const containerStyle = {
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
    backgroundColor: '#fff',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  };

  const headerStyle = {
    marginBottom: '1rem',
    color: '#333',
  };

  const badge = (text, color) => (
    <span style={{
      padding: '4px 10px',
      borderRadius: '12px',
      backgroundColor: color,
      color: '#fff',
      fontSize: '0.85rem'
    }}>
      {text}
    </span>
  );

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>🚀 GitHub Actions CI/CD Dashboard</h2>

      {loading ? (
        <p>Loading...</p>
      ) : runs.length === 0 ? (
        <p>No workflow runs found.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Status</th>
              <th style={thTdStyle}>Conclusion</th>
              <th style={thTdStyle}>Created</th>
              <th style={thTdStyle}>Updated</th>
              <th style={thTdStyle}>Duration</th>
              <th style={thTdStyle}>Link</th>
            </tr>
          </thead>
          <tbody>
            {runs.map(run => (
              <tr key={run.id}>
                <td style={thTdStyle}>{run.name}</td>
                <td style={thTdStyle}>
                  {badge(run.status, run.status === 'completed' ? '#27ae60' : '#f39c12')}
                </td>
                <td style={thTdStyle}>
                  {badge(
                    run.conclusion || '—',
                    run.conclusion === 'success'
                      ? '#2ecc71'
                      : run.conclusion === 'failure'
                      ? '#e74c3c'
                      : '#7f8c8d'
                  )}
                </td>
                <td style={thTdStyle}>{new Date(run.created_at).toLocaleString()}</td>
                <td style={thTdStyle}>{new Date(run.updated_at).toLocaleString()}</td>
                <td style={thTdStyle}>{formatDuration(run.created_at, run.updated_at)}</td>
                <td style={thTdStyle}>
                  <a href={run.html_url} target="_blank" rel="noreferrer">🔗 View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
