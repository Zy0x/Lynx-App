import { ScrollView, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SensorsScreen() {
  const router = useRouter();

  const sensors = [
    { name: 'Accelerometer', vendor: 'Built-in', type: 'Motion' },
    { name: 'Gyroscope', vendor: 'Built-in', type: 'Motion' },
    { name: 'Magnetometer', vendor: 'Built-in', type: 'Motion' },
    { name: 'Proximity Sensor', vendor: 'Built-in', type: 'Distance' },
    { name: 'Light Sensor', vendor: 'Built-in', type: 'Light' },
    { name: 'Barometer', vendor: 'Built-in', type: 'Pressure' },
    { name: 'Thermometer', vendor: 'Built-in', type: 'Temperature' },
    { name: 'Fingerprint', vendor: 'Built-in', type: 'Biometric' },
  ];

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
            <Text className="text-3xl font-bold text-foreground">Sensors</Text>
          </View>

          {/* Sensors Count */}
          <View className="bg-pink-500 rounded-2xl p-6 gap-2">
            <Text className="text-sm font-medium text-white opacity-90">Available Sensors</Text>
            <Text className="text-4xl font-bold text-white">{sensors.length}</Text>
          </View>

          {/* Sensors List */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Sensor Details</Text>
            <View className="gap-2">
              {sensors.map((sensor, index) => (
                <View key={index} className="bg-surface rounded-xl p-4 gap-2">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-base font-semibold text-foreground flex-1">
                      {sensor.name}
                    </Text>
                    <View className="bg-primary/20 rounded-full px-2 py-1">
                      <Text className="text-xs font-medium text-primary">{sensor.type}</Text>
                    </View>
                  </View>
                  <Text className="text-sm text-muted">Vendor: {sensor.vendor}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
