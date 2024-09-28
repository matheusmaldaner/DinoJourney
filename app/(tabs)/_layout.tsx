import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="test"
        options={{
          title: "Test",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "alert-circle" : "alert-circle-outline"} color={color} />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="dino-daddy"
        options={{
          title: "dino-daddy",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "alert-circle" : "alert-circle-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
