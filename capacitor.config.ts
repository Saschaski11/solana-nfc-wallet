
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5923a17ea7894891a10970dea7cc188c',
  appName: 'solana-nfc-wallet',
  webDir: 'dist',
  server: {
    url: "https://5923a17e-a789-4891-a109-70dea7cc188c.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1e293b",
      showSpinner: true,
      spinnerColor: "#ffffff",
    },
  },
};

export default config;
