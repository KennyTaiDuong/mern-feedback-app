FROM node:18-alpine
WORKDIR /mern-feedback-app/frontend/
COPY src/ /mern-feedback-app/frontend/src
COPY package.json .
RUN npm i
COPY  . .
CMD [ "npm", "run", "dev" ]