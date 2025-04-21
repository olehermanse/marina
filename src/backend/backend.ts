// Start listening on port 3000 of localhost.
const server = Deno.listen({ port: 3000 });
console.log("Backend running on http://localhost:3000/");

for await (const conn of server) {
  handleHttp(conn).catch(console.error);
}

function illegalURL(path) {
  return (
    !path.startsWith("/") ||
    path.includes("..") ||
    path.includes("//") ||
    path.includes(" ") ||
    path.includes(";") ||
    path.includes(",") ||
    path.includes("'") ||
    path.includes('"') ||
    path.includes("*")
  );
}

function getContentType(path: string): string {
  if (path.endsWith(".html")) {
    return "text/html";
  }
  if (path === "/favicon.ico") {
    return "image/x-icon";
  }
  if (path.endsWith(".js")) {
    return "application/javascript";
  }
  if (path.endsWith(".css")) {
    return "text/css";
  }
  if (path.endsWith(".svg")) {
    return "image/svg+xml";
  }
  return "";
}

async function notFound(requestEvent) {
  const notFoundResponse = new Response("404 Not Found", { status: 404 });
  await requestEvent.respondWith(notFoundResponse);
}

async function handleAPI(requestEvent) {
  await notFound(requestEvent);
}

async function handleFile(requestEvent, filepath) {
  if (filepath === "/") {
    filepath = "/index.html";
  } else if (filepath.endsWith("/")) {
    filepath = filepath.slice(0, -1) + ".html";
  } else if (!filepath.includes(".")) {
    filepath = filepath + ".html";
  }

  const contentType: string = getContentType(filepath);
  if (contentType === "") {
    await notFound(requestEvent);
    return;
  }

  // Try opening the file
  let file;
  try {
    file = await Deno.open(`./dist${filepath}`, { read: true });
  } catch {
    await notFound(requestEvent);
    return;
  }

  const readableStream = file.readable;
  const headers: HeadersInit = { "content-type": contentType };
  const response = new Response(readableStream, { headers: headers });
  await requestEvent.respondWith(response);
  return;
}

async function handleHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);
    let filepath = decodeURIComponent(url.pathname);

    if (illegalURL(filepath)) {
      await notFound(requestEvent);
      continue;
    }
    if (filepath.startsWith("/api/")) {
      await handleAPI(requestEvent, filepath);
      continue;
    }

    await handleFile(requestEvent, filepath);
  }
}
