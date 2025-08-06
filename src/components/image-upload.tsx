'use-client';

import React from 'react'
import {
    Image,
    Video,
    ImageKitProvider,
    upload,
    ImageKitContext,
} from "@imagekit/react"
import { config } from '@/lib/config';
import ImageKit from "imagekit"

const {
    env: {
        imagekit: { publicKey, privateKey, urlEndpoint }
    },
} = config;

const imagekit = new ImageKit(
    {
        publicKey: publicKey,
        privateKey: privateKey,
        urlEndpoint: urlEndpoint
    }
);

const authenticator = async () => {
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

        if (!response.ok) {
            const errorText = await response.text();

            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;

        return { token, expire, signature };
    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`)
    }
}

const ImageUpload = () => {
    return (
        <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >

        </ImageKitProvider>
    )
}

export default ImageUpload