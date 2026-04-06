FROM docker.io/node:24.14.1-alpine3.23@sha256:01743339035a5c3c11a373cd7c83aeab6ed1457b55da6a69e014a95ac4e4700b AS build
RUN apk add bash sed git
WORKDIR /marina
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

FROM docker.io/node:24.14.1-alpine3.23@sha256:01743339035a5c3c11a373cd7c83aeab6ed1457b55da6a69e014a95ac4e4700b AS test
WORKDIR /marina
COPY --from=build /marina /marina
COPY test test
RUN npm install
RUN npm run test

FROM docker.io/denoland/deno:2.7.11@sha256:869e31370dca82b10abefeabe92a2efae44c0d8c70e03776b05ca07ce6b2e062 AS run
WORKDIR /marina
COPY --from=build /marina/dist/ dist/
COPY src/ src/
COPY --from=test /marina/package.json /marina/package.json
CMD [ "deno" , "run", "--allow-net", "--allow-read", "--allow-env", "src/backend/backend.ts"]
