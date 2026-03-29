import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function StorageScreen() {
  const router = useRouter();

  // Mock storage data
  const totalStorage = 128;
  const usedStorage = 64;
  const usagePercent = Math.round((usedStorage / totalStorage) * 100);

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
            <Text className="text-3xl font-bold text-foreground">Storage</Text>
          </View>

          {/* Storage Usage Card */}
          <View className="bg-red-500 rounded-2xl p-6 gap-4">
            <View className="gap-2">
              <Text className="text-sm font-medium text-white opacity-90">Internal Storage</Text>
              <Text className="text-4xl font-bold text-white">{usagePercent}%</Text>
            </View>
            <View className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
              <View
                className="h-full bg-white"
                style={{ width: `${usagePercent}%` }}
              />
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-white">{usedStorage} GB Used</Text>
              <Text className="text-sm text-white">{totalStorage - usedStorage} GB Free</Text>
            </View>
          </View>

          {/* Storage Details */}
          <View className="bg-surface rounded-2xl p-4 gap-4">
            <InfoSection
              title="Internal Storage"
              items={[
                { label: 'Total', value: `${totalStorage} GB` },
                { label: 'Used', value: `${usedStorage} GB` },
                { label: 'Available', value: `${totalStorage - usedStorage} GB` },
                { label: 'Usage', value: `${usagePercent}%` },
              ]}
            />

            <InfoSection
              title="Storage Breakdown"
              items={[
                { label: 'Apps', value: '12 GB' },
                { label: 'Photos & Videos', value: '28 GB' },
                { label: 'Documents', value: '8 GB' },
                { label: 'Other', value: '16 GB' },
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
