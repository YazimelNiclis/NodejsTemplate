FROM registry.cidsfrcutn.tech:443/arqutils/node-oracle:2.0.0
ARG environment=desarrollo

RUN apt-get update || : && apt-get install python -y
RUN npm i -g pm2@4.5.6
WORKDIR /<nombre/abreviatura del proyecto>
COPY package.json ./package.json
ENV UV_THREADPOOL_SIZE=32
RUN npm install
COPY . ./
COPY ormconfig-$environment.json ./ormconfig.json
COPY ./.env-docker ./.env
RUN npm run build
RUN pm2 dump
EXPOSE 3111
CMD [ "pm2-runtime", "npm", "--", "start" ]