target = "desktop"
let viewport = document.querySelector("meta[name=viewport]");

if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/IEMobile/i)){
    target = "phone"
}

const content = target=="phone"?
     'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=no'
    :'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
viewport.setAttribute('content', content);



fetch("/log", {
  method: "POST",
  body: JSON.stringify({
    message: target,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));