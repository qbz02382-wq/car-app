import React from 'react';
import { TrendingUp, DollarSign, Car, Calendar, Clock, CreditCard } from 'lucide-react';
import { THEME, UserRole } from '../types';
import { MOCK_STATS, REVENUE_CHART_DATA, MOCK_RECORDS } from '../constants';

interface DashboardProps {
  userRole?: UserRole;
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const isUser = userRole === 'user';
  
  // 图表辅助数据
  const maxRevenue = Math.max(...REVENUE_CHART_DATA.map(d => d.value));

  // 管理员视图组件
  const AdminDashboard = () => (
    <div className="animate-fade-in pt-4">
      {/* 顶部统计卡片 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-[24px] p-5 shadow-sm flex flex-col justify-between h-44 border border-gray-50">
           <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-2">
               <Car size={16} color={THEME.secondary} />
           </div>
           <div>
               <p className="text-xs text-gray-400">今日入场</p>
               <p className="text-2xl font-bold mt-1 text-gray-800">{MOCK_STATS.entryCount}<span className="text-sm font-normal ml-1">辆</span></p>
           </div>
        </div>
        
        <div className="bg-white rounded-[24px] p-5 shadow-sm flex flex-col justify-between h-44 border border-gray-50">
           <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mb-2">
               <DollarSign size={16} color={THEME.success} />
           </div>
           <div>
               <p className="text-xs text-gray-400">今日收入</p>
               <p className="text-2xl font-bold mt-1 text-gray-800">¥{MOCK_STATS.revenue}</p>
           </div>
        </div>
      </div>

      {/* 平均占用率 */}
      <div className="bg-white rounded-[24px] p-5 shadow-sm mt-4 flex items-center justify-between border border-gray-50">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <TrendingUp size={20} color="#f39c12" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">平均占用率</h3>
              <p className="text-[10px] text-gray-400">实时统计</p>
            </div>
         </div>
         <span className="text-2xl font-bold text-orange-500">{MOCK_STATS.occupancyRate}%</span>
      </div>

      {/* 时段收入统计柱状图 */}
      <div className="bg-white rounded-[24px] p-5 shadow-sm mt-4 border border-gray-50">
         <div className="flex justify-between items-center mb-6">
             <h3 className="text-sm font-bold text-gray-800">时段收入统计</h3>
             <div className="flex gap-2">
                 <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-medium">今日</span>
                 <span className="px-2 py-0.5 rounded text-gray-400 text-[10px]">近7天</span>
             </div>
         </div>
         
         <div className="h-48 flex items-end justify-between px-2">
            {REVENUE_CHART_DATA.map((item, index) => {
                const heightPercentage = (item.value / maxRevenue) * 100;
                return (
                    <div key={index} className="flex flex-col items-center gap-2 group w-8">
                        <div className="relative w-full flex justify-center">
                            <div className="absolute -top-6 text-[10px] font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.value}
                            </div>
                            <div 
                                className="w-4 bg-blue-200 rounded-t-lg group-hover:bg-blue-400 transition-all duration-300 relative overflow-hidden"
                                style={{ height: `${heightPercentage * 1.2}px` }} 
                            >
                                <div className="absolute bottom-0 left-0 right-0 h-full w-full bg-gradient-to-t from-blue-300 to-transparent opacity-50"></div>
                            </div>
                        </div>
                        <span className="text-[10px] text-gray-400">{item.time}</span>
                    </div>
                )
            })}
         </div>
      </div>
    </div>
  );

  // 用户视图组件
  const UserDashboard = () => (
    <div className="animate-fade-in pt-6">
      {/* 车辆概览卡片 */}
      <div className="bg-gradient-to-br from-[#2c3e50] to-[#34495e] rounded-[24px] p-6 mb-8 text-white shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Car size={24} />
              </div>
              <div>
                  <h2 className="text-lg font-bold">我的车辆</h2>
                  <p className="text-sm opacity-80">粤A·12345</p>
              </div>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-4 mt-4">
              <div>
                  <p className="text-xs opacity-60">总停车次数</p>
                  <p className="text-base font-bold">12 <span className="text-xs font-normal">次</span></p>
              </div>
              <div>
                  <p className="text-xs opacity-60">累计消费</p>
                  <p className="text-base font-bold">¥ 186.00</p>
              </div>
          </div>
      </div>

      {/* 停车记录标题 - 增加边距防止遮挡 */}
      <h3 className="text-base font-bold text-gray-800 mb-5 px-1 flex items-center gap-2">
          <Clock size={18} className="text-gray-500" />
          停车记录
      </h3>
      
      {/* 记录列表 */}
      <div className="space-y-4">
          {MOCK_RECORDS.map((record) => (
              <div key={record.id} className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar size={14} />
                          <span>{record.date}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-800">{record.plate}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span className="text-sm font-medium text-gray-700">{record.entryTime}</span>
                              <span className="text-[10px] text-gray-400">入场</span>
                          </div>
                          <div className="h-4 border-l border-dashed border-gray-200 ml-1"></div>
                          <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-400"></div>
                              <span className="text-sm font-medium text-gray-700">{record.exitTime}</span>
                              <span className="text-[10px] text-gray-400">离场</span>
                          </div>
                      </div>
                      
                      <div className="text-right">
                          <p className="text-[10px] text-gray-400 mb-1">时长 {record.duration}</p>
                          <p className="text-base font-bold text-red-500">- ¥{record.cost.toFixed(2)}</p>
                      </div>
                  </div>
              </div>
          ))}
      </div>
      
      <p className="text-center text-xs text-gray-400 mt-10 mb-10">仅展示最近30天记录</p>
    </div>
  );

  return (
    <div className="pb-32 px-5 min-h-[calc(100vh-100px)]">
      {isUser ? <UserDashboard /> : <AdminDashboard />}
    </div>
  );
};