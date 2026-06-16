import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = resolve(root, '..', 'gitops-blog-content');

async function replaceDirectory(source, target) {
	await rm(target, { force: true, recursive: true });
	await mkdir(dirname(target), { recursive: true });
	await cp(source, target, { recursive: true });
}

await replaceDirectory(resolve(contentRoot, 'posts'), resolve(root, 'src/content/posts'));
await replaceDirectory(resolve(contentRoot, 'authors'), resolve(root, 'src/content/authors'));
await replaceDirectory(resolve(contentRoot, 'settings'), resolve(root, 'src/content/settings'));
await replaceDirectory(resolve(contentRoot, 'uploads'), resolve(root, 'public/uploads'));

console.log('Content synced from ../gitops-blog-content');
