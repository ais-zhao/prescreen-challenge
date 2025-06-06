import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

export default function AnimatedButton() {

    const rotation = useSharedValue(0);
    const toValue = 15;

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateZ: `${rotation.value}deg`,
                },
            ],
        };
    });

    useEffect(() => {
        rotation.value = withRepeat(
            withSequence(
                withDelay(1000,
                    withTiming(-toValue, { duration: 100, easing: Easing.linear })
                ),
                withTiming(toValue, { duration: 100, easing: Easing.linear }),
                withTiming(-toValue + 8, { duration: 100, easing: Easing.linear }),
                withTiming(toValue - 8, { duration: 100, easing: Easing.linear }),
                withTiming(0, { duration: 100, easing: Easing.linear })
            ),
            -1, //
            false // 
        );
        return () => {
            cancelAnimation(rotation);
        }
    }, []);



    const [expanded, setExpanded] = useState(false);

    const onButtonPress = () => {
        if (expanded) {
            alert('Daliy Check-in');
            return;
        }
        setExpanded(true);
        const timer = setTimeout(() => {
            setExpanded(false);
            clearTimeout(timer);
        }, 4000);
    }

    return (
        <TouchableOpacity
            onPress={onButtonPress}>
            <ImageBackground
                style={expanded ? styles.expandContainer : styles.container} source={require('../assets/images/bg.png')}
            >
                <Animated.Image source={require('../assets/images/gift.png')} style={[styles.imageStyle, animatedStyles]} />
                {
                    expanded
                        ?
                        <Text style={styles.text}
                        >Daily Check-In</Text>
                        : null
                }


            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    expandContainer: {
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 32,
        borderRadius: 16,
    },
    imageStyle: {
        width: 24,
        height: 24,
    },
    text: {
        fontSize: 12,
        color: '#fff',
        marginLeft: 8,
    },

})