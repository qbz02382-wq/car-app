export enum ParkingStatus {
  FREE = 'free',
  OCCUPIED = 'occupied'
}

export interface ParkingSpot {
  id: number;
  name: string;
  status: ParkingStatus;
  vehiclePlate?: string;
  entryTime?: string;
  signalStrength?: number; // For Find Car feature
}

export interface DailyStats {
  entryCount: number;
  revenue: number;
  occupancyRate: number;
}

export interface PaymentDetails {
  plate: string;
  duration: string;
  entryTime: string;
  parkingFee: number;
  serviceFee: number;
  total: number;
}

export interface ParkingRecord {
  id: number;
  date: string;
  plate: string;
  entryTime: string;
  exitTime: string;
  duration: string;
  cost: number;
}

// 用户角色类型
export type UserRole = 'user' | 'admin';

// 页面视图类型
export type TabView = 'index' | 'find-car' | 'dashboard';
export type PageView = TabView | 'payment';

// 设计规范中的色彩体系
export const THEME = {
  primary: '#2c3e50',    // 深蓝 - 导航栏、重要标题
  secondary: '#3498db',  // 蓝色 - 按钮、链接
  success: '#2ecc71',    // 绿色 - 空闲、成功
  danger: '#e74c3c',     // 红色 - 占用、警告
  bg: '#f5f6fa',         // 浅灰 - 背景
  textMain: '#2c3e50',   // 主要文字
  textSub: '#7f8c8d',    // 次要文字
  textAux: '#bdc3c7',    // 辅助文字
};