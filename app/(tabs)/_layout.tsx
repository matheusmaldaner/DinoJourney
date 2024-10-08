import { Tabs } from "expo-router";
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
        name="dino-hatching"
        options={{
          title: "dino-hatching",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "alert-circle" : "alert-circle-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dino-post-hatch"
        options={{
          title: "dino-post-hatch",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "alert-circle" : "alert-circle-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gemini"
        options={{
          title: "gemini",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "alert-circle" : "alert-circle-outline"} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
