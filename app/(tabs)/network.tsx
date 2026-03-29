import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function NetworkScreen() {
  const router = useRouter();

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
            <Text className="text-3xl font-bold text-foreground">Network</Text>
          </View>

          {/* Network Status Card */}
          <View className="bg-cyan-500 rounded-2xl p-6 gap-4">
            <View className="gap-2">
              <Text className="text-sm font-medium text-white opacity-90">Connection Type</Text>
              <Text className="text-3xl font-bold text-white">WiFi</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <View className="h-full w-3/4 bg-white" />
              </View>
              <Text className="text-sm text-white font-semibold">75%</Text>
            </View>
          </View>

          {/* Network Details */}
          <View className="bg-surface rounded-2xl p-4 gap-4">
            <InfoSection
              title="WiFi Information"
              items={[
                { label: 'SSID', value: 'MyNetwork' },
                { label: 'IP Address', value: '192.168.1.100' },
                { label: 'MAC Address', value: 'AA:BB:CC:DD:EE:FF' },
                { label: 'Signal Strength', value: '-45 dBm' },
                { label: 'Frequency', value: '2.4 GHz' },
              ]}
            />

            <InfoSection
              title="Mobile Network"
              items={[
                { label: 'Carrier', value: 'Operator Name' },
                { label: 'Network Type', value: '4G LTE' },
                { label: 'Signal Bars', value: '4/5' },
                { label: 'Roaming', value: 'No' },
              ]}
            />

            <InfoSection
              title="DNS"
              items={[
                { label: 'Primary DNS', value: '8.8.8.8' },
                { label: 'Secondary DNS', value: '8.8.4.4' },
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
