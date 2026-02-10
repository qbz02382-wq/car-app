import React, { useState, useEffect } from 'react';
import { Bluetooth, Signal, MapPin } from 'lucide-react';
import { THEME, ParkingSpot } from '../types';
import { MOCK_SPOTS } from '../constants';

export const FindCar: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ParkingSpot | null>(null);
  const [signals, setSignals] = useState(MOCK_SPOTS);

  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setSignals(prev => prev.map(spot => ({
        ...spot,
        signalStrength: spot.signalStrength ? Math.min(-30, Math.max(-90, spot.signalStrength + (Math.random() * 10 - 5))) : -90
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, [isScanning]);

  const startScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      const myCar = signals.find(s => s.id === 1); 
      setScanResult(myCar || null);
    }, 3000);
  };

  const getSignalColor = (strength: number) => {
    if (strength > -50) return THEME.success;
    if (strength > -70) return '#f39c12';
    return THEME.danger;
  };

  const getDistanceText = (strength: number) => {
    if (strength > -40) return '极近 (<1m)';
    if (strength > -60) return '很近 (1-3m)';
    if (strength > -75) return '附近 (3-5m)';
    return '较远 (>5m)';
  };

  return (
    <div className="pb-32 px-5 pt-6 animate-fade-in">
      <div className="bg-white rounded-[24px] p-8 shadow-sm mb-5 flex flex-col items-center text-center border border-gray-50">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-colors duration-500 ${isScanning ? 'bg-blue-50' : 'bg-gray-50'}`}>
          <Bluetooth 
            size={40} 
            color={isScanning ? THEME.secondary : THEME.textAux} 
            className={isScanning ? 'animate-pulse' : ''}
          />
        </div>
        
        <h2 className="text-lg font-bold mb-2 text-gray-800">
          {isScanning ? (scanResult ? '定位成功' : '正在扫描信号...') : '蓝牙寻车'}
        </h2>
        <p className="text-xs mb-8 text-gray-400 leading-relaxed">
          {isScanning ? '请移动位置以获取更精准的信号强度' : '点击下方按钮开始扫描附近的车位信标'}
        </p>

        <button 
          onClick={startScan}
          disabled={isScanning && !scanResult}
          className="w-full h-12 rounded-full text-white font-bold text-sm flex items-center justify-center shadow-md active:scale-95 transition-transform"
          style={{ 
            background: isScanning ? '#bdc3c7' : `linear-gradient(90deg, ${THEME.secondary}, #2980b9)` 
          }}
        >
          {isScanning ? (scanResult ? '重新扫描' : '扫描中...') : '开始寻车'}
        </button>
      </div>

      {scanResult && (
        <div className="bg-white rounded-[24px] p-6 shadow-sm mb-5 border-l-4 border-green-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-sm font-bold text-gray-800">发现您的车辆</h3>
                    <p className="text-xs mt-1 text-gray-500">车牌: {scanResult.vehiclePlate}</p>
                </div>
                <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-medium">
                    {getDistanceText(scanResult.signalStrength || -90)}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div 
                        className="h-full transition-all duration-300"
                        style={{ 
                            width: `${Math.min(100, Math.max(0, (100 + (scanResult.signalStrength || -90))))}%`,
                            backgroundColor: getSignalColor(scanResult.signalStrength || -90)
                        }}
                    ></div>
                </div>
                <span className="text-[10px] font-mono font-bold w-12 text-right text-gray-700">
                    {scanResult.signalStrength}dB
                </span>
            </div>
             <div className="mt-4 pt-4 border-t border-gray-50 flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-blue-500" />
                <p className="text-xs leading-relaxed text-gray-500">
                    位于 <span className="font-bold text-gray-800">{scanResult.name}</span> 车位，建议向左前方移动。
                </p>
            </div>
        </div>
      )}

      {isScanning && (
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-gray-800">
                <Signal size={16} className="text-gray-400" />
                实时信号监控
            </h3>
            <div className="space-y-4">
                {signals.map(spot => (
                    <div key={spot.id} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${spot.id === 1 ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                            {spot.name}
                        </div>
                        <div className="flex-1">
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full transition-all duration-500"
                                    style={{ 
                                        width: `${Math.min(100, Math.max(0, (100 + (spot.signalStrength || -90))))}%`,
                                        backgroundColor: spot.id === 1 ? THEME.secondary : '#e0e0e0'
                                    }}
                                ></div>
                            </div>
                        </div>
                        <span className="text-[10px] font-mono w-10 text-right text-gray-300">
                            {Math.round(spot.signalStrength || -90)}
                        </span>
                    </div>
                ))}
            </div>
          </div>
      )}
    </div>
  );
};