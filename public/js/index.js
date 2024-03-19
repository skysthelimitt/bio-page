let loaded = [];
let loader = setInterval(() => {
    if(loaded.length > 0) {
        clearInterval(loader);
        document.getElementById("loading").style.opacity = "0";
        document.getElementById("about").style.opacity = "100";
    }
})