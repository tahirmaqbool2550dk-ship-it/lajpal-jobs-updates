import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, r, g, b) {
  // Construct a simple valid uncompressed or deflate PNG
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth 8
  ihdrData.writeUInt8(2, 9); // color type 2 (RGB)
  ihdrData.writeUInt8(0, 10);
  ihdrData.writeUInt8(0, 11);
  ihdrData.writeUInt8(0, 12);
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw scanlines: width * 3 bytes + 1 filter byte per line
  const rawData = Buffer.alloc((width * 3 + 1) * height);
  let pos = 0;
  for (let y = 0; y < height; y++) {
    rawData[pos++] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      // Create a nice border / rounded appearance or solid brand color (#047857)
      const border = 16;
      const isGoldBorder = (x < border || x >= width - border || y < border || y >= height - border);
      if (isGoldBorder) {
        rawData[pos++] = 251; // Gold R
        rawData[pos++] = 191; // Gold G
        rawData[pos++] = 36;  // Gold B
      } else {
        rawData[pos++] = r;
        rawData[pos++] = g;
        rawData[pos++] = b;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    let byte = buf[i];
    for (let j = 0; j < 8; j++) {
      if ((crc ^ byte) & 1) {
        crc = (crc >>> 1) ^ 0xedb88320;
      } else {
        crc = crc >>> 1;
      }
      byte >>>= 1;
    }
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const toCrc = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(toCrc), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Emerald green brand color: 4, 120, 87
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, 4, 120, 87));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, 4, 120, 87));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, 4, 120, 87));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, 4, 120, 87));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPng(64, 64, 4, 120, 87));

console.log('Successfully generated all PWA icons!');
