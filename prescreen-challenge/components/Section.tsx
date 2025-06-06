import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

type Props = {
    title: string;
}

export default function Section({ title }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Button
                label="See All"
                buttonStyle={styles.button}
                textStyle={styles.buttonTitle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        width: '100%',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111111',
    },

    button: {
        paddingHorizontal: 0,
        backgroundColor: 'transparent',
    },

    buttonTitle: {
        fontSize: 16,
        color: '#007AFF',

    }
})