import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.selva.smartcalculator',
  appName: 'Selva Smart Calculator',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    backgroundColor: '#020617'
  }
};

export default config;
