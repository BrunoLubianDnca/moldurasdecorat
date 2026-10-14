import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite a prévia local no endereço de rede usado nesta estação.
  allowedDevOrigins: ["172.20.192.1"],
};

export default nextConfig;
