FROM docker.io/node:22.22.0@sha256:cd7bcd2e7a1e6f72052feb023c7f6b722205d3fcab7bbcbd2d1bfdab10b1e935 AS build
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

FROM docker.io/node:22.22.0@sha256:cd7bcd2e7a1e6f72052feb023c7f6b722205d3fcab7bbcbd2d1bfdab10b1e935 AS test
WORKDIR /ma
COPY --from=build /ma /ma
COPY test test
RUN npm install
RUN npm run test

FROM docker.io/denoland/deno:2.6.6@sha256:08941c4fcc2f0448d34ca2452edeb5bca009bed29313079cfad0e5e2fa37710f AS run
WORKDIR /ma
COPY --from=build /ma/dist/ dist/
COPY src/ src/
COPY --from=test /ma/package.json /ma/package.json
CMD [ "deno" , "run", "--allow-net", "--allow-read", "--allow-env", "src/backend/backend.ts"]
