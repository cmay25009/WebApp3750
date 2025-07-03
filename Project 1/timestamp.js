document.addEventListener("DOMContentLoaded", function() {
    const song = document.getElementById("song");
    const playPause = document.getElementById("playPause");
    const rewind = document.getElementById("rewind");
    const forward = document.getElementById("forward");
    const timestampContainer = document.getElementById("timestampContainer");
    const addTS = document.getElementById("addTS");
    const removeTS = document.getElementById("removeTS");
    const volume = document.getElementById("volumeContainer");

    let timestamps = [
        { title: "Intro", start: 0 },
        { title: "Verse 1", start: 55 },
        { title: "Verse 2", start: 106 },
        { title: "Solo", start: 157 },
        { title: "Verse 3", start: 185 },
        { title: "Bridge", start: 248 },
        { title: "Outro", start: 280 },
    ];

    let currentSection = null;

    function initTimeStamps() {
        timestampContainer.innerHTML = "";
        timestamps.forEach((ts, i) => {
            const btn = document.createElement("button");
            btn.textContent = ts.title;
            btn.className = "timestamps";

            btn.addEventListener("click", function() {
                currentSection = i;
                song.currentTime = ts.start;
                song.play();
            });
            timestampContainer.appendChild(btn);
        });

        playPause.innerHTML = "<i class=\"fa-solid fa-play\"></i>";
        song.currentTime = 0;

    }

    initTimeStamps();

    // Button Controls

    playPause.addEventListener("click", function() {
        if(song.paused){ 
            song.play();
            playPause.innerHTML = "<i class=\"fa-solid fa-pause\"></i>";
        }
        else{ 
            song.pause();
            playPause.innerHTML = "<i class=\"fa-solid fa-play\"></i>";
        }
    })

    rewind.addEventListener("click", function() {
        song.currentTime = (song.currentTime - 5) < 0 ? 0 : (song.currentTime - 5);
    });
    
    forward.addEventListener("click", function() {
        song.currentTime = (song.currentTime + 5) > song.duration ? song.duration : (song.currentTime + 5);
    });

    addTS.addEventListener("click", function() {
        const newTitle = prompt("Title Name:");
        const newStart = song.currentTime;
        let added = false;

        timestamps.forEach((ts, i) => {
            if( newStart < ts.start && !added){ 
                timestamps.push({ title: newTitle, start: newStart });
                timestamps.sort((a,b) => a.start - b.start);
                added = true;
             }
        })
        
        initTimeStamps();
        
    });

    removeTS.addEventListener("click", function() {
        if (currentSection !== null) {
            timestamps.splice(currentSection, 1);
            currentSection = null;
            renderPlaylist();
        }
        initTimeStamps();
    });

    volume.addEventListener("input", function() { song.volume = volume.value; });

    timestampContainer.addEventListener("wheel", function(e) {
        e.preventDefault();
        this.scrollLeft += e.deltaY;
    })


});