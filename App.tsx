import React, { useState } from 'react';
import { TabBar } from './components/TabBar';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { FindCar } from './pages/FindCar';
import { Dashboard } from './pages/Dashboard';
import { Payment } from './pages/Payment';
import { PageView, TabView, THEME, UserRole } from './types';

export default function App() {
  // 登录状态与角色状态
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  
  const [currentTab, setCurrentTab] = useState<TabView>('index');
  const [currentView, setCurrentView] = useState<PageView>('index');

  // 处理登录
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    // 登录后重置到首页
    setCurrentTab('index');
    setCurrentView('index');
  };

  // 处理标签栏切换
  const handleTabChange = (tab: TabView) => {
    setCurrentTab(tab);
    setCurrentView(tab);
    window.scrollTo(0, 0);
  };

  // 处理页面导航（模拟 wx.navigateTo）
  const navigateTo = (page: 'payment' | 'find-car') => {
    if (page === 'find-car') {
      // 寻车是 Tab 页面，使用 SwitchTab 逻辑
      handleTabChange('find-car');
    } else {
      // 支付是子页面
      setCurrentView(page);
    }
    window.scrollTo(0, 0);
  };

  // 处理返回（模拟 wx.navigateBack）
  const navigateBack = () => {
    setCurrentView(currentTab); // 返回到当前选中的 Tab
  };

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'index': return '智能停车场';
      case 'find-car': return '寻车导航';
      case 'dashboard': return userRole === 'admin' ? '数据看板' : '停车记录';
      case 'payment': return '停车缴费';
      default: return '智能停车场';
    }
  };

  const isTabPage = ['index', 'find-car', 'dashboard'].includes(currentView);

  // 如果未登录，显示登录页
  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa] font-sans antialiased">
      {/* 顶部导航栏 */}
      <Header 
        title={getHeaderTitle()} 
        showBack={!isTabPage}
        onBack={navigateBack}
        bgColor={isTabPage ? THEME.bg : '#fff'}
      />

      {/* 主要内容区域 */}
      <main className="w-full max-w-md mx-auto relative">
        {currentView === 'index' && <Home onNavigate={navigateTo} />}
        {currentView === 'find-car' && <FindCar />}
        {currentView === 'dashboard' && <Dashboard userRole={userRole} />}
        {currentView === 'payment' && <Payment onSuccess={navigateBack} />}
      </main>

      {/* 底部 TabBar - 仅在 Tab 页面显示 */}
      {isTabPage && (
        <TabBar 
          currentTab={currentTab} 
          onTabChange={handleTabChange} 
          userRole={userRole} // 传递角色以控制Tab显示
        />
      )}
    </div>
  );
}