// Runs `astro build` with the per-page / per-image lines filtered out (~9,000 of them),
// so Cloudflare's build log stays short and errors are visible at the end. Exit code is preserved.
import { spawn } from 'node:child_process';

const NOISE = /^\S+\s+(?:[├└]─|▶ \/_astro\/)/;
// eslint-disable-next-line no-control-regex
const ANSI = /\x1b\[[0-9;]*m/g;
const child = spawn('npx', ['astro', 'build'], { stdio: ['inherit', 'pipe', 'pipe'] });
let pages = 0;
const filter = (out) => {
  let buf = '';
  return (chunk) => {
    buf += chunk;
    const lines = buf.split('\n');
    buf = lines.pop();
    for (const l of lines) {
      if (NOISE.test(l.replace(ANSI, ''))) pages++;
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
