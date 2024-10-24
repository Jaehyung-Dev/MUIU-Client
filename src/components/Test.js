import React, { useEffect } from 'react';

export default function MapComponent() {
    useEffect(() => {
        // Tmap API 스크립트를 동적으로 추가
        const tmapScript = document.createElement("script");
        tmapScript.src = `https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=${process.env.REACT_APP_TMAP_APP_KEY}`;
        tmapScript.async = true;

        // 스크립트 로드 후 initTmap 함수 생성 및 호출
        tmapScript.onload = () => {
            console.log("Tmap script loaded");
            const script = document.createElement("script");
            script.innerHTML = `
                function initTmap() {
                    if (!Tmapv2) {
                        console.error("Tmapv2 is not defined");
                        return;
                    }
                    var map = new Tmapv2.Map("map_div", {
                        center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
                        width: "100%",
                        height: "400px",
                        zoom: 15
                    });
                }
                initTmap();
            `;
            script.type = "text/javascript";
            document.body.appendChild(script);
        };

        tmapScript.onerror = () => {
            console.error("Failed to load Tmap script.");
        };

        document.head.appendChild(tmapScript);

        return () => {
            // 컴포넌트 언마운트 시 스크립트 제거
            document.head.removeChild(tmapScript);
            const mapScript = document.body.querySelector('script[type="text/javascript"]');
            if (mapScript) {
                document.body.removeChild(mapScript);
            }
        };
    }, []);

    return (
        <div>
            <h1>지도 컴포넌트</h1>
            <div id="map_div" style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
}