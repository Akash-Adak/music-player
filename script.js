const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

const playlistEl = document.getElementById('Playlist');

let isPlaying = false;
let index = 0;

const songDataBase = [
  
  {
    songSrc: "music2.mp3",
  
    title: "Pehele Bhi Main",
    artist: "Raj Shekhar and Vishal Mishra",
    imgSrc: "./images/img2.jpg" },
  {
    songSrc: "music1.mp3",
    title: "Aaj Ki Rat",
    artist: " Madhubanti Bagchi and Divya Kumar",
    imgSrc: "./images/img1.jpg" },
 
  {
    songSrc: "music4.mp3",
    title: "Sanam Teri Kasam",
    artist: "Ankit Tiwari and Palak Muchhal",
    imgSrc: "./images/img4.jpg" },
  {
    songSrc: "music5.mp3",
    title: "Chal Tere Ishq Mein",
    artist: "Vishal Mishra",
    imgSrc: "./images/img5.jpg"  },
  {
    songSrc: "music6.mp3",
    title: "Mere Mehboob",
    artist: "Sachet Tandon and Shilpa Rao",
    imgSrc: "./images/img6.jpg"
  },
    {
    songSrc: "music7.mp3",
    title: "Afreen Afreen",
    artist: "Momina Mustehsan and Rahat Fateh Ali Khan",
    imgSrc: "./images/img7.jpg"  },
 
  {
    songSrc: "music9.mp3",
    title: " O Sajni Re",
    artist: "Arijit Singh",
    imgSrc: "./images/img9.jpg"  },
  {
    songSrc: "music10.mp3",
    title: "Aasa kooda",
    artist: "ai Abhyankkar and Sai Smriti",
    imgSrc: "./images/img10.jpg"  },
  {
    songSrc: "music11.mp3",
    title: "Talab Hai Tu ",
    artist: " Arijit Singh",
    imgSrc: "./images/img11.jpg"  },
  {
    songSrc: "music12.mp3",
    title: "Thara Paisa Thari Daulat",
    artist: "Dharmendar",
    imgSrc: "./images/img12.jpg"  },
  {
    songSrc: "music13.mp3",
    title: "Ami Je Tomar 3.0",
    artist: "Shreya Ghoshal, Amaal Mallik, Sameer, and Pritam",
   imgSrc: "./images/img13.jpg"
   },

];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
  highlightPlayingSong(index);
};
audio.addEventListener("ended", () => {
  loadMusic(index++);
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  index = (index + 1) % songDataBase.length;
   loadMusic(index); 
   play();
});
previousButton.addEventListener("click", () => {
  index = (index - 1 + songDataBase.length) % songDataBase.length; 
  loadMusic(index); 
   play();
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  highlightPlayingSong(index);
};


const pause = () => {
  const items = playlistEl.getElementsByTagName('li');
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  items[index].classList.remove('playing');

};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

function populatePlaylist() {
    songDataBase.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} -- ${song.artist}`;
     
        li.id=`song-${index}`;
          
        li.addEventListener('click', () => {
          playSongList(li.id);
        });
        playlistEl.appendChild(li);
  
    });
}

function playSongList(songId){

  const idx=parseInt(songId.split('-')[1],10);
  index=idx;
  loadMusic();
  play();
}
function highlightPlayingSong(index) {
    const items = playlistEl.getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
        if (i === index) {
            items[i].classList.add('playing');
        } else {
            items[i].classList.remove('playing');
        }
    }
}

let isShuffling = false;
const shuffleButton = document.querySelector("#Shuffle");
shuffleButton.addEventListener("click", () => {
    isShuffling = !isShuffling;
    shuffleButton.classList.toggle("active", isShuffling);
});

audio.addEventListener("ended", () => {

        if (isShuffling) {
            index = Math.floor(Math.random() * songDataBase.length);
        } else {
            index = (index + 1) % songDataBase.length;
        }
        loadMusic(index);
        play();
    
});


// Initialize the player
loadMusic(index);
populatePlaylist();
