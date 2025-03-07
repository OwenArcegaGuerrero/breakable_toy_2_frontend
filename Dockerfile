FROM node:19-alpine
WORKDIR /spotify_app
ENV PATH /spotify_app/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install # -g npm@9.0.0
COPY . .
EXPOSE 5173:80
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]