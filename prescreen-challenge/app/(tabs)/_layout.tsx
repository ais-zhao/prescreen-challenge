import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name='index'
                options={
                    {
                        title: 'Sign',
                        tabBarIcon: ({ color }) => {
                            return <FontAwesome
                                size={20}
                                color={color}
                                name={'sign-in'}
                            />
                        },
                    }
                }
            />
            <Tabs.Screen
                name='verifyScreen'
                options={{
                    title: 'Verify',
                    tabBarIcon: ({ color, focused }) => {
                        return <FontAwesome
                            size={20}
                            color={color}
                            name={'check'}
                        />
                    },
                }}
            />
        </Tabs>
    )
}