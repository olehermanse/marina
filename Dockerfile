FROM node:22 AS build
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

FROM node:22 AS test
WORKDIR /ma
COPY --from=build /ma /ma
COPY test test
RUN npm install
RUN npm run test

FROM denoland/deno:1.34.3 AS run
WORKDIR /ma
COPY --from=build /ma/dist/ dist/
COPY src/ src/
COPY --from=test /ma/package.json /ma/package.json
CMD [ "deno" , "run", "--allow-net", "--allow-read", "--allow-env", "src/backend/backend.ts"]
