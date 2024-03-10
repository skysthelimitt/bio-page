document.addEventListener("DOMContentLoaded", () => {
	const fac = new FastAverageColor();
	function loadData(first) {
		fetch("api/getLastFM/currentlyListening")
			.then((response) => response.json())
			.then((data) => {
				data = data.song;
				if (data) {
					if (data.name != document.getElementById("name").textContent) {
                        console.log(data);
						document.getElementById("name").textContent = data.name;
						document.getElementById("artist").textContent = data.artist["#text"];
						document.getElementById("image").setAttribute("src", data.image[2]["#text"]);
                        document.getElementById("song").setAttribute("href", data.url);
                        document.getElementById("status").textContent = "Currently Playing..";
						fac
							.getColorAsync(document.getElementById("image"))
							.then((color) => {
								document.getElementById("song").style.backgroundColor = `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.3)`;
								console.log(color);
								console.log(`rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.3})`);
							})
							.catch((e) => {
								console.log(e);
								document.getElementById("song").style.backgroundColor = "rgba(0,0,0,0.3)";
							});
					}
                    if(first) {
                        loaded.push("songData")
                    }
				} else {
					fetch("api/getLastFM/topSong")
						.then((response) => response.json())
						.then((data) => {
                            data = data.song;
							if (data.name != document.getElementById("name").textContent) {
								document.getElementById("name").textContent = data.name;
								document.getElementById("artist").textContent = data.artist.name;
								document.getElementById("image").setAttribute("src", data.image[2]["#text"]);
                                document.getElementById("status").textContent = "Top song from the past week..";
								fac
									.getColorAsync(document.getElementById("image"))
									.then((color) => {
										document.getElementById("song").style.backgroundColor = `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.3)`;
										console.log(color);
										console.log(`rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.3})`);
									})
									.catch((e) => {
										console.log(e);
										document.getElementById("song").style.backgroundColor = "rgba(0,0,0,0.3)";
									});
							}
                            if(first) {
                                loaded.push("songData")
                            }
						});
				}
			});
	}

	loadData(true);
	setInterval(loadData, 10000);
});
