import React from 'react';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: number;
  trendText?: string;
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendText, 
  colorClass = 'primary' 
}) => {
  return (
    <div className={`stat-card glass-panel border-${colorClass}`}>
      <div className="stat-header flex-between">
        <h3 className="stat-title">{title}</h3>
        <div className={`icon-wrapper bg-${colorClass}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        {trend !== undefined && (
          <div className={`stat-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
            <span className="trend-indicator">{trend >= 0 ? '↑' : '↓'}</span>
            <span className="trend-value">{Math.abs(trend)}%</span>
            {trendText && <span className="trend-text">{trendText}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
