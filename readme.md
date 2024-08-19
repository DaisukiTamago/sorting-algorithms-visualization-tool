# Sorting algorithms visualization tool

![](https://github.com/DaisukiTamago/docs-host/blob/master/capture.gif?raw=true)
_believe me it actually has pretty funny sounds_

### Overview

Written with Typescript, this tool makes use of [the javascript proxy feature](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to intercept all changes that a sorting algorithm causes to the original array and render them into the canvas, so you can see how the algorithms actually work and compare the differences between them, Thanks to the nature of the code, insert a new algorithm is pretty easy, you just need to paste the function in the `algorithms.ts` and add it to the exports, it will automatically appear in the select menu, and as long as this algorithm modifies the original array, you will be able to see the changes in the canvas.

### Setup

`npm run install`: To install all dependencies ( Mostly dev dependencies as the tool itself is written with vannila javascript )

`npm run start`: Initialize the development workflow, this command will start a nodemon process and every time your `src` directory folder changes, it will be transpiled by babel and the output will be at `dist` directory, this output already can be loaded by chrome as an working unpacked extension.

Remember that you must statically serve the content at the dist folder, you can easily achieve that with tools like `http-server` or `reload`
