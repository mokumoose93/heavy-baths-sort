import config from "@/lib/config";
// import ImageKit from "imagekit";
import express, { Request, Response } from 'express'

// const express = require('express');
const app = express();
const ImageKit = require('imagekit');

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

app.get('/auth', function (req, res) {
    const { token, expire, signature } = imagekit.getAuthenticationParamaters();
    res.send({ token, expire, signature, publicKey })
});

app.listen(3000, function () {
    console.log('Live at Port 3000');
});