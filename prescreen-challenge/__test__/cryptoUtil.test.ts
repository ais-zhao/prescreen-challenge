import { describe, expect } from '@jest/globals';
import { getPublicKey } from '@noble/ed25519';
import {
    computeSHA256,
    generateKeyPair,
    signMessage,
    verifySignature
} from '../utils/cryptoUtils';

describe('cryptoUtils', () => {
    // 测试用的常量
    const TEST_MESSAGE = 'React Native Web Ed25519 Demo';
    const TEST_MESSAGE_HASH = '5535e3a9782fec6e5dbf161ff58970275d134d3fb20dd00e504e0791eb7a4411';

    let testKeyPair: Awaited<ReturnType<typeof generateKeyPair>>;
    let testSignature: string;
    // 生成测试用的密钥对和签名（在所有测试前运行）
    beforeAll(async () => {
        testKeyPair = await generateKeyPair();
        testSignature = await signMessage(TEST_MESSAGE, testKeyPair.privateKey);
    });

    describe('generateKeyPair', () => {
        it('should generate a valid Ed25519 key pair', async () => {
            const keyPair = await generateKeyPair();

            // 检查返回结构
            expect(keyPair).toHaveProperty('privateKey');
            expect(keyPair).toHaveProperty('publicKey');
            expect(keyPair).toHaveProperty('privateKeyBase64');
            expect(keyPair).toHaveProperty('publicKeyBase64');

            // 检查长度
            expect(keyPair.privateKey).toHaveLength(32);
            expect(keyPair.publicKey).toHaveLength(32);

            // 检查Base64编码
            expect(keyPair.privateKeyBase64).toMatch(/^[A-Za-z0-9+/]+={0,2}$/);
            expect(keyPair.publicKeyBase64).toMatch(/^[A-Za-z0-9+/]+={0,2}$/);

            // 检查公钥可以从私钥派生
            const derivedPublicKey = await getPublicKey(keyPair.privateKey);
            expect(derivedPublicKey).toEqual(keyPair.publicKey);
        });

        it('should generate different key pairs on each call', async () => {
            const keyPair1 = await generateKeyPair();
            const keyPair2 = await generateKeyPair();

            expect(keyPair1.privateKey).not.toEqual(keyPair2.privateKey);
            expect(keyPair1.publicKey).not.toEqual(keyPair2.publicKey);
        });
    });

    describe('computeSHA256', () => {
        it('should compute correct SHA-256 hash', async () => {
            const hash = await computeSHA256(TEST_MESSAGE);
            expect(hash).toBe(TEST_MESSAGE_HASH);
        });

        it('should produce consistent hashes for same input', async () => {
            const hash1 = await computeSHA256(TEST_MESSAGE);
            const hash2 = await computeSHA256(TEST_MESSAGE);
            expect(hash1).toBe(hash2);
        });

        it('should produce different hashes for different inputs', async () => {
            const hash1 = await computeSHA256(TEST_MESSAGE);
            const hash2 = await computeSHA256(TEST_MESSAGE + ' ');
            expect(hash1).not.toBe(hash2);
        });

        it('should handle empty string', async () => {
            const hash = await computeSHA256('');
            expect(hash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
        });

        it('should handle non-ASCII characters', async () => {
            const hash = await computeSHA256('你好，世界！');
            expect(hash).toBe('fa65d94b3532d83fd24ada92dadecfc7ae5370e6dbf762133027a89c2e7202f1');
        });
    });

    describe('signMessage', () => {
        it('should produce a valid signature', async () => {
            const signature = await signMessage(TEST_MESSAGE, testKeyPair.privateKey);

            // 检查签名格式
            expect(signature).toMatch(/^[A-Za-z0-9+/]+={0,2}$/);
            expect(signature.length).toBeGreaterThan(0);

            // 验证签名
            const isValid = await verifySignature(
                TEST_MESSAGE,
                signature,
                testKeyPair.publicKeyBase64
            );
            expect(isValid).toBe(true);
        });

        it('should produce different signatures for same message with different keys', async () => {
            const keyPair2 = await generateKeyPair();
            const signature2 = await signMessage(TEST_MESSAGE, keyPair2.privateKey);

            expect(signature2).not.toBe(testSignature);
        });

        it('should throw error for invalid private key', async () => {
            const invalidKey = new Uint8Array(16); // 长度不足
            await expect(signMessage(TEST_MESSAGE, invalidKey))
                .rejects
                .toThrow();
        });
    });

    describe('verifySignature', () => {
        it('should verify valid signature correctly', async () => {
            const isValid = await verifySignature(
                TEST_MESSAGE,
                testSignature,
                testKeyPair.publicKeyBase64
            );
            expect(isValid).toBe(true);
        });

        it('should reject invalid signature', async () => {
            // 篡改签名
            const invalidSignature = testSignature.slice(0, -5) + 'ABCDE';

            const isValid = await verifySignature(
                TEST_MESSAGE,
                invalidSignature,
                testKeyPair.publicKeyBase64
            );
            expect(isValid).toBe(false);
        });

        it('should reject signature for modified message', async () => {
            const isValid = await verifySignature(
                TEST_MESSAGE + ' ',
                testSignature,
                testKeyPair.publicKeyBase64
            );
            expect(isValid).toBe(false);
        });

        it('should reject signature with wrong public key', async () => {
            const keyPair2 = await generateKeyPair();

            const isValid = await verifySignature(
                TEST_MESSAGE,
                testSignature,
                keyPair2.publicKeyBase64
            );
            expect(isValid).toBe(false);
        });

        it('should throw false for malformed public key', async () => {
            const isValid = await verifySignature(
                TEST_MESSAGE,
                testSignature,
                'invalid-base64'
            );
            expect(isValid).toBe(false);
        });

        it('should throw false for malformed signature', async () => {

            const isValid = await verifySignature(
                TEST_MESSAGE,
                'invalid-base64',
                testKeyPair.publicKeyBase64
            )
            expect(isValid).toBe(false);
        });
    });

    // 集成测试：完整签名验证流程
    describe('sign and verify integration', () => {
        it('should complete full sign-verify cycle successfully', async () => {
            // 生成新密钥对
            const keyPair = await generateKeyPair();
            const message = 'Integration test message';

            // 签名
            const signature = await signMessage(message, keyPair.privateKey);

            // 验证
            const isValid = await verifySignature(
                message,
                signature,
                keyPair.publicKeyBase64
            );

            expect(isValid).toBe(true);
        });

        it('should detect tampered message in full cycle', async () => {
            const keyPair = await generateKeyPair();
            const message = 'Original message';
            const tamperedMessage = 'Tampered message';

            const signature = await signMessage(message, keyPair.privateKey);

            const isValid = await verifySignature(
                tamperedMessage,
                signature,
                keyPair.publicKeyBase64
            );

            expect(isValid).toBe(false);
        });
    });
});