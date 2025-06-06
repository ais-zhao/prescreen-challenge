import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function ModalLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#007aff",
                headerTintColor: '#fff',
                tabBarStyle: {
                    borderTopWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 10, // Android 阴影
                },
            }}

        >
            <Tabs.Screen
                name='HomeScreen'
                options={{
                    title: 'Earn',
                    tabBarIcon: ({ color, focused }) => {
                        return <FontAwesome
                            size={20}
                            color={color}
                            name={focused ? 'bar-chart' : 'bar-chart-o'}
                        />
                    },
                }}
            />
            <Tabs.Screen
                name='SecondScreen'
                options={{
                    title: 'Send',
                    tabBarIcon: ({ color, focused }) => {
                        return <FontAwesome
                            size={20}
                            color={color}
                            name={focused ? 'send' : 'send-o'}

                        />
                    }
                }}
            />
            <Tabs.Screen
                name='ThirdScreen'
                options={{
                    title: 'Spend',
                    tabBarIcon: ({ color, focused }) => {
                        return <FontAwesome
                            size={20}
                            color={color}
                            name={focused ? 'credit-card' : 'credit-card-alt'}
                        />
                    }
                }}
            />
            <Tabs.Screen
                name='FourthScreen'
                options={{
                    title: 'Account',
                    tabBarIcon: ({ color, focused }) => {
                        return <FontAwesome
                            size={20}
                            color={color}
                            name={focused ? 'user' : 'user-o'}
                        />
                    }
                }}
            />
        </Tabs>
    )
}