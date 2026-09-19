/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for Firebase Hosting (writes the site to ./out)
  output: "export",
  images: { unoptimized: true },
};
export default nextConfig;
