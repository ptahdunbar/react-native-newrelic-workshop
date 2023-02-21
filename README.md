[![New Relic Experimental header](https://github.com/newrelic/opensource-website/raw/master/src/images/categories/Experimental.png)](https://opensource.newrelic.com/oss-category/#new-relic-experimental)

# React Native x New Relic Workshop

## Before you begin

Make sure you have the following installed:

- [NPM](https://github.com/nvm-sh/nvm) (node v16 or newer)
- [XCode](https://developer.apple.com/xcode/) (if you want to use the iOS Simulator on Mac)
- [Android Studio](https://developer.android.com/studio) (if you want to run the Android Emulator)
- [Java](https://www.java.com/download/ie_manual.jsp) (if you want to run the Android Emulator)
- [VS Code](https://code.visualstudio.com/) or another editor (preferably with TypeScript support)
- [Ruby](https://rvm.io/) (if you want to use the iOS Simulator on Mac)
- [New Relic Account](https://newrelic.com/signup?utm_source=github&utm_medium=community&utm_campaign=devrel-workshop)

#### New Relic API Keys

Follow the instructions as described [here](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#overview-keys) on how to create your first user api key.

> That's it! You're ready to workshop!

## Get API Keys
- [New Relic](https://one.newrelic.com/launcher/api-keys-ui.api-keys-launcher)
- [OpenAPI key](https://openai.com/api/)
- [Replicate api key](https://replicate.com/)

#### Clone the repo and run the app
```
git clone
make
vim apps/express/.env
vim apps/native/.env
make api
make ios
```

## React Native Workshop

### Road to Hello World
* Guided Overview: Getting started with mobile development using React Native and friends.
* Lab: Setup accounts, API Keys, git clone, and install
* Recap: What's in the repo?

### Preparing the API
* Lab: Seed database, deploy the api, access the playground.
* Recap: GraphQL AMA

### Why we need Observability (o11y)
* Guided Overview: New Relic Mobile Agent SDK Overview, What's inside, where to ask for help, how to use the SDK
* Lab: Playing with the New Relic API
* Recap: Leveraging the New Relic Platform

### React Native Core APIs
* Guided Overview: APIs to know: `<View>, <Text>, <Pressable>, <Stylesheet>, <React>`
* Lab: Building elements on the screen
* Recap: Leverage the React Native docs for more guidance.

### Rapid UI Development
* Guided Overview: Using Tamagui for rapid UI development
* Lab: Creating screens from a mockup.
* Recap: Leveraging the docs to jump-start development.

### Navigation
* Guided Overview: Intro to Expo, Expo Router, React Navigation
* Lab: Creating routes, using navigation hooks, deep linking
* Recap: Customizing the navigation and capturing screen transitions

### Custom Instrumentation
* Guided Overview: Triaging and Prioritizing Issues and Incidents
* Lab: Custom Instrumentation (capturing user's impacted)
* Lab: Querying for custom events
* Lab: Filtering Transactions

### Networking
* Guided Overview: Understanding GraphQL -- schemas, queries, mutations, variables
* Lab: Creating and using schemas, queries, mutations, variables
* Recap: Troubleshooting and Visualizing the network

### Errors and Exceptions
* Guided Overview: Capturing and recovering from crashes and exceptions
* Lab: Capturing and recovering from crashes and exceptions

### Alerts and Notifications
* Guided Overview: O11y Insights: Using Performance to signal service health
* Lab: Setting up alerts around mobile golden signals
* Recap: Solving issues and incidents before it's too late.

## Support

The code is part of New Relic experimental. The project is being developed in the open and we welcome all feedback and contributions.

## Contributing

We encourage your contributions to improve this Workshop! Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project.
If you have any questions, or to execute our corporate CLA, required if your contribution is on behalf of a company,  please drop us an email at opensource@newrelic.com.

**A note about vulnerabilities**

As noted in our [security policy](../../security/policy), New Relic is committed to the privacy and security of our customers and their data. We believe that providing coordinated disclosure by security researchers and engaging with the security community are important means to achieve our security goals.

If you believe you have found a security vulnerability in this project or any of New Relic's products or websites, we welcome and greatly appreciate you reporting it to New Relic through [HackerOne](https://hackerone.com/newrelic).

## License

This repo is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.