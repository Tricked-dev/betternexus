
<!-- inspired by ublock's readme thanks! https://github.com/gorhill/uBlock/blob/master/README.md?plain=1 -->

***

<h1 align="center">
<sub>
<img src="https://github.com/tricked-dev/betternexus/blob/master/assets/icon.svg?raw=true" height="38" width="38">
</sub>
Betternexus
</h1>

***

<p align="center">
<a href="https://addons.mozilla.org/addon/betternexus/"><img src="https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png" alt="Get Better Nexus for Firefox"></a>
<!-- <a href="https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm"><img src="https://user-images.githubusercontent.com/585534/107280622-91a8ea80-6a26-11eb-8d07-77c548b28665.png" alt="Get uBlock Origin for Chromium"></a>
<a href="https://microsoftedge.microsoft.com/addons/detail/ublock-origin/odfafepnkmbhccpbejgmiehpchacaeak"><img src="https://user-images.githubusercontent.com/585534/107280673-a5ece780-6a26-11eb-9cc7-9fa9f9f81180.png" alt="Get uBlock Origin for Microsoft Edge"></a>
<a href="https://addons.opera.com/extensions/details/ublock/"><img src="https://user-images.githubusercontent.com/585534/107280692-ac7b5f00-6a26-11eb-85c7-088926504452.png" alt="Get uBlock Origin for Opera"></a> -->
</p>

***

## Features

- automatically downloads the file
- Add a new button that instantly goes to the download
- Download buttons per page

## Screenshots

See the [Firefox page][Mozilla]

## Todo

somehow skip the waiting time

```html
<script>
  function getSetTimeout() {
    const frame = document.createElement("iframe")
    document.body.appendChild(frame)
    const newTimeout = frame.contentWindow.setTimeout.bind(self)
    document.body.removeChild(frame)
    return newTimeout
  }
  $(function () {
    //overwrite this somehow
    const oaheteobsumliekwaetrrtrmnteotatcd = getSetTimeout()
  })
</script>
```

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
node build.js
```

The extensions will be built in the `dist` directory.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/workflows/submit) and you should be on your way for automated submission!

## License

[MPL2][./LICENSE]

<!----------------------------------------------------------------------------->

[Mozilla]: https://addons.mozilla.org/addon/betternexus/
<!-- [Edge]: https://microsoftedge.microsoft.com/addons/detail/betternexus/odfafepnkmbhccpbejgmiehpchacaeak -->
