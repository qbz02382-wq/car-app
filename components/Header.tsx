import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { THEME } from '../types';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  bgColor?: string;
  textColor?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack, 
  onBack,
  bgColor = '#fff',
  textColor = THEME.textMain
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="sticky top-0 left-0 right-0 z-40 transition-colors duration-300 shadow-sm"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* 模拟手机状态栏 */}
      <div className="flex justify-between items-center px-5 h-6 text-[10px] font-medium opacity-90">
        <span>{time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
        <div className="flex gap-1.5 items-center">
          <span className="mr-0.5">5G</span>
          <div className="w-5 h-2.5 border border-current rounded-sm relative opacity-80">
            <div className="absolute top-[1px] bottom-[1px] left-[1px] right-[2px] bg-current"></div>
          </div>
        </div>
      </div>

      {/* 模拟小程序导航栏 */}
      <div className="flex items-center justify-between px-2 h-12 relative">
        <div className="w-24 flex items-center h-full">
          {showBack && (
            <button 
              onClick={onBack} 
              className="p-2 -ml-1 active:opacity-60 flex items-center"
            >
              <ChevronLeft size={20} />
              <span className="text-sm">返回</span>
            </button>
          )}
        </div>
        
        <h1 className="text-base font-bold absolute left-1/2 -translate-x-1/2 whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </h1>

        <div className="w-24"></div> 
      </div>
    </div>
  );
};