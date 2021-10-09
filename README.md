## :tw-1f3af: Tecnologias

- [JavaScript;](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Typescript;](https://www.typescriptlang.org/)
- [React Native;](https://reactnative.dev/)
- [React Hooks;](https://pt-br.reactjs.org/docs/hooks-intro.html)
- [Styled Components;](https://styled-components.com/)
- [Git como ferramenta de versionamento;](https://git-scm.com/doc)
- [Yarn;](https://classic.yarnpkg.com/en/docs/)
- [Android Studio](https://git-scm.com/doc) para configurações do emulador Android;
- [VsCode](https://code.visualstudio.com/) como IDE de desenvolvimento;
- [Reactotron](https://github.com/infinitered/reactotron) para debug;

## :tw-1f4f1:AMBIENTE REACT NATIVE

|     Windows      |      Linux       |
| :--------------: | :--------------: |
|      NodeJS      |      NodeJS      |
|      JDK 8       |      JDK 8       |
|   SDK Android    |   SDK Android    |
| React Native CLI | React Native CLI |
|   SDK Android    |   SDK Android    |
|    Chocolatey    |        -         |
|        -         |       CURL       |
|      Python      |        -         |
|        -         |     Watchman     |

Com o intuito de não extender, nem deixar o tutoriol repetitivo, separamos um artigo da [Rocketseat](https://rocketseat.com.br/), para auxiliar na instalação de todo o ambiente React Native citado.

## :tw-1f4f1: CONFIGURAÇÃO ANDROID STUDIO

Normalmente, só é necessário o download e configuração do SDK do Android, mas para algumas funcionalidades específicas e principalmente emuladores, é necessário instalar a IDE do Android.

Para isso, acesse o tutorial de instalação do [Android Studio](https://developer.android.com/studio) para o seu sistema operacional.

Após a instalação, é necessário a [criação do emuladador](https://developer.android.com/studio/run/managing-avds?hl=pt-br&authuser=1).

## :tw-1f527: BRANCHES

- [**develop**](https://github.com/thiago-cmont/pokeApp.git): branch que servirá de base para a criação de novas funcionalidades.

**Todas as branches de feature devem partir da develop.**

## :tw-1f4bb: SCRIPTS DO PROJETO

Todos os scripts podem ser vistos no arquivo _package.json_, na raiz do projeto.
Algumas delas:

**android**: "npx cross-env ENVFILE=.env.dev react-native run-android",
**android:release**: "cd android && npx cross-env ENVFILE=.env.dev ./gradlew app:assembleRelease",
**android:release:install**: "cd android && adb install app/build/outputs/apk/release/app-release.apk,
**android:debug**: "cd android && npx cross-env ENVFILE=.env.dev ./gradlew app:assembleDebug",
**android:gclean**: "cd android && npx cross-env ENVFILE=.env.dev ./gradlew clean",
**android:clean**: "adb shell pm clear com.pokeapp",
**ios**: "ENVFILE=.env.dev react-native run-ios",
**ios:release**: "ENVFILE=.env.dev react-native run-ios --configuration=release",
**ios:xcclean**: "cd ios && ENVFILE=.env.dev xcodebuild clean -scheme pokeapp -workspace pokeapp.xcworkspace",
**ios:pod**: "cd ios && npx pod-install",
**start**: "react-native start",
**test**: "jest --watch --coverage=false --changedSince=origin/develop",
**testDebug**: "jest -o --watch --coverage=false",
**testFinal**: "jest",
**format**: "prettier --write",
**lint**: "eslint --fix"

## :tw-1f389: RODANDO O App!

- Abra o projeto no VsCode

- Entre na branch de desenvolvimento:
  `$ git checkout develop`

- Baixe as dependências do projeto:
  `$ yarn`

- Configure o Reactotron:

  - Na raiz do projeto, no arquivo **.env.dev**, e apontar o seu endereço de IP para a variável **REACTOTRON_IP=**
    Exemplo: `REACTOTRON_IP=SeuIpAqui`

- Execute o emulador previamente configurado ou [utilize um dispositivo fisíco conectado via USB](https://react-native.rocketseat.dev/usb/android)

- Entre na raiz do seu projeto via terminal execute o comando :
  `$ yarn android:dev`
