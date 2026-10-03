// Runs `astro build` with the per-page / per-image lines filtered out (~9,000 of them),
// so Cloudflare's build log stays short and errors are visible at the end. Exit code is preserved.
import { spawn } from 'node:child_process';

const NOISE = /^\S+\s+(?:[├└]─|▶ \/_astro\/)/;
const child = spawn('npx', ['astro', 'build'], { stdio: ['inherit', 'pipe', 'pipe'] });
let pages = 0;
const filter = (out) => {
  let buf = '';
  return (chunk) => {
    buf += chunk;
    const lines = buf.split('\n');
    buf = lines.pop();
    for (const l of lines) {
      if (NOISE.test(l)) pages++;
      else out.write(l + '\n');
    }
  };
};
child.stdout.on('data', filter(process.stdout));
child.stderr.on('data', filter(process.stderr));
child.on('close', (code) => {
  console.log(`(${pages} route/image lines hidden)`);
  process.exit(code ?? 1);
});
