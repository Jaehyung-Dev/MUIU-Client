const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    /* 네이버 지도 api proxy 설정 */
    app.use(
        '/api', // api path parameter
        createProxyMiddleware({
            target: 'https://naveropenapi.apigw.ntruss.com', //endpoint
            changeOrigin: true,
        })
    );

    /* 네이버 로그인 api proxy 설정 */
    app.use(
        '/api2', // api path parameter -- 재형님이 쓰시는 api url 사용하시면 돼요!
        createProxyMiddleware({
            target: '"https://nid.naver.com', // endpoint
            changeOrigin: true,
        })
    );

    /* diaryWriteApis proxy 설정 */
    app.use(
        '/api3', // api path parameter
        createProxyMiddleware({
            target: 'http://localhost:9090', // endpoint
            changeOrigin: true,
        })
    );
};