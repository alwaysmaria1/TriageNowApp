import { Tabs } from 'expo-router';
import React, {useState} from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useStore } from '@/components/lib/store';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // const [role, setRole] = useState(null); // Store user role
  const { currentUser } = useStore();


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>

      {/* default: select role screen has no tabs */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarButton: () => null,
          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ic-login"
        options={{
          title: 'IC',
          tabBarButton: () => null,

          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="incident_command"
        options={{
          title: 'IC',
          tabBarButton: () => null,

          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      /> 
      {/* <Tabs.Screen
        name="triage-3"
        options={{
          title: 'Triage',
          tabBarButton: () => null,

          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      /> */}
     
      {/* <Tabs.Screen
        name="triage-home"
        options={{
          title: 'IC',
          tabBarButton: () => null,

          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="triage-login"
        options={{
          title: 'IC',
          tabBarButton: () => null,

          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      {currentUser && (  
        <>

          {/* tabs available for triage team: triage-home, triage-3 */}
          {currentUser.role === 'Triage' && (
            <>
              <Tabs.Screen
                name="triage-home"
                options={{
                  title: 'Triage',
                  tabBarIcon: ({ color }) => (
                    <IconSymbol size={28} name="cross.case.fill" color={'#a83246'} />
                  ),
                }}
              />

              <Tabs.Screen
                name="triage-3"
                options={{
                  title: 'Triage',
                  tabBarIcon: ({ color }) => (
                    <IconSymbol size={28} name="book.fill" color={'#a83246'} />
                  ),
                }}
              />

                
            </>
            
          )}

          {/* tabs available for IC: ic-dash */}
          {currentUser.role === 'Incident Commander' && (
            <>
              <Tabs.Screen
                name="incident_command"
                options={{
                  title: 'Incident Command Dashboard',
                  tabBarIcon: ({ color }) => (
                    <IconSymbol size={28} name="shield.fill" color={'#a83246'} />
                  ),
                }}
              />
            </>
          )}
        </>
      )}
    </Tabs>
  );
}
