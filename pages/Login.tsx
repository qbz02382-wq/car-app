import React from 'react';
import { Car, ShieldCheck, User } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10 animate-fade-in relative overflow-hidden">
      
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-green-50 rounded-full opacity-40 blur-3xl"></div>

      <div className="flex flex-col items-center mb-20 relative z-10">
        <div className="w-32 h-32 bg-gradient-to-br from-[#2c3e50] to-[#34495e] rounded-[36px] shadow-2xl flex items-center justify-center mb-6 transform rotate-3">
          <Car size={64} color="white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">智能停车场</h1>
        <p className="text-sm text-gray-400 font-medium">智慧出行 · 便捷停放</p>
      </div>

      <div className="w-full space-y-5 relative z-10 max-w-xs">
        <button 
          onClick={() => onLogin('user')}
          className="w-full h-14 bg-[#07c160] active:bg-[#06ad56] text-white rounded-2xl font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-green-100 transition-all active:scale-95"
        >
          <User size={20} />
          <span>车主一键登录</span>
        </button>

        <button 
          onClick={() => onLogin('admin')}
          className="w-full h-14 bg-white border border-gray-100 text-[#2c3e50] rounded-2xl font-bold text-base flex items-center justify-center gap-3 shadow-sm active:bg-gray-50 transition-all active:scale-95"
        >
          <ShieldCheck size={20} color="#2c3e50" />
          <span>管理员入口</span>
        </button>
      </div>

      <div className="mt-16 text-center">
        <p className="text-[10px] text-gray-300">
          登录即代表您同意
          <span className="text-blue-400 mx-1">《服务协议》</span>
          及
          <span className="text-blue-400 mx-1">《隐私政策》</span>
        </p>
      </div>

      <div className="absolute bottom-10 text-[10px] text-gray-200 font-mono tracking-widest uppercase">
        v1.0.0 Stable Build
      </div>
    </div>
  );
};