console.log("Welcome to my clone spotify");
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let gif = document.getElementById("gif");
let songs = [
  { songName: "Chanda-Hain-Tu-Mera-Suraj-Hain-Tu", filePath: "Asong11.mp3", cover: "ACover11.jpg" },
  { songName: "I-Love-you-Dady", filePath: "Asong2.mp3", cover: "ACover2.jpg" },
  { songName: "Jadu-Hain-Nasha-Hain", filePath: "Asong3.mp3", cover: "ACover3.jpg" },
  { songName: "Ma-O-Meri-Ma", filePath: "Asong4.mp3", cover: "ACover4.jpg" },
  { songName: "Jare-Jare-Ure-Ja-Pakhi", filePath: "Asong5.mp3", cover: "ACover5.jpg" },
  { songName: "Sei-Tara-Vora-Rate", filePath: "Asong6.mp3", cover: "ACover6.jpg" },
  { songName: "Dol-Dol-Doloni", filePath: "Asong7.mp3", cover: "ACover7.jpg" },
  { songName: "Ek-Jonome-Valobeshe-Vorbe-Na-Ai-Mon", filePath: "Asong8.mp3", cover: "ACover8.jpg" },
  { songName: "Tere-Darpar-Sanam-Chale-Aayain", filePath: "Asong9.mp3", cover: "ACover9.jpg" },
  { songName: "Alada-Alada", filePath: "Asong9.mp3", cover: "ACover10.jpg" },
  
];

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove("fa-play-circle");
    e.target.classList.add("fa-pause-circle");
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    document.querySelector(".songInfo img").src = songs[songIndex].cover;
    document.querySelector(".songInfo span").textContent = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  });
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});
audioElement.addEventListener("timeupdate", () => {
  console.log('timeupdate');
  const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("input", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});




document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSongAtIndex(songIndex);
});

document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSongAtIndex(songIndex);
});

function playSongAtIndex(index) {
  if (index < 0 || index >= songs.length) {
    return;
  }

  makeAllPlays();
  let element = document.getElementById(index.toString());
  element.classList.remove("fa-play-circle");
  element.classList.add("fa-pause-circle");
  masterSongName.innerText = songs[index].songName;
  audioElement.src = songs[index].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;

  document.querySelector(".songInfo img").src = songs[index].cover;
  document.querySelector(".songInfo span").textContent = songs[index].songName;
}
const volumeControl = document.getElementById("volumeControl");
volumeControl.addEventListener("input", () => {
  audioElement.volume = volumeControl.value;
});