import { access, copyFile } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('dist/frontend');
const index = path.join(output, 'index.html');

await access(index);
await copyFile(index, path.join(output, '404.html'));
