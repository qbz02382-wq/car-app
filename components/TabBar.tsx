import React from 'react';
import { Home, MapPin, BarChart2, Clock } from 'lucide-react';
import { TabView, THEME, UserRole } from '../types';

interface TabBarProps {
  currentTab: TabView;
  onTabChange: (tab: TabView) => void;
  userRole: UserRole;
}

export const TabBar: React.FC<TabBarProps> = ({ currentTab, onTabChange, userRole }) => {
  const dashboardTab = userRole === 'admin' 
    ? { id: 'dashboard' as TabView, label: '数据看板', icon: BarChart2 }
    : { id: 'dashboard' as TabView, label: '停车记录', icon: Clock };

  const tabs = [
    { id: 'index' as TabView, label: '车位状态', icon: Home },
    { id: 'find-car' as TabView, label: '寻车导航', icon: MapPin },
    dashboardTab
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe h-16 flex items-center justify-around z-50 shadow-[0_-2px_15px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center justify-center w-full h-full active:opacity-70 transition-opacity"
          >
            <Icon 
              size={22} 
              color={isActive ? THEME.secondary : THEME.textAux} 
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span 
              className="text-[10px] mt-1 font-medium"
              style={{ color: isActive ? THEME.secondary : THEME.textAux }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};