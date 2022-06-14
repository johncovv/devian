<div id="top"></div>

[![Stargazers][stars-shield]][stars-url]
[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/johncovv/devian">
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  </a>

<h3 align="center">Devian</h3>

  <p align="center">
	A discord bot + API, created with typescript
    <br />
    <br />
    <a href="https://github.com/johncovv/devian/issues">Report Bug</a>
    ·
    <a href="https://github.com/johncovv/devian/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

### Built With

-   [Node](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Discord.js](https://discord.js.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

See prerequisites, how to install and run your own discord bot.

### Prerequisites

-   Node

    -   Go to [https://nodejs.org](https://nodejs.org)
    -   Download it in version 16 or higher

-   Yarn
    ```sh
    npm install -g yarn@latest
    ```

### Installation

1. Get a discord API Key at [Discord developers](https://discord.com/developers/applications)

    - First create a new application
    - Go to "Bot" and create a new Bot
    - Set a name to the Bot
    - Click on "Reset token" and copy the new token

2. Clone the repo

    ```sh
    git clone https://github.com/johncovv/devian
    ```

3. Install NPM packages

    ```sh
    yarn install
    ```

4. Create an environment file named `.env` on the root folder, with the content:
    ```env
    CLIENT_TOKEN=PlaceHereYourApiBotToken
    ```
5. Run the project
    ```sh
    yarn run dev
    ```
6. Invite the bot to your server
    - Go to your [discord application](https://discord.com/developers/applications)
    - Select "OAuth2" in the side menu
    - Select the "bot" option on scopes
    - Scroll to "BOT PERMISSIONS" and select "Administrator"
    - After that, enter the url generated below

<!-- TODO: create usage documentation -->
<!-- USAGE EXAMPLES -->

<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_ -->

## Issues

See the [open issues](https://github.com/johncovv/devian/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request to branch [develop](https://github.com/johncovv/devian/tree/develop)

<!-- LICENSE -->

<!-- TODO: create todo file -->
<!-- ## License

Distributed under the MIT License. See `LICENSE.txt` for more information. -->

<!-- CONTACT -->

## Contact

John Covv - [@johncovv](https://twitter.com/johncovv) - contato@johncovv.com

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/johncovv/devian.svg?style=for-the-badge
[contributors-url]: https://github.com/johncovv/devian/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/johncovv/devian.svg?style=for-the-badge
[stars-url]: https://github.com/johncovv/devian/stargazers
[issues-shield]: https://img.shields.io/github/issues/johncovv/devian.svg?style=for-the-badge
[issues-url]: https://github.com/johncovv/devian/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/johncovv
[product-screenshot]: images/screenshot.png
