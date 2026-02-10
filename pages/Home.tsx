import React, { useState } from 'react';
import { RefreshCcw, Car, CreditCard, Navigation, X, Keyboard } from 'lucide-react';
import { ParkingSpot, ParkingStatus } from '../types';
import { MOCK_SPOTS } from '../constants';

interface HomeProps {
  onNavigate: (page: 'payment' | 'find-car') => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [spots, setSpots] = useState<ParkingSpot[]>(MOCK_SPOTS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState<number | null>(null);
  const [inputPlate, setInputPlate] = useState('');
  const [entryError, setEntryError] = useState('');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleSpotClick = (spot: ParkingSpot) => {
    if (spot.status === ParkingStatus.FREE) {
      setSelectedSpotId(spot.id);
      setInputPlate('');
      setEntryError('');
      setShowEntryModal(true);
    } else {
      if (window.confirm(`车位 ${spot.name} 当前被 ${spot.vehiclePlate} 占用。\n入场时间: ${spot.entryTime}\n是否要去支付离场？`)) {
        onNavigate('payment');
      }
    }
  };

  const handleConfirmEntry = () => {
    if (!inputPlate || inputPlate.length < 7) {
      setEntryError('请输入完整车牌号');
      return;
    }

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setSpots(prevSpots => prevSpots.map(spot => {
      if (spot.id === selectedSpotId) {
        return {
          ...spot,
          status: ParkingStatus.OCCUPIED,
          vehiclePlate: inputPlate.toUpperCase(),
          entryTime: timeString,
          signalStrength: -40
        };
      }
      return spot;
    }));

    setShowEntryModal(false);
  };

  return (
    <div className="pb-32 px-5 pt-6 animate-fade-in relative">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-gray-800">车位监控</h2>
        <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-blue-400 animate-pulse' : 'bg-green-400'}`}></div>
                实时
            </span>
            <button 
              onClick={handleRefresh}
              className={`p-1.5 bg-white rounded-full shadow-sm text-gray-500 active:text-blue-500 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCcw size={14} />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {spots.map((spot) => {
          const isFree = spot.status === ParkingStatus.FREE;
          return (
            <button
              key={spot.id}
              onClick={() => handleSpotClick(spot)}
              className={`
                relative flex flex-col items-center justify-between
                h-44 rounded-3xl p-4
                transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md border
                ${isFree 
                  ? 'bg-gradient-to-br from-white to-green-50 border-green-100/60' 
                  : 'bg-gradient-to-br from-white to-red-50 border-red-100/60'
                }
              `}
            >
               <div className="w-full flex justify-between items-start">
                  <span className={`text-base font-bold font-mono ${isFree ? 'text-green-700' : 'text-red-700'}`}>
                    {spot.name}
                  </span>
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${isFree ? 'bg-green-400' : 'bg-red-400'}`}></div>
               </div>

               <div className="flex-1 flex items-center justify-center my-2">
                  {isFree ? (
                    <div className="w-12 h-12 rounded-full bg-green-100/50 flex items-center justify-center text-green-500">
                       <span className="text-xs font-bold">空</span>
                    </div>
                  ) : (
                    <div className="relative">
                      <Car size={36} className="text-red-400 drop-shadow-sm" />
                    </div>
                  )}
               </div>

               <div className="w-full">
                 {isFree ? (
                   <div className="w-full py-1.5 bg-green-500/10 rounded-lg flex justify-center">
                     <span className="text-[10px] font-medium text-green-600">点击停车</span>
                   </div>
                 ) : (
                   <div className="w-full py-1.5 bg-white border border-red-50 rounded-lg flex flex-col items-center shadow-sm">
                     <span className="text-[10px] font-bold text-gray-800 font-mono leading-tight">{spot.vehiclePlate}</span>
                   </div>
                 )}
               </div>
            </button>
          );
        })}
      </div>

      <h3 className="text-sm font-bold text-gray-800 mb-4 px-1">常用功能</h3>
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate('find-car')}
          className="bg-white p-5 rounded-[24px] shadow-sm flex items-center gap-3 border border-gray-50 active:bg-gray-50"
        >
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
             <Navigation size={20} />
          </div>
          <div className="text-left">
            <span className="text-sm font-bold text-gray-800 block">寻车</span>
            <span className="text-[10px] text-gray-400">反向寻车</span>
          </div>
        </button>

        <button 
          onClick={() => onNavigate('payment')}
          className="bg-white p-5 rounded-[24px] shadow-sm flex items-center gap-3 border border-gray-50 active:bg-gray-50"
        >
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
             <CreditCard size={20} />
          </div>
          <div className="text-left">
            <span className="text-sm font-bold text-gray-800 block">缴费</span>
            <span className="text-[10px] text-gray-400">自助离场</span>
          </div>
        </button>
      </div>

      {showEntryModal && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowEntryModal(false)}
          ></div>
          
          <div className="bg-white w-full rounded-t-[32px] p-8 pb-32 relative z-10 animate-slide-in-up shadow-2xl">
            <button 
              onClick={() => setShowEntryModal(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 active:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-800">车辆入场登记</h3>
              <p className="text-xs text-gray-400 mt-2">
                当前选择车位：
                <span className="text-blue-600 font-bold ml-1">
                   {spots.find(s => s.id === selectedSpotId)?.name}
                </span>
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-xs text-gray-500 mb-3 ml-1">请输入车牌号码</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={inputPlate}
                  onChange={(e) => {
                    setInputPlate(e.target.value.toUpperCase());
                    setEntryError('');
                  }}
                  placeholder="如: 粤A88888"
                  maxLength={8}
                  className="w-full h-16 bg-gray-50 border-2 border-blue-50 rounded-2xl text-center text-2xl font-bold text-gray-800 focus:outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-gray-300 tracking-widest"
                  autoFocus
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-400">
                    <Keyboard size={20} />
                </div>
              </div>
              {entryError && (
                <p className="text-red-500 text-xs mt-2 ml-1 animate-pulse">{entryError}</p>
              )}
            </div>

            <button 
              onClick={handleConfirmEntry}
              className="w-full h-14 bg-[#2c3e50] text-white rounded-full font-bold text-base shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 mb-4"
            >
              <Car size={18} />
              确认入场
            </button>
            
            <p className="text-center text-[10px] text-gray-300">
              点击确认即表示开始计费
            </p>
          </div>
        </div>
      )}
    </div>
  );
};