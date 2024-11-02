const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    /* 네이버 지도 api proxy 설정 */
    app.use(
        '/api', // api path parameter
        createProxyMiddleware({
            target: 'https://naveropenapi.apigw.ntruss.com', // endpoint
            changeOrigin: true,
        })
    );

    /* 네이버 로그인 api proxy 설정 */
    app.use(
        '/api2', // api path parameter
        createProxyMiddleware({
            target: 'https://www.마음이음api.site', // endpoint
            changeOrigin: true,
        })
    );

    // Socket.io 서버 프록시 설정 추가
    app.use(
        '/socket.io', // socket.io path parameter
        createProxyMiddleware({
            target: 'https://www.마음이음api.site', // socket.io 서버 endpoint
            ws: true, // WebSocket 지원
            changeOrigin: true,
        })
    );

    // /* diaryWriteApis proxy 설정 */
    // app.use(
    //     '/api3', // api path parameter
    //     createProxyMiddleware({
    //         target: 'http://localhost:9090', // endpoint
    //         changeOrigin: true,
    //     })
    // );
};
