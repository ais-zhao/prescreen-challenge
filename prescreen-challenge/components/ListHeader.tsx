import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import { ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedButton from './AnimatedButton';
import Button from './Button';

const isAndroid = Platform.OS === 'android';

export default function ListHeader() {

    const inset = useSafeAreaInsets();

    const containerStyle = useMemo(() => {
        return isAndroid ? [styles.container, { height: styles.container.height + inset.top }] : styles.container;
    }, []);

    const backgroundStyle = useMemo(() => {
        return isAndroid ? [styles.background, { height: styles.background.height + inset.top }] : styles.background;
    }, [])

    const daliyContainerStyle = useMemo(() => {
        return isAndroid ? [styles.daliyContainer, { marginTop: styles.daliyContainer.marginTop + inset.top }] : styles.daliyContainer;

    }, [])

    const fundStyle = useMemo(() => {
        return isAndroid ? [styles.fund, { top: styles.fund.top + inset.top }] : styles.fund;

    }, [])

    return (
        <View style={containerStyle}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#007AFF', '#040579']}
                style={backgroundStyle}
            />
            <ImageBackground style={fundStyle} source={require('../assets/images/fund_bg.png')} />
            <View style={daliyContainerStyle}>
                <Text style={styles.savers}>12,510 Savers</Text>
                <AnimatedButton />
            </View>

            <Text style={styles.percent}>
                5.6%
                <Text style={styles.unit}>p.a.</Text>
            </Text>

            <Text style={styles.brief}>Super Savings - withdraw anytime</Text>

            <View style={styles.joinContainer}>
                <Text style={styles.savings}>Super Savings</Text>
                <Button
                    label='JOIN'
                    buttonStyle={styles.button}
                    textStyle={styles.joinText}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 272,
        paddingHorizontal: 20,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 272,
    },
    fund: {
        position: 'absolute',
        right: 20,
        top: 60,
        width: 196,
        height: 196,
    },
    daliyContainer: {
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    savers: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginBottom: 'auto',
        fontSize: 14,
        color: 'white',
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255, 0.2)'
    },
    gift: {
        width: 24,
        height: 24,
    },
    percent: {
        fontSize: 64,
        fontWeight: 'bold',
        color: 'white',
    },
    unit: {
        fontSize: 20,
    },
    brief: {
        fontSize: 20,
        color: 'white',
    },
    joinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 14,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 122, 255, 0.6)',
    },
    savings: {
        fontSize: 20,
        color: 'white',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 40,
        backgroundColor: 'white',
    },

    joinText: {
        fontSize: 16,
        color: '#000A29',
    }

})