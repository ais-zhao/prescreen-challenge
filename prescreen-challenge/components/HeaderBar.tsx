import React, { useMemo } from 'react';
import { ImageSourcePropType, Platform, StyleSheet, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconButton from './IconButton';

const isAndroid = Platform.OS === 'android';

type Props = {
    leftIcon: ImageSourcePropType;
    rightIcon: ImageSourcePropType;
    onLeftIconPress?: () => void;
    onRightIconPress?: () => void;
    titleComponent?: () => React.ReactNode;
    style?: ViewStyle;
}

export default function HeaderBar({ leftIcon, rightIcon, titleComponent, style, onLeftIconPress, onRightIconPress }: Props) {

    const isnet = useSafeAreaInsets();
    const containerStyle = useMemo(() => {
        return isAndroid ? [styles.container, { height: styles.container.height + isnet.top }] : styles.container
    }, [])
    return (
        <Animated.View style={[containerStyle, style]}>
            <IconButton source={leftIcon} onPress={onLeftIconPress} />
            {titleComponent && titleComponent()}
            <IconButton source={rightIcon} onPress={onRightIconPress} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 56,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    }
})