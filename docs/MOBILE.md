# Himalayan Sound — Mobile App (Capacitor)

Native iOS and Android apps load the production website inside a Capacitor WebView. Site updates deploy automatically; only native shell changes require a new store release.

## Architecture

- **UI**: Remote URL (`CAPACITOR_SERVER_URL` / `NEXT_PUBLIC_APP_URL/en`)
- **Native shell**: `mobile/ios` and `mobile/android`
- **Bridge**: `components/native/*` + `lib/native*.ts`
- **Payments**: Not in-app (v1). Checkout opens in system browser.

## Prerequisites

- Node.js 18+
- **iOS**: Xcode 15+ (full Xcode, not only Command Line Tools)
- **Android**: Android Studio + **JDK 21** (Capacitor 7). If Gradle reports `invalid source release: 21`, set `JAVA_HOME` to a JDK 21 install, e.g. `export JAVA_HOME=$(/usr/libexec/java_home -v 21)`.
- Apple Developer Program ($99/yr) for App Store
- Google Play Console ($25 one-time) for Play Store
- Firebase project (push notifications on Android; optional for iOS via FCM)

## Environment variables

Add to `.env.local` (web) and export before `cap sync`:

```bash
CAPACITOR_APP_ID=com.himalayansound.app
CAPACITOR_SERVER_URL=https://himalayansound.com/en
NEXT_PUBLIC_APP_URL=https://himalayansound.com
```

Local device testing:

```bash
CAPACITOR_SERVER_URL=http://YOUR_LAN_IP:3000/en
```

## Commands

```bash
# Install mobile dependencies (once)
cd mobile && npm install

# Install web Capacitor plugins (once, from repo root)
npm install

# Sync native projects after config/plugin changes
npm run mobile:sync

# Regenerate app icons and splash screens
npm run mobile:assets

# Open native IDEs
npm run mobile:ios
npm run mobile:android
```

## Development workflow

1. Start Next.js: `npm run dev`
2. Find your LAN IP: `ipconfig getifaddr en0` (macOS)
3. Sync with dev URL:
   ```bash
   CAPACITOR_SERVER_URL=http://192.168.x.x:3000/en npm run mobile:sync
   ```
4. Run on simulator/emulator or device from Xcode / Android Studio

## Production build

```bash
CAPACITOR_SERVER_URL=https://himalayansound.com/en npm run mobile:sync
```

Then archive in Xcode (iOS) or build signed AAB in Android Studio.

## Push notifications

1. Migration `scripts/supabase_scripts/push_tokens.sql` is applied on project `himalayan-sound` (or run manually on other environments)
2. Create Firebase project → add iOS and Android apps
3. Place `google-services.json` in `mobile/android/app/`
4. Upload APNs key to Firebase for iOS
5. Test from Firebase Console → Cloud Messaging

Device tokens are stored via `POST /api/push/register`.

## Deep links

- iOS: `public/.well-known/apple-app-site-association` — replace `TEAMID` with your Apple Team ID
- Android: `public/.well-known/assetlinks.json` — replace SHA-256 with release keystore fingerprint
- Entitlements: `mobile/ios/App/App/App.entitlements`

Verify:

```bash
curl https://himalayansound.com/.well-known/apple-app-site-association
curl https://himalayansound.com/.well-known/assetlinks.json
```

## App Store checklist (Apple)

- [ ] Privacy policy URL live on website
- [ ] Screenshots: 6.7" and 5.5" iPhone
- [ ] Review notes: catalog app; purchases completed in Safari (no IAP)
- [ ] Explain `UIBackgroundModes: audio` — product sound samples
- [ ] TestFlight internal testing before submission

## Google Play checklist

- [ ] Privacy policy URL
- [ ] Data safety: push token collection declared
- [ ] Signed release AAB (not debug)
- [ ] `assetlinks.json` SHA-256 from release keystore:
  ```bash
  keytool -list -v -keystore your-release.keystore -alias your-alias
  ```
- [ ] Internal testing track before production

## Signing

### Android release keystore

```bash
keytool -genkey -v -keystore himalayan-sound-release.keystore -alias himalayan -keyalg RSA -keysize 2048 -validity 10000
```

Configure in `mobile/android/app/build.gradle` (signingConfigs) — do not commit keystore or passwords.

### iOS

Use Xcode → Signing & Capabilities → Team + Automatic signing for development; Distribution certificate for App Store.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank WebView | Check `CAPACITOR_SERVER_URL` reachable from device |
| `pod install` failed | Install full Xcode, `sudo xcode-select -s /Applications/Xcode.app` |
| Checkout blocked in app | Expected — use "Continue in Browser" |
| Cart not in browser checkout | Browser session is separate from WebView; user re-adds items or completes in WebView after we enable payments |
| Push not received | Check permissions, Firebase config, `push_tokens` table |

## File map

| Path | Purpose |
|------|---------|
| `mobile/capacitor.config.ts` | App ID, server URL, plugins |
| `lib/native.ts` | `isNativeApp()` detection |
| `components/native/CapacitorBridge.tsx` | Plugin initialization |
| `components/native/NativeCheckoutGate.tsx` | Blocks in-app checkout |
| `app/api/push/register/route.ts` | Device token registration |
