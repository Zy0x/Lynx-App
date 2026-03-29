import { ScrollView, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { AnimatedMetricCard } from '@/components/animated-metric-card';
import { useDeviceInfo } from '@/hooks/use-device-info';
import { useColors } from '@/hooks/use-colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const deviceInfo = useDeviceInfo();

  const sections = [
    { name: 'Device', icon: 'smartphone', color: 'bg-blue-500', route: 'device' },
    { name: 'CPU', icon: 'memory', color: 'bg-purple-500', route: 'cpu' },
    { name: 'Memory', icon: 'storage', color: 'bg-orange-500', route: 'memory' },
    { name: 'Storage', icon: 'sd-storage', color: 'bg-red-500', route: 'storage' },
    { name: 'Battery', icon: 'battery-full', color: 'bg-green-500', route: 'battery' },
    { name: 'Display', icon: 'monitor', color: 'bg-indigo-500', route: 'display' },
    { name: 'Network', icon: 'wifi', color: 'bg-cyan-500', route: 'network' },
    { name: 'Sensors', icon: 'sensors', color: 'bg-pink-500', route: 'sensors' },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-4xl font-bold text-foreground">Device Info</Text>
            <Text className="text-base text-muted">{deviceInfo.deviceModel}</Text>
          </View>

          {/* Quick Stats */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Quick Stats</Text>
            <View className="gap-3">
              <AnimatedMetricCard
                label="Battery"
                value={deviceInfo.batteryLevel}
                unit="%"
                color="bg-green-500"
                delay={0}
              />
              <AnimatedMetricCard
                label="RAM Available"
                value={Math.round(deviceInfo.availableMemory / 1024 / 1024 / 1024)}
                unit=" GB"
                color="bg-blue-500"
                delay={100}
              />
              <AnimatedMetricCard
                label="Screen"
                value={`${deviceInfo.screenWidth}x${deviceInfo.screenHeight}`}
                color="bg-purple-500"
                delay={200}
              />
            </View>
          </View>

          {/* Device Info Sections */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Information</Text>
            <View className="flex-row flex-wrap gap-2">
              {sections.map((section, index) => (
                <Pressable
                  key={section.name}
                  onPress={() => router.push(section.route as any)}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                  className="flex-1 min-w-[calc(50%-4px)]"
                >
                  <View className={`rounded-xl p-4 items-center gap-2 ${section.color}`}>
                    <MaterialIcons name={section.icon as any} size={28} color="white" />
                    <Text className="text-sm font-semibold text-white text-center">
                      {section.name}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Device Details Card */}
          <View className="bg-surface rounded-2xl p-4 gap-3">
            <Text className="text-lg font-semibold text-foreground">System</Text>
            <View className="gap-2">
              <DetailRow label="OS" value={`${deviceInfo.osName} ${deviceInfo.osVersion}`} />
              <DetailRow label="Brand" value={deviceInfo.deviceBrand} />
              <DetailRow label="Model" value={deviceInfo.deviceModel} />
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between items-center py-2 border-b border-border">
      <Text className="text-sm text-muted">{label}</Text>
      <Text className="text-sm font-medium text-foreground">{value}</Text>
    </View>
  );
}
