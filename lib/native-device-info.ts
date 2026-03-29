import { NativeModules, Platform } from 'react-native';
import * as Device from 'expo-device';

export interface DeviceInfoData {
  model: string;
  manufacturer: string;
  kernel: string;
  androidVersion: string;
  buildNumber: string;
  securityPatch: string;
  device: string;
  hardware: string;
  product: string;
  board: string;
  fingerprint: string;
  host: string;
  id: string;
  tags: string;
  type: string;
  user: string;
}

/**
 * Get device information using native Android APIs
 * This uses expo-device and fallback to native modules
 */
export async function getNativeDeviceInfo(): Promise<DeviceInfoData> {
  if (Platform.OS !== 'android') {
    return getDefaultDeviceInfo();
  }

  try {
    // Try to get from expo-device first
    const model = Device.modelName || 'Unknown';
    const manufacturer = Device.brand || 'Unknown';
    const osVersion = Device.osVersion || 'Unknown';

    // Get Android Build properties
    const buildInfo = await getAndroidBuildInfo();

    return {
      model,
      manufacturer,
      kernel: buildInfo.kernel || 'Unknown',
      androidVersion: osVersion,
      buildNumber: buildInfo.buildNumber || 'Unknown',
      securityPatch: buildInfo.securityPatch || 'Unknown',
      device: buildInfo.device || 'Unknown',
      hardware: buildInfo.hardware || 'Unknown',
      product: buildInfo.product || 'Unknown',
      board: buildInfo.board || 'Unknown',
      fingerprint: buildInfo.fingerprint || 'Unknown',
      host: buildInfo.host || 'Unknown',
      id: buildInfo.id || 'Unknown',
      tags: buildInfo.tags || 'Unknown',
      type: buildInfo.type || 'Unknown',
      user: buildInfo.user || 'Unknown',
    };
  } catch (error) {
    console.error('Error getting device info:', error);
    return getDefaultDeviceInfo();
  }
}

/**
 * Get Android Build properties using native module
 */
async function getAndroidBuildInfo(): Promise<Partial<DeviceInfoData>> {
  try {
    // Try to use native DeviceInfoModule if available
    const { DeviceInfoModule } = NativeModules;
    if (DeviceInfoModule) {
      const buildInfo = await DeviceInfoModule.getBuildInfo();
      return {
        kernel: buildInfo.kernel,
        buildNumber: buildInfo.buildNumber,
        securityPatch: buildInfo.securityPatch,
        device: buildInfo.device,
        hardware: buildInfo.hardware,
        product: buildInfo.product,
        board: buildInfo.board,
        fingerprint: buildInfo.fingerprint,
        host: buildInfo.host,
        id: buildInfo.id,
        tags: buildInfo.tags,
        type: buildInfo.type,
        user: buildInfo.user,
      };
    }
  } catch (error) {
    console.warn('DeviceInfoModule not available:', error);
  }

  return {};
}

/**
 * Check if device is rooted using common indicators
 */
export async function checkIfDeviceIsRooted(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return false;
  }

  try {
    const { DeviceInfoModule } = NativeModules;
    if (DeviceInfoModule) {
      return await DeviceInfoModule.isDeviceRooted();
    }
  } catch (error) {
    console.warn('DeviceInfoModule not available:', error);
  }

  return false;
}

/**
 * Request root permission (requires su binary)
 */
export async function requestRootPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return false;
  }

  try {
    const { DeviceInfoModule } = NativeModules;
    if (DeviceInfoModule) {
      return await DeviceInfoModule.requestRootPermission();
    }
  } catch (error) {
    console.warn('DeviceInfoModule not available:', error);
  }

  return false;
}

/**
 * Get kernel version using root access
 */
export async function getKernelVersion(): Promise<string> {
  try {
    const { DeviceInfoModule } = NativeModules;
    if (DeviceInfoModule) {
      const version = await DeviceInfoModule.getKernelVersion();
      return version || 'Unknown';
    }
  } catch (error) {
    console.warn('Could not get kernel version:', error);
  }

  return 'Unknown';
}

/**
 * Default device info fallback
 */
function getDefaultDeviceInfo(): DeviceInfoData {
  return {
    model: 'Unknown',
    manufacturer: 'Unknown',
    kernel: 'Unknown',
    androidVersion: 'Unknown',
    buildNumber: 'Unknown',
    securityPatch: 'Unknown',
    device: 'Unknown',
    hardware: 'Unknown',
    product: 'Unknown',
    board: 'Unknown',
    fingerprint: 'Unknown',
    host: 'Unknown',
    id: 'Unknown',
    tags: 'Unknown',
    type: 'Unknown',
    user: 'Unknown',
  };
}
