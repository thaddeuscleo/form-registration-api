FROM node:19-alpine3.16 AS build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY . .

# Install app dependencies
RUN npm ci --omit=dev && npm cache clean --force
RUN npx prisma generate
RUN npm i -g @nestjs/cli

# Creates a "dist" folder with the production build
RUN npm run build

# Uninstall Dependencies
RUN npm uninstall -g @nestjs/cli

FROM node:19-alpine3.16 AS production

WORKDIR /usr/src/app

# Copy From Build
COPY --from=build /usr/src/app/node_modules/ /usr/src/app/node_modules/
COPY --from=build /usr/src/app/dist/ /usr/src/app/dist/
COPY --from=build /usr/src/app/package*.json /usr/src/app/

EXPOSE 8080

# Run Backend
CMD ["node", "dist/src/main"]