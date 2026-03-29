import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { cn } from '@/lib/utils';

interface AnimatedMetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
}

export function AnimatedMetricCard({
  label,
  value,
  unit = '',
  icon,
  color = 'bg-primary',
  delay = 0,
}: AnimatedMetricCardProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      });
      translateY.value = withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [opacity, translateY, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View className={cn('rounded-2xl p-4 gap-2', color)}>
        <View className="flex-row items-center justify-between">
          {icon && <View className="text-white">{icon}</View>}
          <Text className="text-sm font-medium text-white opacity-90">{label}</Text>
        </View>
        <View className="gap-1">
          <Text className="text-3xl font-bold text-white">
            {value}
            {unit && <Text className="text-lg">{unit}</Text>}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
