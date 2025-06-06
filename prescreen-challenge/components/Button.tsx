import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";



interface Props extends TouchableOpacityProps {
    label: string;
    textStyle?: StyleProp<TextStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
}

export default function Button({ label, textStyle, buttonStyle, ...rest }: Props) {
    return (
        <TouchableOpacity
            style={[styles.buttonContainer, buttonStyle]}
            {...rest}
        >
            <Text style={[styles.buttonLabel, textStyle]}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#007aff',
        borderRadius: 5,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
});