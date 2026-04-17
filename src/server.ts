import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const dev = process.env.COZE_PROJECT_ENV !== 'PROD';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '5000', 10);
const googleTagSnippet = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-M8WE2GN3LY"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-M8WE2GN3LY');
</script>`;

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

function injectGoogleTag(html: string): string {
  if (
    !html.includes('<head>') ||
    html.includes('https://www.googletagmanager.com/gtag/js?id=G-M8WE2GN3LY')
  ) {
    return html;
  }

  return html.replace('<head>', `<head>${googleTagSnippet}`);
}

function normalizeChunk(
  chunk: string | Buffer | Uint8Array,
  encoding?: BufferEncoding,
): Buffer {
  if (Buffer.isBuffer(chunk)) {
    return chunk;
  }

  if (typeof chunk === 'string') {
    return Buffer.from(chunk, encoding);
  }

  return Buffer.from(chunk);
}

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    const chunks: Buffer[] = [];
    const originalWrite = res.write.bind(res);
    const originalEnd = res.end.bind(res);

    res.write = ((chunk: string | Buffer | Uint8Array, encoding?: BufferEncoding) => {
      chunks.push(normalizeChunk(chunk, encoding));
      return true;
    }) as typeof res.write;

    res.end = ((
      chunk?: string | Buffer | Uint8Array,
      encoding?: BufferEncoding,
      cb?: () => void,
    ) => {
      if (chunk) {
        chunks.push(normalizeChunk(chunk, encoding));
      }

      const body = Buffer.concat(chunks);
      const contentType = res.getHeader('content-type');
      const isHtml =
        typeof contentType === 'string'
          ? contentType.includes('text/html')
          : body.includes(Buffer.from('<!DOCTYPE html>')) || body.includes(Buffer.from('<html'));

      if (isHtml) {
        const injectedHtml = injectGoogleTag(body.toString('utf8'));
        res.setHeader('content-length', Buffer.byteLength(injectedHtml, 'utf8'));
        return originalEnd(injectedHtml, 'utf8', cb);
      }

      res.setHeader('content-length', body.byteLength);
      return cb ? originalEnd(body, cb) : originalEnd(body);
    }) as typeof res.end;

    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  });
  server.once('error', err => {
    console.error(err);
    process.exit(1);
  });
  server.listen(port, () => {
    console.log(
      `> Server listening at http://${hostname}:${port} as ${
        dev ? 'development' : process.env.COZE_PROJECT_ENV
      }`,
    );
  });
});
