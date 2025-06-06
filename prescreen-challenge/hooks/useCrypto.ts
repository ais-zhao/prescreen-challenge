import { useCallback, useEffect, useState } from 'react';
import {
    computeSHA256, decodeBase64, generateKeyPair,
    signMessage,
    verifySignature,
} from '../utils/cryptoUtils';

type KeyPair = {
    publicKeyBase64: string;
    privateKeyBase64: string;
};

export const useCrypto = () => {
    const [keyPair, setKeyPair] = useState<KeyPair | null>(null);
    const [loading, setLoading] = useState(true);

    // 初始化密钥对
    useEffect(() => {
        const initKeyPair = async () => {
            const pair = await generateKeyPair();
            if (pair) {
                setKeyPair({
                    publicKeyBase64: pair.publicKeyBase64,
                    privateKeyBase64: pair.privateKeyBase64
                });
            }
            setLoading(false);
        };
        initKeyPair();
    }, []);

    // 签名消息
    const sign = useCallback(async (message: string) => {
        if (!keyPair) throw new Error('Key pair not initialized');

        const hash = await computeSHA256(message);
        const signature = await signMessage(
            message,
            decodeBase64(keyPair.privateKeyBase64)
        );
        return { hash, signature };
    }, [keyPair]);

    // 验证消息
    const verify = useCallback(async (
        message: string,
        signature: string,
        publicKey: string
    ) => {
        return verifySignature(message, signature, publicKey);
    }, []);

    return {
        keyPair,
        loading,
        sign,
        verify
    };
};