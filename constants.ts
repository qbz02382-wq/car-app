import { ParkingSpot, ParkingStatus, DailyStats, ParkingRecord } from './types';

export const MOCK_SPOTS: ParkingSpot[] = [
  { id: 1, name: 'A1', status: ParkingStatus.OCCUPIED, vehiclePlate: '粤A12345', entryTime: '14:30', signalStrength: -45 },
  { id: 2, name: 'A2', status: ParkingStatus.FREE, signalStrength: -80 },
  { id: 3, name: 'A3', status: ParkingStatus.OCCUPIED, vehiclePlate: '粤B67890', entryTime: '15:15', signalStrength: -65 }
];

export const MOCK_STATS: DailyStats = {
  entryCount: 28,
  revenue: 420,
  occupancyRate: 75
};

export const REVENUE_CHART_DATA = [
  { time: '08:00', value: 30 },
  { time: '10:00', value: 80 },
  { time: '12:00', value: 60 },
  { time: '14:00', value: 90 },
  { time: '16:00', value: 75 },
  { time: '18:00', value: 50 },
];

export const OCCUPANCY_CHART_DATA = [
  { time: '08:00', value: 15 }, 
  { time: '10:00', value: 45 }, 
  { time: '12:00', value: 85 }, 
  { time: '14:00', value: 95 }, 
  { time: '16:00', value: 60 }, 
  { time: '18:00', value: 25 }, 
  { time: '20:00', value: 55 }, 
];

export const MOCK_RECORDS: ParkingRecord[] = [
  { id: 1, date: '2023-10-24', plate: '粤A12345', entryTime: '14:30', exitTime: '16:30', duration: '2小时', cost: 20.00 },
  { id: 2, date: '2023-10-23', plate: '粤A12345', entryTime: '09:00', exitTime: '10:00', duration: '1小时', cost: 10.00 },
  { id: 3, date: '2023-10-20', plate: '粤A12345', entryTime: '18:00', exitTime: '21:30', duration: '3.5小时', cost: 35.00 },
];