import React, { useState } from 'react';
import { CreditCard, CheckCircle, ShieldCheck, X, Wallet } from 'lucide-react';
import { THEME } from '../types';

interface PaymentProps {
  balance: number;
  onUpdateBalance: (newBalance: number) => void;
  onSuccess: () => void;
}

export const Payment: React.FC<PaymentProps> = ({ balance, onUpdateBalance, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'balance'>('wechat');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // 充值模态框显示状态
  const [showRecharge, setShowRecharge] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  // 模拟停车时长（分钟）- 1小时30分
  const durationMinutes = 90;
  
  // 计费逻辑：每小时10元，未超半小时按半小时计，超半小时按1小时计
  const calculateFee = (minutes: number) => {
    const units = Math.ceil(minutes / 30);
    return units * 5; 
  };

  const parkingFee = calculateFee(durationMinutes);
  const serviceFee = 1.00;
  const totalAmount = parkingFee + serviceFee;
  
  // 余额不足判断，直接使用外部传入的 balance
  const isBalanceInsufficient = paymentMethod === 'balance' && balance < totalAmount;

  const handlePay = () => {
    if (isBalanceInsufficient) return;
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        if (paymentMethod === 'balance') {
            onUpdateBalance(balance - totalAmount);
        }
        setTimeout(() => {
            onSuccess();
        }, 2000);
    }, 1500);
  };

  const handleRecharge = (amount: number) => {
      onUpdateBalance(balance + amount);
      setShowRecharge(false);
      setCustomAmount('');
  };

  const handleCustomRecharge = () => {
      const amount = parseFloat(customAmount);
      if (!isNaN(amount) && amount > 0) {
          handleRecharge(amount);
      }
  };

  if (isSuccess) {
      return (
          <div className="h-[70vh] flex flex-col items-center justify-center p-8 animate-fade-in">
              <CheckCircle size={80} color={THEME.success} className="mb-6" />
              <h2 className="text-xl font-bold mb-2">支付成功</h2>
              <p className="text-sm text-gray-400">祝您一路顺风</p>
          </div>
      )
  }

  return (
    <div className="p-5 animate-slide-in-right pb-32 pt-6 relative">
      <div className="bg-white rounded-[24px] p-8 shadow-sm mb-5 text-center border border-gray-50">
          <div className="inline-block bg-blue-50 text-blue-700 px-5 py-2.5 rounded-xl text-2xl font-bold tracking-widest mb-6 border border-blue-100">
              粤A·12345
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-6">
              <div>
                  <p className="text-[10px] text-gray-400 mb-1">入场时间</p>
                  <p className="text-sm font-bold text-gray-700">14:30</p>
              </div>
              <div>
                  <p className="text-[10px] text-gray-400 mb-1">停车时长</p>
                  <p className="text-sm font-bold text-gray-700">1小时30分</p>
              </div>
          </div>
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-sm mb-5 border border-gray-50">
          <h3 className="text-sm font-bold mb-5 text-gray-800">费用明细</h3>
          <div className="space-y-4">
              <div className="flex justify-between text-sm">
                  <span className="text-gray-400">停车费用 (计费标准: 10元/时)</span>
                  <span className="font-medium text-gray-700">¥{parkingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                  <span className="text-gray-400">服务费用</span>
                  <span className="font-medium text-gray-700">¥{serviceFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-dashed border-gray-100 my-2 pt-4 flex justify-between items-end">
                  <span className="text-sm font-bold">总计金额</span>
                  <span className="text-2xl font-bold text-red-500 leading-none">¥{totalAmount.toFixed(2)}</span>
              </div>
          </div>
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-sm mb-10 border border-gray-50">
          <h3 className="text-sm font-bold mb-5 text-gray-800">支付方式</h3>
          
          <button 
            onClick={() => setPaymentMethod('wechat')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border mb-3 transition-all ${paymentMethod === 'wechat' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-50'}`}
          >
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#09bb07] flex items-center justify-center text-white text-[10px] font-bold">
                      微信
                  </div>
                  <span className="text-sm font-medium">微信支付</span>
              </div>
              {paymentMethod === 'wechat' && <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>}
          </button>

          <button 
            onClick={() => setPaymentMethod('balance')}
            className={`w-full flex flex-col p-4 rounded-2xl border transition-all ${paymentMethod === 'balance' ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-50'}`}
          >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white">
                        <CreditCard size={16} />
                    </div>
                    <div className="text-left">
                        <span className="text-sm font-medium text-gray-700">余额支付</span>
                        <span className="text-xs text-gray-400 ml-2">(当前: ¥{balance.toFixed(2)})</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div 
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowRecharge(true);
                        }}
                        className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full active:bg-blue-200"
                    >
                        充值
                    </div>
                    {paymentMethod === 'balance' && <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>}
                </div>
              </div>
              {paymentMethod === 'balance' && isBalanceInsufficient && (
                  <div className="w-full text-left pl-11 mt-2">
                      <span className="text-[10px] text-red-500">余额不足，请先充值</span>
                  </div>
              )}
          </button>
      </div>

      <button 
          onClick={handlePay}
          disabled={isProcessing || isBalanceInsufficient}
          className={`w-full h-14 rounded-full font-bold text-base flex items-center justify-center shadow-lg transition-all ${
            isProcessing || isBalanceInsufficient 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
              : 'bg-[#07c160] text-white active:scale-95'
          }`}
      >
          {isProcessing ? '处理中...' : (isBalanceInsufficient ? '余额不足' : `确认支付 ¥${totalAmount.toFixed(2)}`)}
      </button>
      
      <div className="flex items-center justify-center gap-1.5 mt-5 text-[10px] text-gray-300">
          <ShieldCheck size={12} />
          <span>金融级安全支付保障</span>
      </div>

      {/* 充值弹窗 */}
      {showRecharge && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setShowRecharge(false)}
            ></div>
            <div className="bg-white w-full rounded-t-[32px] p-8 pb-10 relative z-10 animate-slide-in-up shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Wallet size={20} className="text-blue-500"/>
                        账户充值
                    </h3>
                    <button onClick={() => setShowRecharge(false)} className="p-2 bg-gray-50 rounded-full text-gray-400">
                        <X size={20} />
                    </button>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">请选择充值金额</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[50, 100, 200].map(amount => (
                        <button
                            key={amount}
                            onClick={() => handleRecharge(amount)}
                            className="h-20 border border-blue-100 bg-blue-50 rounded-2xl flex flex-col items-center justify-center active:scale-95 transition-all active:bg-blue-100"
                        >
                            <span className="text-xl font-bold text-blue-600">¥{amount}</span>
                            <span className="text-[10px] text-blue-400">售价:{amount}元</span>
                        </button>
                    ))}
                </div>

                {/* 自定义充值金额 */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-4">
                    <label className="text-xs text-gray-400 mb-2 block">自定义金额</label>
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">¥</span>
                            <input 
                                type="number"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                                placeholder="请输入"
                                className="w-full h-10 bg-white border border-gray-200 rounded-lg pl-7 pr-3 text-sm font-bold text-gray-800 focus:outline-none focus:border-blue-400 transition-colors"
                            />
                        </div>
                        <button 
                            onClick={handleCustomRecharge}
                            disabled={!customAmount || parseFloat(customAmount) <= 0}
                            className="h-10 px-5 bg-blue-500 text-white rounded-lg text-xs font-bold shadow-sm active:scale-95 disabled:bg-gray-300 disabled:shadow-none transition-all"
                        >
                            确认充值
                        </button>
                    </div>
                </div>
                
                <p className="text-center text-[10px] text-gray-300">充值金额仅用于支付停车费用，不可提现</p>
            </div>
        </div>
      )}
    </div>
  );
};