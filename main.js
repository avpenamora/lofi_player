let album_art = document.querySelector(".album-art");
let track_name = document.querySelector(".title");

let playpause_btn = document.querySelector(".play-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-dur");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
  {
      title : "A Trip",
      image : "images/1.png",
      path : "music/a_trip.mp3"
  },
  {
      title : "Racing",
      image : "images/2.png",
      path : "music/racing.mp3"
  },
  {
      title : "Spin",
      image : "images/3.png",
      path : "music/spin.mp3"
  },
  {
      title : "Wishing Well",
      image : "images/4.png",
      path : "music/wishing_well.mp3"
  }
];

function resetval(){
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function loadTrack(track_index){
  clearInterval(updateTimer);
  resetval();

  curr_track.src = track_list[track_index].path;
  curr_track.load();

  album_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].title;

  updateTimer = setInterval(seekUpdate, 1000);

  curr_track.addEventListener("ended", go_next);
}

function go_play(){
  if(isPlaying) pauseTrack();
  else playTrack();
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML='<i class="fa fa-play-circle fa-2x"></i>'
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>'
}

function go_next(){
  if(track_index < track_list.length -1)
    track_index += 1;
  else track_index = 0;

  loadTrack(track_index);
  playTrack();
}

function go_prev(){
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length - 1;

  loadTrack(track_index);
  playTrack();
}

function seek(){
  let seek = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVol() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate(){
  let seekPosition = 0;

  if(!isNaN(curr_track.duration)){
    seekPosition = curr_track.currentTime * (100/curr_track.duration);

    seek_slider.value = seekPosition;

    let curmin = Math.floor(curr_track.currentTime/60);
    let cursec = Math.floor(curr_track.currentTime - curmin * 60);
    let durmin = Math.floor(curr_track.duration / 60);
    let dursec = Math.floor(curr_track.duration - durmin * 60);

    if(cursec < 10) {cursec = "0" + cursec; }
    if(dursec < 10) {dursec = "0" + dursec; }
    if(curmin < 10) {curmin = "0" + curmin; }
    if(durmin < 10) {durmin = "0" + durmin; }

    curr_time.textContent = curmin + ":" + cursec;
    total_duration.textContent = durmin + ":" + dursec;
  }
}

function go_track(number){
  if(track_index != number){
    track_index = number;
    loadTrack(track_index);
    playTrack();
  }
}

loadTrack(track_index);
