Prepare o Ambiente para developer build.
https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build&buildEnv=local

Clone o projeto;

Execute a instalação das dependências com npm install, ou yarn install;

Compile o projeto com npx expo run:android ou npx expo run:iOS;

Remover ou substituir o método useDefaultAndroidSdkVersions(): Abra o arquivo 'J:\neocare-app\node_modules\expo-splash-screen\android\build.gradle' e localize a linha que contém o método useDefaultAndroidSdkVersions(). Esse método parece obsoleto ou não compatível com a versão do Gradle/SDK que você está usando.

Para corrigir, comente ou remova a linha com esse método, ou, caso haja documentação de Expo ou Gradle sobre a nova abordagem, substitua o método.

groovy
Copiar código
// useDefaultAndroidSdkVersions() // Comente ou remova esta linha