### Refresh Runtime Error

Under heroku app> settings >Webpack

Add this https://github.com/mars/create-react-app-buildpack
And on next push or deploying again will make it work.

### Heap at Heroku

https://tailwindcss.com/docs/just-in-time-mode

Add "jit" in tailwind.config.js

### Image not save to jpg

html2canvas( document.querySelector(".preview_area"), { logging: true, letterRendering: 1, // allowTaint: false useCORS: true } ).then(canvas => { })
