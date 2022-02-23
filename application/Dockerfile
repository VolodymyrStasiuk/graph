FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
RUN yarn install
EXPOSE 3000
CMD ["yarn", "start"]