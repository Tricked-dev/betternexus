# Better Nexus

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Features

- automatically downloads the file
- Add a new button that instantly goes to the download

## Screenshots

![image](https://user-images.githubusercontent.com/72335827/206926868-b6bb73b7-6d1a-4557-9b8e-0171804e36ea.png)
![image](https://user-images.githubusercontent.com/72335827/206900262-a221c851-a628-48d3-9438-47f5b21111fe.png)

![image](https://user-images.githubusercontent.com/72335827/206877762-baa5e49c-a876-442e-9669-0f13563b924a.png)

mass download accepts a bunch of urls and then opens those tabs and starts the download

![image](https://user-images.githubusercontent.com/72335827/206899888-b81fbd0b-b3c7-4533-a0c4-0b5180722ca0.png)

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
