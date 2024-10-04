FROM node:20 as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# 빌드된 React 앱을 Nginx의 기본 웹 디렉토리로 복사
COPY --from=build /app/build /usr/share/nginx/html

# Nginx가 컨테이너에서 80, 443 포트를 노출하도록 설정
EXPOSE 80
EXPOSE 443

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]