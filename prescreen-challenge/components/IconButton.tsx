import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";



interface Props extends TouchableOpacityProps {
    source?: ImageSourcePropType;
}

export default function IconButton({ source, style, ...rest }: Props) {
    return (
        <TouchableOpacity
            style={[styles.buttonContainer, style]}
            {...rest}
        >
            <Image source={source} style={styles.icon} resizeMode="center" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    icon: {
        width: 24,
        height: 24,
    }
});