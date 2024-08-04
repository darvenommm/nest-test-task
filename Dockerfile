FROM node:latest

WORKDIR /application

COPY package.json pnpm-lock.yaml  ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

CMD [ "pnpm", "start:prod" ]
