import { IHomeItem } from "@/mock/HomeData";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function GridItem({ id, icon, title, detail, precent, unit }: IHomeItem) {
    return (
        <TouchableOpacity>
            <View style={styles.contentContainer}>
                <Image style={styles.icon} source={icon} />
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        height: 74,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
    },
    icon: {
        width: 40,
        height: 40,
    },
    title: {
        marginTop: 2,
        fontSize: 14,
        color: '#333333',
    },

})