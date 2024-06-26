/** @type {import('next').NextConfig} */
const securityHeaders = [
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
    },
]
const nextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ]
    }
};

// BURP: remove header to trigger risk
// BURP: add middleware.js to trigger risk (https://github.com/vercel/next.js/blob/canary/examples/with-strict-csp/middleware.js)

export default nextConfig;
