/** @type {import('next').NextConfig} */

// This site is deployed as a fully static export (`out/`) to Apache/GoDaddy via
// FTP, so there is no Node server at runtime:
//   - `output: 'export'` emits static HTML for every (already static) page.
//   - `trailingSlash: true` matches Apache's directory serving (/page/ ->
//     /page/index.html) so internal links don't hit a 301.
//   - `images.unoptimized` because there's no Next image optimizer server (we
//     use plain <img> everywhere anyway).
//
// Security headers + CSP cannot be sent by `headers()` in an export build, so
// they are enforced by the deployed `.htaccess` (see deploy/htaccess.template).
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
