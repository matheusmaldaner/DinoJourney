import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="test"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="dino-daddy"
        options={{
          title: "dino-daddy",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "alert-circle" : "alert-circle-outline"} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="dino-companion"
        options={{
          title: "dino-companion",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "alert-circle" : "alert-circle-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
