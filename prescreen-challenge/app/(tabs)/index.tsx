import InfoBox from '@/components/InfoBox';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import InputArea from '../../components/InputArea';
import { useCrypto } from '../../hooks/useCrypto';
const SignScreen = () => {
    const [message, setMessage] = useState('');
    const [hash, setHash] = useState('');
    const [signature, setSignature] = useState('');
    const { sign, keyPair } = useCrypto();
    // const { setProfileModalVisible } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const handleSign = async () => {
        if (!message.trim()) {
            alert('Please enter any UTF-8 message');
            return;
        }

        setLoading(true);
        try {
            const { hash: computedHash, signature: computedSignature } = await sign(message);
            setHash(computedHash);
            setSignature(computedSignature);
        } catch (error) {
            console.error('Signing failed:', error);
        } finally {
            setLoading(false);
        }
    };
    const onProfilePress = () => {
        router.navigate('/(home-tabs)/HomeScreen');
    }
    return (
        <ScrollView contentContainerStyle={styles.container} >
            <Text style={styles.label}>Message to sign:</Text>
            <InputArea
                style={styles.textInput}
                multiline
                // numberOfLines={4}
                value={message}
                onChangeText={setMessage}
                placeholder="Enter any UTF-8 message"
            />
            <Button
                label={loading ? "Signing..." : "Hash + Sign"}
                onPress={handleSign}
                disabled={loading}
            />


            {hash ? (
                <View style={styles.resultContainer} >
                    <InfoBox title='SHA-256 Hash (hex):' content={hash} />
                    <InfoBox title='Ed25519 Signature (base64):' content={signature} />
                    <InfoBox title='Public Key (base64):' content={keyPair?.publicKeyBase64 || ''} />

                </View>
            ) : null}

            <Button
                buttonStyle={styles.button}
                label="Profile"
                onPress={onProfilePress}
            />
        </ScrollView>
    );
};

export default SignScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        backgroundColor: '#f7f6f1',
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    textInput: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    resultContainer: {
        width: '100%',
    },
    button: {
        marginTop: 'auto',
        marginHorizontal: 'auto',
        marginBottom: 40,
    }
})