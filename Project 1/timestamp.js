// Make sure all elements are loading before initialization
document.addEventListener("DOMContentLoaded", function() {
    const song = document.getElementById("song");
    const playPause = document.getElementById("playPause");
    const rewind = document.getElementById("rewind");
    const forward = document.getElementById("forward");
    const timestampContainer = document.getElementById("timestampContainer");
    const addTS = document.getElementById("addTS");
    const removeTS = document.getElementById("removeTS");

    // Default timestamps
    let timestamps = [
        { title: "Intro", start: 0 },
        { title: "Verse 1", start: 55 },
        { title: "Verse 2", start: 106 },
        { title: "Solo", start: 157 },
        { title: "Verse 3", start: 185 },
        { title: "Bridge", start: 248 },
        { title: "Outro", start: 280 },
    ];

    let currentTS = null;
    let stopTime = null;
    playPause.innerHTML = "<i class=\"fa-solid fa-play\"></i>";
    song.currentTime = 0;

    // Updates the scrollbar for changes
    function initTimeStamps() {
        timestampContainer.innerHTML = "";
        timestamps.forEach((ts, i) => {
            const btn = document.createElement("button");
            btn.textContent = ts.title;
            btn.className = "timestamps";

            btn.addEventListener("click", function() {
                const activeBtn = timestampContainer.querySelector("button.active");
                if (activeBtn) {activeBtn.classList.remove("active")};
                currentTS = i;
                song.currentTime = ts.start;
                if(i != timestamps.length) {stopTime = timestamps[i + 1].start;}
                else{ stopTime = null;}
                song.play();
                btn.classList.add("active");
            });
            timestampContainer.appendChild(btn);
        });
    }

    // Initial call
    initTimeStamps();

    // Button Controls //

    // Play/Pause
    playPause.addEventListener("click", function() {
        if(song.paused){ 
            song.play();
            playPause.innerHTML = "<i class=\"fa-solid fa-pause\"></i>";
        }
        else{ 
            song.pause();
            playPause.innerHTML = "<i class=\"fa-solid fa-play\"></i>";
        }
    });

    // Rewind 5 seconds; has checks to not go below 0
    rewind.addEventListener("click", function() {
        song.currentTime = (song.currentTime - 5) < 0 ? 0 : (song.currentTime - 5);
    });
    
    // Skip 5 seconds; has checks to make sure it doesn't go over duration
    forward.addEventListener("click", function() {
        song.currentTime = (song.currentTime + 5) > song.duration ? song.duration : (song.currentTime + 5);
    });

    // Adds a timestamp button
    addTS.addEventListener("click", function() {
        const newTitle = prompt("Title Name:");
        const newStart = song.currentTime;
        let added = false;

        timestamps.forEach(ts => {
            if( newStart < ts.start && !added){ 
                timestamps.push({ title: newTitle, start: newStart });
                timestamps.sort((a,b) => a.start - b.start);
                added = true;
                currentTS += 1;
             }
        });
        
        initTimeStamps();
        
    });

    // Removes the selected timestamp. The song will no longer stop before the next segment
    removeTS.addEventListener("click", function() {
        
        if (currentTS !== 0) {
            timestamps.splice(currentTS, 1);
            currentTS -= 1;
            stopTime = null;
        }
        else{
            alert("Unable to remove the first timestamp");
            return
        }
        initTimeStamps();
    });

    // Acts as a constant for when the audio is playing to update
    // to update the play/pause button in case user uses the built in control
    // Also acts as the checker for stopping the audio at the ideal time
    song.addEventListener("timeupdate", function() {
        if(song.paused){
            playPause.innerHTML = "<i class=\"fa-solid fa-play\"></i>";
        }
        else{
            playPause.innerHTML = "<i class=\"fa-solid fa-pause\"></i>";
        }
        if(stopTime != null && song.currentTime >= stopTime){
            if(song.currentTime > stopTime){
                song.pause();
                playPause.innerHTML = "<i class=\"fa-solid fa-play\"></i>";
                
            }
        }
    });

    // Enables Scrollwheel filter
    timestampContainer.addEventListener("wheel", function(e) {
        e.preventDefault();
        this.scrollLeft += e.deltaY;
    });

    // Enables keys for more convenient controls
    document.addEventListener("keydown", function(e) {
        switch (e.code) {
            case "Space":
                e.preventDefault(); 
                if(song.paused){ 
                    song.play();
                    playPause.innerHTML = "<i class=\"fa-solid fa-pause\"></i>";
                }
                else{ 
                    song.pause();
                    playPause.innerHTML = "<i class=\"fa-solid fa-play\"></i>";
                }
                break;
            case "ArrowLeft":
                e.preventDefault(); 
                song.currentTime = (song.currentTime - 5) < 0 ? 0 : (song.currentTime - 5);
                break;
            case "ArrowRight":
                e.preventDefault();
                song.currentTime = (song.currentTime + 5) > song.duration ? song.duration : (song.currentTime + 5);
                break;
            }
    });

});