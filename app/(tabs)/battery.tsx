import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useDeviceInfo } from '@/hooks/use-device-info';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function BatteryScreen() {
  const router = useRouter();
  const deviceInfo = useDeviceInfo();

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'bg-green-500';
    if (level > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            >
              <MaterialIcons name="arrow-back" size={24} color="#0a7ea4" />
            </Pressable>
            <Text className="text-3xl font-bold text-foreground">Battery</Text>
          </View>

          {/* Battery Level Card */}
          <View className={`${getBatteryColor(deviceInfo.batteryLevel)} rounded-2xl p-6 gap-4`}>
            <View className="gap-2">
              <Text className="text-sm font-medium text-white opacity-90">Battery Level</Text>
              <Text className="text-5xl font-bold text-white">{deviceInfo.batteryLevel}%</Text>
            </View>
            <View className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
              <View
                className="h-full bg-white"
                style={{ width: `${deviceInfo.batteryLevel}%` }}
              />
            </View>
            <Text className="text-sm text-white">{deviceInfo.batteryState}</Text>
          </View>

          {/* Battery Details */}
          <View className="bg-surface rounded-2xl p-4 gap-4">
            <InfoSection
              title="Battery Information"
              items={[
                { label: 'Current Level', value: `${deviceInfo.batteryLevel}%` },
                { label: 'Status', value: deviceInfo.batteryState },
                { label: 'Health', value: 'Good' },
                { label: 'Capacity', value: '4500 mAh' },
                { label: 'Temperature', value: '28°C' },
              ]}
            />

            <InfoSection
              title="Charging"
              items={[
                { label: 'Charging Status', value: 'Not Charging' },
                { label: 'Charging Speed', value: 'N/A' },
                { label: 'Estimated Time', value: 'N/A' },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function InfoSection({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <View className="gap-2">
      <Text className="text-lg font-semibold text-foreground">{title}</Text>
      <View className="gap-2">
        {items.map((item, index) => (
          <View key={index} className="flex-row justify-between items-center py-2 border-b border-border">
            <Text className="text-sm text-muted">{item.label}</Text>
            <Text className="text-sm font-medium text-foreground flex-1 text-right ml-2">
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
