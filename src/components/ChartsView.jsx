import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ChartsView({ timeSeries, comparison, layerCategory, theme = 'dark' }) {
  const lineChartRef = useRef(null);

  if (!timeSeries || timeSeries.length === 0) return null;

  const isLight = theme === 'light';
  const textColor = isLight ? '#475569' : '#8e9bb4';
  const gridColor = isLight ? 'rgba(0, 0, 0, 0.07)' : 'rgba(255, 255, 255, 0.06)';
  const tooltipBg = isLight ? '#FFFFFF' : '#151C3B';
  const tooltipTitle = isLight ? '#0F172A' : '#F5F7FA';
  const tooltipBorder = isLight ? '#CBD5E1' : '#242f60';

  // 1. Line Chart Data
  const lineLabels = timeSeries.map(d => d.date.substring(5)); // 'MM-DD'
  const lineValues = timeSeries.map(d => d.value);
  const unit = timeSeries[0]?.unit || '';

  const lineChartData = {
    labels: lineLabels,
    datasets: [
      {
        label: `${layerCategory} (${unit})`,
        data: lineValues,
        borderColor: '#3D5AFE',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 180);
          gradient.addColorStop(0, isLight ? 'rgba(61, 90, 254, 0.25)' : 'rgba(61, 90, 254, 0.4)');
          gradient.addColorStop(1, 'rgba(61, 90, 254, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: '#FF6B35',
        pointBorderColor: isLight ? '#FFFFFF' : '#0B1026',
        pointBorderWidth: 1.5,
        borderWidth: 2
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipTitle,
        bodyColor: '#FF6B35',
        borderColor: tooltipBorder,
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y} ${unit}`
        }
      }
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 10 }, maxTicksLimit: 7 }
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 10 } }
      }
    }
  };

  // 2. Comparison Bar Chart Data
  const barLabels = comparison?.map(c => c.period) || [];
  const barValues = comparison?.map(c => c.value) || [];

  const barChartData = {
    labels: barLabels,
    datasets: [
      {
        label: `Mean ${unit}`,
        data: barValues,
        backgroundColor: [isLight ? '#CBD5E1' : '#242f60', '#3D5AFE', '#FF6B35'],
        borderRadius: 4,
        borderSkipped: false
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipTitle,
        bodyColor: '#FF6B35',
        borderColor: tooltipBorder,
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y} ${unit}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor, font: { size: 10 } }
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 10 } }
      }
    }
  };

  // Download Chart as PNG
  const handleDownloadPNG = () => {
    if (!lineChartRef.current) return;
    const chart = lineChartRef.current;
    const url = chart.toBase64Image();
    const link = document.createElement('a');
    link.download = `NASA_TimeSeries_${layerCategory}_${new Date().toISOString().split('T')[0]}.png`;
    link.href = url;
    link.click();
  };

  // Download Data as CSV
  const handleDownloadCSV = () => {
    if (!timeSeries || timeSeries.length === 0) return;
    const headers = ['Date', 'Value', 'Unit', 'Metric'];
    const rows = timeSeries.map(d => [d.date, d.value, d.unit, d.label]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `NASA_Data_${layerCategory}_${new Date().toISOString().split('T')[0]}.csv`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Time-Series Line Chart */}
      <div className="chart-container">
        <div className="chart-header">
          <span className="chart-title">📈 30-Day Daily Trend: {layerCategory}</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              className="btn btn-ghost" 
              style={{ padding: '3px 8px', fontSize: '11px' }}
              onClick={handleDownloadPNG}
              title="Download line chart as PNG image"
            >
              📥 PNG
            </button>
            <button 
              className="btn btn-ghost" 
              style={{ padding: '3px 8px', fontSize: '11px' }}
              onClick={handleDownloadCSV}
              title="Download time-series as CSV spreadsheet"
            >
              📊 CSV
            </button>
          </div>
        </div>
        <div className="chart-canvas-wrapper">
          <Line ref={lineChartRef} data={lineChartData} options={lineOptions} />
        </div>
      </div>

      {/* Comparison Bar Chart */}
      {comparison && comparison.length > 0 && (
        <div className="chart-container">
          <div className="chart-header">
            <span className="chart-title">📊 Multi-Period Comparison</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Baseline vs Current</span>
          </div>
          <div className="chart-canvas-wrapper">
            <Bar data={barChartData} options={barOptions} />
          </div>
        </div>
      )}
    </div>
  );
}
