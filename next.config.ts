/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Needed for GitHub Pages static export

  images: {
    domains: ['wallpapercave.com', 'm.media-amazon.com'],
    unoptimized: true, // Disable Next.js image optimization for static export
  },

  // Uncomment and set if your site is under a repo path
  // basePath: '/your-repo-name',
};

module.exports = nextConfig;
