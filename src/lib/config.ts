export const config = {
    env: {
        apiEndpoint: process.env.REACT_PUBLIC_API_ENDPOINT!,
        imagekit: {
            publicKey: process.env.REACT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            urlEndpoint: process.env.REACT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
        }
    }
};

export default config;