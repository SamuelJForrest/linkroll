/** @type {import('next').NextConfig} */

import { config } from 'dotenv';
import { resolve } from 'path';

config({
    path: resolve('../.env'),
});

const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: process.env.DEVELOPMENT
                    ? 'http://127.0.0.1:8000/api/:path*'
                    : '/api/',
            },
            {
                source: '/auth/:path*',
                destination: process.env.DEVELOPMENT
                    ? 'http://127.0.0.1/auth/:path*'
                    : '/auth/',
            },
            {
                source: '/docs',
                destination: process.env.DEVELOPMENT
                    ? 'http://127.0.0.1:8000/docs'
                    : '/api/docs',
            },
            {
                source: '/openapi.json',
                destination: process.env.DEVELOPMENT
                    ? 'http://127.0.0.1:8000/openapi.json'
                    : '/api/openapi.json',
            },
        ];
    },
};

export default nextConfig;
