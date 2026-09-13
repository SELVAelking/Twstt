# Selva Smart Calculator — Android

هذا المشروع هو تطبيق React/Vite وتم تجهيزه ليُبنى كتطبيق Android باستخدام Capacitor.

## بناء APK تلقائياً عبر GitHub
1. ارفع المشروع إلى GitHub.
2. افتح تبويب **Actions**.
3. اختر **Build Android APK**.
4. اضغط **Run workflow**.
5. بعد انتهاء البناء افتح الـ workflow ثم **Artifacts**.
6. حمّل `selva-smart-calculator-debug-apk` وفك الضغط للحصول على `app-debug.apk`.

## بناء محلياً
```bash
npm install
npm run build
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```

الـ APK الناتج:
`android/app/build/outputs/apk/debug/app-debug.apk`

## بيانات التطبيق
- App ID: `com.selva.smartcalculator`
- App Name: `Selva Smart Calculator`
