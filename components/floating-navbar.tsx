import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { cn } from '@/lib/utils';

interface FloatingNavbarProps {
  activeTab: 'dashboard' | 'settings' | 'info';
  onTabChange: (tab: 'dashboard' | 'settings' | 'info') => void;
}

export function FloatingNavbar({ activeTab, onTabChange }: FloatingNavbarProps) {
  const insets = useSafeAreaInsets();

  const tabs = [
    { id: 'info', label: 'Info', icon: 'info' as const },
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' as const },
    { id: 'settings', label: 'Settings', icon: 'settings' as const },
  ];

  return (
    <View
      className="absolute bottom-0 left-0 right-0 items-center justify-center"
      style={{ paddingBottom: insets.bottom + 16 }}
    >
      <View className="flex-row gap-2 bg-surface rounded-full px-4 py-3 shadow-lg border border-border">
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            onPress={() => onTabChange(tab.id as any)}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
            className={cn(
              'items-center justify-center px-4 py-2 rounded-full transition-all',
              activeTab === tab.id ? 'bg-primary' : 'bg-transparent'
            )}
          >
            <View className="items-center gap-1">
              <MaterialIcons
                name={tab.icon}
                size={24}
                color={activeTab === tab.id ? '#ffffff' : '#0a7ea4'}
              />
              <Text
                className={cn(
                  'text-xs font-semibold',
                  activeTab === tab.id ? 'text-white' : 'text-primary'
                )}
              >
                {tab.label}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
