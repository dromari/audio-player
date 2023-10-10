const audioPlayer = document.querySelector('.audio-player');


const audio = document.getElementById('audio');


let songs = [
  {
    name: 'Micky',
    nameSong: 'This is the life',
    url: "assets/music/Micky - This Is The Life.mp3",
    background: 'assets/images/jpg/micky.jpg'
  },
  {
    name: 'Sia',
    nameSong: 'Unstoppable',
    url: "assets/music/Sia - Unstoppable.mp3",
    background: 'assets/images/jpg/sia.jpg'
  },
  {
    name: 'Nicolas Zimmermann',
    nameSong: 'River Flow in Your',
    url: "assets/music/Nicolas Zimmermann - River Flow in Your.mp3",
    background: 'assets/images/jpg/background.jpg'
  },
]


//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}


const playPause = document.querySelector('.play-pause');
const playBtn = document.querySelector('#play');
const pauseBtn = document.querySelector('#pause');
let isPlayed = false;

playPause.addEventListener('click', () => {
  if (isPlayed) {
    audio.pause();
    isPlayed = false;
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'inline-flex';
  } else {
    audio.play();
    isPlayed = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-flex';

  }
})

const duration = document.querySelector('.length');
const controlLine = document.querySelector('.control-line');
audio.addEventListener('loadeddata', () => {
  duration.textContent = getTimeCodeFromNum(audio.duration);
  controlLine.max = audio.duration;
  controlLine.value = audio.currentTime;
})

const progressTime = document.querySelector('.current');

setInterval(() => {
  progressTime.textContent = getTimeCodeFromNum(audio.currentTime);
  controlLine.value = audio.currentTime;
}, 1000);


controlLine.addEventListener('change', () => {
  progressTime.textContent = getTimeCodeFromNum(controlLine.value);
  audio.currentTime = controlLine.value;
})

const arrowNext = document.querySelector('.arrow-next');
const arrowPrev = document.querySelector('.arrow-prev');
const background = document.querySelector('.background');
const backgroundImg = document.querySelector('.background-img');
const nameartist = document.querySelector('.name-artist');
const namesong = document.querySelector('.name-song');

let currentSong = 0;
arrowNext.addEventListener('click', () => {
  currentSong++;
  if (currentSong >= songs.length) currentSong = 0;
  isPlayed = false;
  pauseBtn.style.display = 'none';
  playBtn.style.display = 'inline-flex';
  changeSong(currentSong);
})

arrowPrev.addEventListener('click', () => {
  currentSong--;
  if (currentSong < 0) currentSong = songs.length - 1;
  isPlayed = false;
  pauseBtn.style.display = 'none';
  playBtn.style.display = 'inline-flex';
  changeSong(currentSong);
})


function changeSong(index) {
  audio.src = songs[index].url;
  background.src = songs[index].background;
  backgroundImg.src = songs[index].background;
  nameartist.innerHTML = songs[index].name;
  namesong.innerHTML = songs[index].nameSong;
}




