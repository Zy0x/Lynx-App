import React, { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1000,
  delay = 0,
  suffix = '',
  className = 'text-2xl font-bold text-foreground',
}: AnimatedCounterProps) {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      animatedValue.value = withTiming(value, {
        duration,
        easing: Easing.out(Easing.cubic),
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [value, duration, delay, animatedValue]);

  const animatedStyle = useAnimatedStyle(() => {
    const displayValue = Math.round(animatedValue.value);
    return {};
  });

  // For now, just display the value directly since animated text is complex
  return (
    <Animated.View style={animatedStyle}>
      <Text className={className}>
        {Math.round(value)}
        {suffix}
      </Text>
    </Animated.View>
  );
}
