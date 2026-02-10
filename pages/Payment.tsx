import React, { useState } from 'react';
import { CreditCard, CheckCircle, ShieldCheck } from 'lucide-react';
import { THEME } from '../types';

interface PaymentProps {
  onSuccess: () => void;
}

export const Payment: React.FC<PaymentProps> = ({ onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'balance'>('wechat');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalAmount = 16.00;
  const userBalance = 0.00;
  const isBalanceInsufficient = paymentMethod === 'balance' && userBalance < totalAmount;

  const handlePay = () => {
    if (isBalanceInsufficient) return;
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        setTimeout(() => {
            onSuccess();
        }, 2000);
    }, 1500);
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
    <div className="p-5 animate-slide-in-right pb-32 pt-6">
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
                  <span className="text-gray-400">停车费用</span>
                  <span className="font-medium text-gray-700">¥15.00</span>
              </div>
              <div className="flex justify-between text-sm">
                  <span className="text-gray-400">服务费用</span>
                  <span className="font-medium text-gray-700">¥1.00</span>
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
                    <span className="text-sm font-medium text-gray-700">余额支付 (¥{userBalance.toFixed(2)})</span>
                </div>
                {paymentMethod === 'balance' && <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>}
              </div>
              {paymentMethod === 'balance' && isBalanceInsufficient && (
                  <div className="w-full text-left pl-11 mt-2">
                      <span className="text-[10px] text-red-500">余额不足，请选择其他方式</span>
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
    </div>
  );
};