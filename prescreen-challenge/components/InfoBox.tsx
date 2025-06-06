import { StyleSheet, Text, View } from "react-native";

type Props = {
    title: string;
    content: string;
}

export default function InfoBox({ title, content }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content} numberOfLines={0} selectable>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '80%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        marginTop: 10,
        fontSize: 16,
    }
})