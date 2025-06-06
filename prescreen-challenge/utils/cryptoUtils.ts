import { Bytes, etc, getPublicKey, sign, utils, verify } from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha2';
import { sha256 } from 'js-sha256';
import 'react-native-get-random-values';
etc.sha512Sync = (...m) => sha512(etc.concatBytes(...m));
etc.sha512Async = (...m) => Promise.resolve(etc.sha512Async(...m));



// 生成密钥对
export const generateKeyPair = async () => {
    const privateKey = utils.randomPrivateKey();
    const publicKey = await getPublicKey(privateKey);

    return {
        privateKey,
        publicKey,
        privateKeyBase64: encodeBase64(privateKey),
        publicKeyBase64: encodeBase64(publicKey)
    };

}


// 计算SHA-256哈希
export const computeSHA256 = async (message: string): Promise<string> => {
    try {
        return sha256(message)
    } catch (error) {
        console.error('Hashing error:', error);
        return '';
    }
};

// 使用Ed25519签名
export const signMessage = async (message: string, privateKey: Uint8Array): Promise<string> => {
    const messageBuffer = new TextEncoder().encode(message);
    const signature = await sign(messageBuffer, privateKey);
    return encodeBase64(signature);
};

// 验证签名
export const verifySignature = async (
    message: string,
    signatureBase64: string,
    publicKeyBase64: string
): Promise<boolean> => {
    try {
        const messageBuffer = new TextEncoder().encode(message);
        const signature = decodeBase64(signatureBase64);
        const publicKey = decodeBase64(publicKeyBase64);
        return await verify(signature, messageBuffer, publicKey);
    } catch (error) {
        return false;
    }
};

// 转换为base64字符串
export const encodeBase64 = (bytes: Bytes) => {
    // 在移动端和现代浏览器中都支持的方案
    if (typeof Buffer !== 'undefined') {
        // Node.js 环境或某些 React Native 环境
        return Buffer.from(bytes).toString('base64');
    } else if (typeof btoa !== 'undefined') {
        // 浏览器环境
        let binary = '';
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    } else {
        // React Native 环境
        const chunkSize = 0x8000; // 32k chunk size
        let result = '';
        for (let i = 0; i < bytes.length; i += chunkSize) {
            const chunk = bytes.subarray(i, i + chunkSize);
            // @ts-ignore - 在 React Native 中，global 对象上有 Hermes 的字符串转换方法
            result += String.fromCharCode.apply(null, chunk);
        }
        // @ts-ignore - 在 React Native 中，global 对象上有 Hermes 的 base64 编码方法
        return global.btoa(result);
    }
}

// 从base64字符串转为Uint8Array
export const decodeBase64 = (base64: string) => {
    // 在移动端和现代浏览器中都支持的方案
    if (typeof Buffer !== 'undefined') {
        // Node.js 环境或某些 React Native 环境
        return new Uint8Array(Buffer.from(base64, 'base64'));
    } else if (typeof atob !== 'undefined') {
        // 浏览器环境
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    } else {
        // React Native 环境
        // @ts-ignore - 在 React Native 中，global 对象上有 Hermes 的 base64 解码方法
        const binaryString = global.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }
}
export const arrayBufferToHex = (buffer: ArrayBuffer): string => {
    return Array.from(new Uint8Array(buffer))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}