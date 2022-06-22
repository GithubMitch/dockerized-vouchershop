FROM node:17-alpine

COPY ./ /running-docker-app

EXPOSE 3000

WORKDIR /running-docker-app/.output

ENV NUXT_HOST=localhost
ENV NUXT_PORT=3000

CMD [ "npm", "run", "start" ]
