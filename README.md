# Create Line Card
https://soon-line-login.herokuapp.com/

Create your Line profile card by login with Line and save your card to png file.

![image](https://user-images.githubusercontent.com/57614928/138137069-d30bf5b0-eaad-43e3-8926-d38293be31a6.png)







---------------------------------------------
## Errror that found under development


### Refresh Runtime Error

Under heroku app> settings >Webpack

Add this https://github.com/mars/create-react-app-buildpack
And on next push or deploying again will make it work.

### Heap at Heroku

https://tailwindcss.com/docs/just-in-time-mode

Add "jit" in tailwind.config.js

### Image not save to jpg

html2canvas( document.querySelector(".preview_area"), { logging: true, letterRendering: 1, // allowTaint: false useCORS: true } ).then(canvas => { })
