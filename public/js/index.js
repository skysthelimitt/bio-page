let loaded = [];
let loader = setInterval(() => {
    if(loaded.length > 0) {
        clearInterval(loader);
        document.getElementById("loading").style.display = "none";
        document.getElementById("about").style.display = "flex";
    }
})