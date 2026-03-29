import { useEffect, useState } from 'react';
import { NativeModules, Platform } from 'react-native';

interface RootAccessResult {
  isRooted: boolean;
  isGranted: boolean;
  error: string | null;
}

interface DeviceInfo {
  model: string;
  manufacturer: string;
  kernel: string;
  androidVersion: string;
  buildNumber: string;
  securityPatch: string;
}

export function useRootAccess() {
  const [rootStatus, setRootStatus] = useState<RootAccessResult>({
    isRooted: false,
    isGranted: false,
    error: null,
  });

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    model: 'Unknown',
    manufacturer: 'Unknown',
    kernel: 'Unknown',
    androidVersion: 'Unknown',
    buildNumber: 'Unknown',
    securityPatch: 'Unknown',
  });

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    checkRootAccess();
  }, []);

  const checkRootAccess = async () => {
    try {
      // Check if device is rooted
      const isRooted = await checkIfRooted();
      
      if (isRooted) {
        // Try to get root permission
        const isGranted = await requestRootPermission();
        
        if (isGranted) {
          // Get device info using root access
          const info = await getDeviceInfoWithRoot();
          setDeviceInfo(info);
          setRootStatus({
            isRooted: true,
            isGranted: true,
            error: null,
          });
        } else {
          setRootStatus({
            isRooted: true,
            isGranted: false,
            error: 'Root permission denied',
          });
        }
      } else {
        setRootStatus({
          isRooted: false,
          isGranted: false,
          error: 'Device is not rooted',
        });
      }
    } catch (error) {
      setRootStatus({
        isRooted: false,
        isGranted: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const checkIfRooted = async (): Promise<boolean> => {
    try {
      // Check common root indicators
      const paths = [
        '/system/app/Superuser.apk',
        '/system/xbin/su',
        '/system/bin/su',
        '/data/adb/su',
        '/data/adb/magisk',
      ];

      // In a real scenario, you'd use native code to check these
      // For now, we'll return a placeholder
      return false;
    } catch {
      return false;
    }
  };

  const requestRootPermission = async (): Promise<boolean> => {
    try {
      // This would typically use a native module to request su
      // For now, return false as we can't actually request root in JS
      return false;
    } catch {
      return false;
    }
  };

  const getDeviceInfoWithRoot = async (): Promise<DeviceInfo> => {
    try {
      // Get device info using native Android APIs
      const Build = NativeModules.NativeModules?.Build || {};
      
      return {
        model: Build.MODEL || 'Unknown',
        manufacturer: Build.MANUFACTURER || 'Unknown',
        kernel: Build.KERNEL_VERSION || 'Unknown',
        androidVersion: Build.VERSION?.RELEASE || 'Unknown',
        buildNumber: Build.DISPLAY || 'Unknown',
        securityPatch: Build.SECURITY_PATCH || 'Unknown',
      };
    } catch (error) {
      return {
        model: 'Error',
        manufacturer: 'Error',
        kernel: 'Error',
        androidVersion: 'Error',
        buildNumber: 'Error',
        securityPatch: 'Error',
      };
    }
  };

  return {
    rootStatus,
    deviceInfo,
    checkRootAccess,
  };
}
