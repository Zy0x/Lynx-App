import { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import * as Battery from 'expo-battery';
import { useWindowDimensions } from 'react-native';

export interface DeviceInfo {
  // Device
  deviceName: string;
  deviceModel: string;
  deviceBrand: string;
  osName: string;
  osVersion: string;
  deviceId: string;
  
  // Display
  screenWidth: number;
  screenHeight: number;
  screenDensity: number;
  
  // Battery
  batteryLevel: number;
  batteryState: string;
  
  // Memory
  totalMemory: number;
  availableMemory: number;
}

export function useDeviceInfo() {
  const { width, height } = useWindowDimensions();
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceName: Device.deviceName || 'Unknown',
    deviceModel: Device.modelName || 'Unknown',
    deviceBrand: Device.brand || 'Unknown',
    osName: Device.osName || 'Unknown',
    osVersion: Device.osVersion?.toString() || 'Unknown',
    deviceId: 'N/A',
    screenWidth: width,
    screenHeight: height,
    screenDensity: Device.deviceYearClass || 0,
    batteryLevel: 0,
    batteryState: 'unknown',
    totalMemory: Device.totalMemory || 0,
    availableMemory: Device.totalMemory ? Device.totalMemory * 0.5 : 0,
  });

  useEffect(() => {
    const fetchBatteryInfo = async () => {
      try {
        const level = await Battery.getBatteryLevelAsync();
        const state = await Battery.getBatteryStateAsync();
        
        const stateMap: { [key: string]: string } = {
          [Battery.BatteryState.UNKNOWN]: 'Unknown',
          [Battery.BatteryState.UNPLUGGED]: 'Unplugged',
          [Battery.BatteryState.CHARGING]: 'Charging',
          [Battery.BatteryState.FULL]: 'Full',
        };

        setDeviceInfo(prev => ({
          ...prev,
          batteryLevel: Math.round(level * 100),
          batteryState: stateMap[state] || 'Unknown',
        }));
      } catch (error) {
        console.warn('Failed to fetch battery info:', error);
      }
    };

    fetchBatteryInfo();
    const interval = setInterval(fetchBatteryInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  return deviceInfo;
}
