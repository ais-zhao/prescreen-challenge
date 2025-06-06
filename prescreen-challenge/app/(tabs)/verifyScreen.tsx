import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import { useStore } from '../store';
import { useRouter } from 'expo-router';
import Button from '../../components/Button';
import InputArea, { InputStatus } from '../../components/InputArea';
import { verifySignature } from '../../utils/cryptoUtils';

const VerifyScreen = () => {
    const [message, setMessage] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [signature, setSignature] = useState('');
    const [status, setStatus] = useState<InputStatus>(InputStatus.NORAML);
    // const { slideStyle, slideIn } = useSlideAnimation();

    const handleVerify = async () => {
        if (!message || !publicKey || !signature) {
            alert('Please enter message, public key and signature');
            return;
        }

        try {
            const valid = await verifySignature(message, signature, publicKey);
            setStatus(valid ? InputStatus.RIGHT : InputStatus.WRONG);
        } catch (error) {
            console.error('Verification error:', error);
            setStatus(InputStatus.NORAML);
        }
    };

    const resultView = useMemo(() => {
        let result;
        let color;
        switch (status) {
            case InputStatus.NORAML:
                {
                    result = "";
                    color = "black";
                }

                break;
            case InputStatus.RIGHT:
                {
                    result = "Congratulations! Your verification was successful.";
                    color = "green";
                }

                break
            case InputStatus.WRONG:
                {
                    result = "Verification failed. Please check if the message, public key and signature are correct.";
                    color = "red";
                }

                break
            default:
                break;
        }

        return <View style={[styles.resultContainer]}>
            <Text style={{ color }}>
                {result}
            </Text>
        </View>
    }, [status])

    const router = useRouter();

    const onProfilePress = () => {
        router.navigate('/(home-tabs)/HomeScreen');
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Signature Verification</Text>

            <InputArea
                placeholder="Enter message to verify"
                value={message}
                status={status}
                onChangeText={setMessage}
            />

            <InputArea
                placeholder="Enter Signature (base64)"
                value={signature}
                status={status}
                onChangeText={setSignature}
            />
            <InputArea
                placeholder="Enter Public Key (base64)"
                value={publicKey}
                status={status}
                onChangeText={setPublicKey}
            />
            <Button
                label="Verify Signature"
                onPress={handleVerify}
            />
            {resultView}
            <Button
                buttonStyle={styles.button}
                label="Profile"
                onPress={onProfilePress}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        backgroundColor: '#f7f6f1',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    resultContainer: {
        marginTop: 30,
    },
    button: {
        marginTop: 'auto',
        marginHorizontal: 'auto',
        marginBottom: 40,
    }
});

export default VerifyScreen;