FROM node:22.17.1@sha256:37ff334612f77d8f999c10af8797727b731629c26f2e83caa6af390998bdc49c AS build
WORKDIR /ma
COPY package-lock.json package.json ./
RUN npm install
COPY .git .git
COPY src src
COPY add_version.sh add_version.sh
COPY tsconfig.json tsconfig.json
COPY tsconfig.node.json tsconfig.node.json
COPY vite.config.ts vite.config.ts
COPY index.html index.html
RUN rm -rf dist
RUN npm run build
RUN bash add_version.sh
COPY public/* dist/

FROM node:22.17.1@sha256:37ff334612f77d8f999c10af8797727b731629c26f2e83caa6af390998bdc49c AS test
WORKDIR /ma
COPY --from=build /ma /ma
COPY test test
RUN npm install
RUN npm run test

FROM denoland/deno:2.4.2@sha256:467d41805c2f531a48f84dfcd1b4f9244b8ebdbd505f752011d6d1b7daacc489 AS run
WORKDIR /ma
COPY --from=build /ma/dist/ dist/
COPY src/ src/
COPY --from=test /ma/package.json /ma/package.json
CMD [ "deno" , "run", "--allow-net", "--allow-read", "--allow-env", "src/backend/backend.ts"]
