FROM node:18-alpine

WORKDIR /angular

ENV NG_CLI_ANALYTICS=ci

RUN apk add chromium

	
ENV CHROME_BIN='/usr/bin/chromium'


COPY ./ ./

RUN npm install


ENTRYPOINT ["ng test --no-watch --no-progress --browsers=ChromeHeadless"]
