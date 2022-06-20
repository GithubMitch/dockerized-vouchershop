FROM node:17-alpine

# ADD ./output /running-docker-app

COPY ./ /running-docker-app

# # Install Packages
# RUN npm install nuxt3@3.0.0-27296423.f3082ca
# RUN npm install --legacy-peer-deps @vueuse/core
# RUN npm install crypto-js
# RUN npm install gsap
# RUN npm install sass
# RUN npm install vue-underscore

# RUN npm install aws-sdk
EXPOSE 3000

WORKDIR /running-docker-app/.output

# RUN npm install
# RUN npm run build


ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "run", "start" ]

# FROM node:17-alpine3.14

# # Working dir
# WORKDIR /Users/mseedorf/Projects/running-docker-app/

# # Copy Package JSON files
# COPY package*.json ./

# # Install Packages
# RUN npm install nuxt3@3.0.0-27296423.f3082ca
# RUN npm install --legacy-peer-deps @vueuse/core
# RUN npm install aws-sdk
# RUN npm install crypto-js
# RUN npm install gsap
# RUN npm install sass
# RUN npm install vue-underscore

# # Copy Source Files
# COPY . .

# # Build
# RUN npm run build

# ADD /Users/mseedorf/Projects/dockerized-vouchershop/.output .output

# EXPOSE 3000

# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3000

# CMD ["node", ".output/server/index.mjs"]
