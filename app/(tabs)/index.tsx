import { ScrollView, Text, View, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { FloatingNavbar } from '@/components/floating-navbar';
import { getNativeDeviceInfo, checkIfDeviceIsRooted } from '@/lib/native-device-info';
import * as Device from 'expo-device';
import * as Battery from 'expo-battery';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type TabType = 'dashboard' | 'settings' | 'info';

interface DeviceData {
  model: string;
  manufacturer: string;
  kernel: string;
  androidVersion: string;
  buildNumber: string;
  securityPatch: string;
}

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isRooted, setIsRooted] = useState(false);
  const [deviceData, setDeviceData] = useState<DeviceData>({
    model: 'Loading...',
    manufacturer: 'Loading...',
    kernel: 'Loading...',
    androidVersion: 'Loading...',
    buildNumber: 'Loading...',
    securityPatch: 'Loading...',
  });
  const [batteryLevel, setBatteryLevel] = useState(0);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Check if device is rooted
      const rooted = await checkIfDeviceIsRooted();
      setIsRooted(rooted);

      // Get device info
      const info = await getNativeDeviceInfo();
      setDeviceData({
        model: info.model,
        manufacturer: info.manufacturer,
        kernel: info.kernel,
        androidVersion: info.androidVersion,
        buildNumber: info.buildNumber,
        securityPatch: info.securityPatch,
      });

      // Get battery level
      if (Platform.OS === 'android') {
        const level = await Battery.getBatteryLevelAsync();
        setBatteryLevel(Math.round(level * 100));
      }
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  };

  return (
    <ScreenContainer className="flex-1 pb-32">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="gap-2 mb-6">
          <Text className="text-4xl font-bold text-foreground">Lynx</Text>
          <Text className="text-base text-muted">
            {isRooted ? '🔓 Root Access' : '🔒 No Root'}
          </Text>
        </View>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <View className="gap-4">
            <Text className="text-2xl font-bold text-foreground mb-2">Dashboard</Text>

            {/* Device Card */}
            <View className="bg-primary rounded-2xl p-6 gap-3">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="smartphone" size={28} color="white" />
                <Text className="text-lg font-semibold text-white">Device</Text>
              </View>
              <Text className="text-3xl font-bold text-white">{deviceData.model}</Text>
              <Text className="text-sm text-white/80">{deviceData.manufacturer}</Text>
            </View>

            {/* Kernel Card */}
            <View className="bg-blue-500 rounded-2xl p-6 gap-3">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="memory" size={28} color="white" />
                <Text className="text-lg font-semibold text-white">Kernel</Text>
              </View>
              <Text className="text-2xl font-bold text-white">{deviceData.kernel}</Text>
            </View>

            {/* Android Version Card */}
            <View className="bg-green-500 rounded-2xl p-6 gap-3">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="android" size={28} color="white" />
                <Text className="text-lg font-semibold text-white">Android</Text>
              </View>
              <Text className="text-3xl font-bold text-white">{deviceData.androidVersion}</Text>
            </View>

            {/* Battery Card */}
            <View className="bg-orange-500 rounded-2xl p-6 gap-3">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="battery-full" size={28} color="white" />
                <Text className="text-lg font-semibold text-white">Battery</Text>
              </View>
              <Text className="text-3xl font-bold text-white">{batteryLevel}%</Text>
            </View>
          </View>
        )}

        {/* Info Tab */}
        {activeTab === 'info' && (
          <View className="gap-4">
            <Text className="text-2xl font-bold text-foreground mb-2">Device Information</Text>

            <View className="bg-surface rounded-2xl p-4 gap-3">
              <InfoRow label="Model" value={deviceData.model} />
              <InfoRow label="Manufacturer" value={deviceData.manufacturer} />
              <InfoRow label="Android Version" value={deviceData.androidVersion} />
              <InfoRow label="Build Number" value={deviceData.buildNumber} />
              <InfoRow label="Security Patch" value={deviceData.securityPatch} />
              <InfoRow label="Kernel" value={deviceData.kernel} />
              <InfoRow label="Root Status" value={isRooted ? 'Rooted ✓' : 'Not Rooted'} />
            </View>
          </View>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <View className="gap-4">
            <Text className="text-2xl font-bold text-foreground mb-2">Settings</Text>

            <View className="bg-surface rounded-2xl p-4 gap-4">
              <SettingRow
                icon="security"
                label="Root Access"
                value={isRooted ? 'Enabled' : 'Disabled'}
                color={isRooted ? 'text-green-500' : 'text-red-500'}
              />
              <SettingRow
                icon="info"
                label="App Version"
                value="1.0.1"
              />
              <SettingRow
                icon="build"
                label="Build Type"
                value="Release"
              />
              <SettingRow
                icon="update"
                label="Last Updated"
                value="Today"
              />
            </View>

            <View className="bg-blue-500/10 rounded-2xl p-4 gap-2 border border-blue-500/30">
              <Text className="text-sm font-semibold text-blue-500">ℹ️ Note</Text>
              <Text className="text-xs text-blue-500/80">
                This app requires root access to retrieve accurate kernel and system information. Please grant root permission when prompted.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Navbar */}
      <FloatingNavbar activeTab={activeTab} onTabChange={setActiveTab} />
    </ScreenContainer>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between items-center py-3 border-b border-border">
      <Text className="text-sm text-muted font-medium">{label}</Text>
      <Text className="text-sm font-semibold text-foreground">{value}</Text>
    </View>
  );
}

function SettingRow({
  icon,
  label,
  value,
  color = 'text-foreground',
}: {
  icon: string;
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <View className="flex-row items-center justify-between py-3">
      <View className="flex-row items-center gap-3 flex-1">
        <MaterialIcons name={icon as any} size={24} color="#0a7ea4" />
        <Text className="text-base font-medium text-foreground">{label}</Text>
      </View>
      <Text className={`text-sm font-semibold ${color}`}>{value}</Text>
    </View>
  );
}
