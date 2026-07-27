import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.aitoolkit.app",
  appName: "AI Toolkit",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0f172a",
      showSpinner: true,
      androidSpinnerStyle: "large",
      spinnerColor: "#7c3aed",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
