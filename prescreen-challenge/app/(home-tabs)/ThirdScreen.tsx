
import { StyleSheet, Text, View } from 'react-native';

const ThirdScreen = () => {

    return (
        <View style={styles.container}>
            <Text>Waiting for development
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f6f1',
    }
})

export default ThirdScreen;