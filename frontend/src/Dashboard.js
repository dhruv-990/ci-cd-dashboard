import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const Dashboard = () => {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [currentRepo, setCurrentRepo] = useState('');
  const [error, setError] = useState('');

  const fetchData = async (repo) => {
    if (!repo) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`${API_BASE}/api/workflows?repo=${encodeURIComponent(repo)}`);
      setRuns(response.data);
      setCurrentRepo(repo);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to fetch workflow runs');
      setRuns([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (repoUrl.trim()) {
      fetchData(repoUrl.trim());
    }
  };

  const handleExampleClick = (exampleRepo) => {
    setRepoUrl(exampleRepo);
    fetchData(exampleRepo);
  };

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

  const formStyle = {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  const exampleButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    fontSize: '14px',
    padding: '8px 16px',
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
      
      <div style={formStyle}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Enter GitHub Repository</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter GitHub repository URL (e.g., github.com/owner/repo or owner/repo)"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'Loading...' : 'View Dashboard'}
          </button>
        </form>
        
        <div style={{ marginTop: '1rem' }}>
          <p style={{ marginBottom: '0.5rem', fontSize: '14px', color: '#666' }}>
            Try these examples:
          </p>
          <button 
            style={exampleButtonStyle}
            onClick={() => handleExampleClick('facebook/react')}
          >
            facebook/react
          </button>
          <button 
            style={exampleButtonStyle}
            onClick={() => handleExampleClick('microsoft/vscode')}
          >
            microsoft/vscode
          </button>
          <button 
            style={exampleButtonStyle}
            onClick={() => handleExampleClick('vercel/next.js')}
          >
            vercel/next.js
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #f5c6cb'
        }}>
          {error}
        </div>
      )}

      {currentRepo && (
        <div style={{
          backgroundColor: '#d1ecf1',
          color: '#0c5460',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #bee5eb'
        }}>
          📊 Showing CI/CD runs for: <strong>{currentRepo}</strong>
        </div>
      )}

      {loading ? (
        <p>Loading workflow runs...</p>
      ) : runs.length === 0 && currentRepo ? (
        <p>No workflow runs found for this repository.</p>
      ) : runs.length > 0 ? (
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
      ) : null}
    </div>
  );
};

export default Dashboard;
