import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useDeviceInfo } from '@/hooks/use-device-info';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function MemoryScreen() {
  const router = useRouter();
  const deviceInfo = useDeviceInfo();

  const totalGB = Math.round(deviceInfo.totalMemory / 1024 / 1024 / 1024);
  const availableGB = Math.round(deviceInfo.availableMemory / 1024 / 1024 / 1024);
  const usedGB = totalGB - availableGB;
  const usagePercent = Math.round((usedGB / totalGB) * 100);

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
            <Text className="text-3xl font-bold text-foreground">Memory</Text>
          </View>

          {/* Memory Usage Card */}
          <View className="bg-blue-500 rounded-2xl p-6 gap-4">
            <View className="gap-2">
              <Text className="text-sm font-medium text-white opacity-90">RAM Usage</Text>
              <Text className="text-4xl font-bold text-white">{usagePercent}%</Text>
            </View>
            <View className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
              <View
                className="h-full bg-white"
                style={{ width: `${usagePercent}%` }}
              />
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-white">{usedGB} GB Used</Text>
              <Text className="text-sm text-white">{availableGB} GB Free</Text>
            </View>
          </View>

          {/* Memory Details */}
          <View className="bg-surface rounded-2xl p-4 gap-4">
            <InfoSection
              title="Memory Information"
              items={[
                { label: 'Total RAM', value: `${totalGB} GB` },
                { label: 'Used RAM', value: `${usedGB} GB` },
                { label: 'Available RAM', value: `${availableGB} GB` },
                { label: 'Usage', value: `${usagePercent}%` },
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
