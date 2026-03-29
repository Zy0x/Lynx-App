import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useDeviceInfo } from '@/hooks/use-device-info';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function DisplayScreen() {
  const router = useRouter();
  const deviceInfo = useDeviceInfo();

  const aspectRatio = (deviceInfo.screenHeight / deviceInfo.screenWidth).toFixed(2);
  const diagonal = Math.sqrt(
    Math.pow(deviceInfo.screenWidth, 2) + Math.pow(deviceInfo.screenHeight, 2)
  ).toFixed(1);

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
            <Text className="text-3xl font-bold text-foreground">Display</Text>
          </View>

          {/* Display Preview Card */}
          <View className="bg-indigo-500 rounded-2xl p-6 gap-4">
            <View className="gap-2">
              <Text className="text-sm font-medium text-white opacity-90">Screen Resolution</Text>
              <Text className="text-3xl font-bold text-white">
                {deviceInfo.screenWidth}x{deviceInfo.screenHeight}
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-sm font-medium text-white opacity-90">Diagonal</Text>
              <Text className="text-2xl font-semibold text-white">{diagonal} inches</Text>
            </View>
          </View>

          {/* Display Details */}
          <View className="bg-surface rounded-2xl p-4 gap-4">
            <InfoSection
              title="Screen Information"
              items={[
                { label: 'Resolution', value: `${deviceInfo.screenWidth}x${deviceInfo.screenHeight}` },
                { label: 'Diagonal', value: `${diagonal} inches` },
                { label: 'Aspect Ratio', value: `${aspectRatio}:1` },
                { label: 'Pixel Density', value: `${deviceInfo.screenDensity} DPI` },
              ]}
            />

            <InfoSection
              title="Display Features"
              items={[
                { label: 'Refresh Rate', value: '60 Hz' },
                { label: 'Color Depth', value: '24-bit' },
                { label: 'Brightness', value: '500 nits' },
                { label: 'Panel Type', value: 'AMOLED' },
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
