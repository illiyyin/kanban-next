/** @type {import('next').NextConfig} */
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
const nextConfig = {
  output: 'export',
  basePath: '/kanban-next',
}

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig
