import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

//IPs permitidas a acceder al servidor de la app en modo desarrollador
module.exports = {
  allowedDevOrigins: [process.env.MOBILE_DEVICE_DEV, '*.local-origin.dev'],
}

export default nextConfig;
