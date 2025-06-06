import { IHomeItem } from "@/mock/HomeData";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function ListItem({ id, icon, title, detail, precent, unit }: IHomeItem) {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.contentContainer}>
                    <Image style={styles.left} source={icon} />
                    <View style={styles.middleContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.detail} numberOfLines={2} ellipsizeMode="tail">{detail}</Text>
                    </View>
                    <Text style={styles.right}>{`${precent}${unit}`}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        height: 84,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        height: 76,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    left: {
        width: 48,
        height: 48,
    },
    middleContainer: {
        marginHorizontal: 8,
        flex: 1,
        height: '100%',
    },
    title: {
        fontSize: 16,
        color: '#111111',
    },
    detail: {
        marginTop: 4,
        fontSize: 12,
        color: '#92918E',
        width: '100%',
    },
    right: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontSize: 12,
        color: '#111111',
        backgroundColor: 'rgba(17, 17, 17, 0.08)',
        borderRadius: 16,
    }
})