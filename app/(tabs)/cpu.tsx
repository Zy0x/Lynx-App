import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useDeviceInfo } from '@/hooks/use-device-info';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Device from 'expo-device';

export default function CPUScreen() {
  const router = useRouter();
  const deviceInfo = useDeviceInfo();

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
            <Text className="text-3xl font-bold text-foreground">CPU Information</Text>
          </View>

          {/* CPU Info Card */}
          <View className="bg-purple-500 rounded-2xl p-6 gap-4">
            <View className="gap-2">
              <Text className="text-sm font-medium text-white opacity-90">Processor</Text>
              <Text className="text-2xl font-bold text-white">{Device.brand}</Text>
            </View>
            <View className="gap-2">
              <Text className="text-sm font-medium text-white opacity-90">Architecture</Text>
              <Text className="text-lg font-semibold text-white">ARM64</Text>
            </View>
          </View>

          {/* CPU Details */}
          <View className="bg-surface rounded-2xl p-4 gap-4">
            <InfoSection
              title="CPU Details"
              items={[
                { label: 'Device Year Class', value: `${deviceInfo.screenDensity}` },
                { label: 'Total Memory', value: `${Math.round(deviceInfo.totalMemory / 1024 / 1024 / 1024)} GB` },
                { label: 'Available Memory', value: `${Math.round(deviceInfo.availableMemory / 1024 / 1024 / 1024)} GB` },
              ]}
            />

            <InfoSection
              title="System"
              items={[
                { label: 'OS', value: deviceInfo.osName },
                { label: 'Version', value: deviceInfo.osVersion },
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
