# Welcome to my app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).This application demonstrates cryptographic operations using Ed25519 signatures and SHA-256 hashing in a React Native  environment.


#### Web Live Demo
[View on GitHub Pages](https://ais-zhao.github.io/prescreen-challenge/)

#### Android Demo
**QR code:**
![android](./prescreen-challenge/assets/images/android_qr.png)

**or open the URL below to install it:**
https://expo.dev/accounts/ais-zhao/projects/PrescreenDemo/builds/d407af11-c71e-42eb-b3d0-b781afe71b78


## Technical Stack

- TypeScript
- Expo SDK
- @noble/ed25519 for cryptography
- js-sha256 for hashing
- react-native-reanimated for animations
- Jest for testing

## Prerequisites
- Node.js 18+
- npm 9+
- Expo CLI@last


## Get started
##### 1. Clone the repo
   ```bash
   git clone https://github.com/ais-zhao/prescreen-challenge.git
   ```
##### 2. Install dependencies
   ```bash
   cd prescreen-challenge
   npm install
   ```

##### 3. Start the app

   ```bash
   npx expo start
   ```
##### 4. Use development environment
   After starting the service, enter "w" in the terminal to open a local running browser project.
   If you want to enjoy the suggested experience quickly on Android or iOS devices, please first install the Expo Go App, and then scan the QR code displayed on the terminal.

## Run uint test
```bash
npm test
```

## Deploy

##### Web 

1. To deploy the project, configure it to a subdomain with the `baseUrl` property in **app.json**. Set its value to the string `/repo-name`. like this:
```bash
{
  "expo": {
    "experiments": {
      ...
      "baseUrl": "/prescreen-challenge"
      ...
    }
  }
}
```
2. Modify the `scripts` in the **package.json** file by adding `predeploy` and `deploy` scripts. Each has its own value:
```bash
"scripts": {
 ... 
  "deploy": "gh-pages --nojekyll -d dist",
  "predeploy": "expo export -p web"
}
```
3. To generate a production build of the web app and deploy it to GitHub Pages, run the following command:
```bash
npm run deploy
```
4. Now that the web app is published to the `gh-pages` branch, configure GitHub Pages to serve the app from that branch.

- Navigate to the **Settings** tab of the GitHub repository.
- Scroll down to **Pages** section.
- Ensure the **Source** is set to **Deploy from a branch**.
- Under **Branch** section, select **gh-pages** and the **root** directory.
- Click **Save**.

5. The web deployment also uses **GitHub Action** workflow, which automatically deploys to **GitHub Pages** when a **push** event occurs in the **main** branch


##### Android

1. Run the command,to install **EAS CLI**
```bash
npm install -g eas-cli
```
2. Log in to your **Expo** account. If you don't have one, please [register](https://expo.dev/signup) first.
```bash
eas login
```
3. Configure the project
```bash
eas build:configure
```
4. Run a build
```bash
eas build --platform android --profile preview
```

Running this command will enable the build of the **preview** version.The build version is stored in the Expo cloud. Since **Apple** devices require certificates for installation, only the Android version was generated. 
