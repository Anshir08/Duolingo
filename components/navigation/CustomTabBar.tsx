import { useEffect } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getTabConfig } from '@/components/navigation/tabConfig';
import { colors, fontFamily } from '@/theme';

export type CustomTabBarProps = {
  state: {
    index: number;
    routes: Array<{ key: string; name: string }>;
  };
  navigation: {
    emit: (event: {
      type: string;
      target?: string;
      canPreventDefault?: boolean;
    }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
};

const CIRCLE_SIZE = 52;
const ICON_SIZE = 22;
const TAB_BAR_HEIGHT = 72;

export function CustomTabBar({ state, navigation }: CustomTabBarProps) {
  const insets = useSafeAreaInsets();
  const tabWidth = Dimensions.get('window').width / state.routes.length;
  const translateX = useSharedValue(
    state.index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2,
  );

  useEffect(() => {
    translateX.value = withSpring(state.index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2, {
      damping: 20,
      stiffness: 220,
    });
  }, [state.index, tabWidth, translateX]);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.tabRow}>
        <Animated.View pointerEvents="none" style={[styles.activeCircle, animatedCircleStyle]} />

        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const config = getTabConfig(route.name);

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
              accessibilityRole="button"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={config.label}
            >
              {focused ? (
                <View style={styles.activeIconSlot}>
                  <SymbolView
                    name={config.activeIcon}
                    size={ICON_SIZE}
                    tintColor={colors.neutral.background}
                  />
                </View>
              ) : (
                <View style={styles.inactiveContent}>
                  <SymbolView
                    name={config.icon}
                    size={ICON_SIZE}
                    tintColor={colors.neutral.textSecondary}
                  />
                  <Text style={styles.inactiveLabel}>{config.label}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.background,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    shadowColor: colors.neutral.textPrimary,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: TAB_BAR_HEIGHT,
    position: 'relative',
  },
  activeCircle: {
    position: 'absolute',
    top: (TAB_BAR_HEIGHT - CIRCLE_SIZE) / 2,
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.primary.purple,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: TAB_BAR_HEIGHT,
  },
  activeIconSlot: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  inactiveLabel: {
    marginTop: 4,
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 14,
    color: colors.neutral.textSecondary,
  },
});
