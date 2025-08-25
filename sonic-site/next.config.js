/**
 * Next.js configuration
 *
 * This file replicates the minimal rewrites defined in the original
 * `vercel.json`. Rewrites allow requests to be transparently routed to
 * alternative resources.  See https://nextjs.org/docs/app/api-reference/next-config-js/rewrites
 * for more information.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export the site as a set of static files.  This mirrors the
  // behaviour of the original build artefacts which contained only
  // static output.  Running `npm run build` followed by `next export`
  // will emit an `out` directory containing a self‑contained site.
  output: 'export',
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        // Serve the placeholder image from the assets directory.
        source: '/placeholder.svg',
        destination: '/assets/placeholder.svg',
      },
      {
        // Preserve the existing API path for project badge data.  When
        // navigating to `/api/projects/:project/badge-data` the request
        // will be forwarded to the matching JSON file.  If you choose
        // to implement a dynamic API route in `app/api`, remove this
        // rewrite so that Next.js will handle the request directly.
        source: '/api/projects/:project/badge-data',
        destination: '/api/projects/:project/badge-data.json',
      },
    ];
  },
};

module.exports = nextConfig;
