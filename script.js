console.log("Welcome to spotify");

//initializing the variables

let audioElement= new Audio('songs/1.mp3');
let seekBar= document.getElementById("seekBar");
let masterGif= document.querySelector("#masterGif");
let masterPlay= document.getElementById("masterPlay");
let masterPrevious= document.getElementById("masterPrevious");
let masterNext= document.getElementById("masterNext");
let masterSongName = document.getElementById("masterSongName");
let songDetail= Array.from(document.getElementsByClassName("songDetail"));


let songs = [
    {songName: "Infinity", songPath: "songs/1.mp3", coverPath: "cover/1.jpg", songDuration: "03:57"},
    {songName: "Who says", songPath: "songs/2.mp3", coverPath: "cover/2.jpg", songDuration: "03:20"},
    {songName: "No Lie", songPath: "songs/3.mp3", coverPath: "cover/3.jpg", songDuration: "03:43"},
    {songName: "Let me love you", songPath: "songs/4.mp3", coverPath: "cover/4.jpg", songDuration: "03:25"},
    {songName: "I bet you think about me", songPath: "songs/5.mp3", coverPath: "cover/5.jpg", songDuration: "06:15"},
    {songName: "She got me", songPath: "songs/6.mp3", coverPath: "cover/6.jpg", songDuration: "02:39"},
    {songName: "Do vaari jatt", songPath: "songs/7.mp3", coverPath: "cover/7.jpg", songDuration: "03:22"}
]

songDetail.forEach((element, i)=> {
     element.getElementsByClassName("songTitle")[0].innerHTML=songs[i].songName;
     element.getElementsByTagName("img")[0].src=songs[i].coverPath;
     element.getElementsByClassName("songDuration")[0].innerText= songs[i].songDuration;

});
makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName("songPlay")).forEach((element)=>{
     element.classList.remove("fa-pause");
     element.classList.add("fa-play");
    })
    
}

Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
    element.addEventListener("click", (e)=>
    
    {
        if(audioElement.paused){
        makeAllPlays();
       index= parseInt(e.target.id);
       masterSongName.innerText= songs[index].songName;
       e.target.classList.remove("fa-play");
       e.target.classList.add("fa-pause");
       audioElement.currentTime=0;
       audioElement.src=`songs/${index+1}.mp3`;
       audioElement.play();
       masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        masterGif.style.opacity=1;
        }
        else
        {
        
            audioElement.pause();
            makeAllPlays();
            e.target.classList.remove("fa-pause");
            e.target.classList.add("fa-play");
            masterPlay.classList.remove("fa-pause");
            masterPlay.classList.add("fa-play");
            masterGif.style.opacity=0;
            }
    })
    
});

masterPlay.addEventListener('click', ()=>{
    
    if (audioElement.paused || audioElement.currentTime<=0){
        console.log("played");
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        masterGif.style.opacity=1;
    }
    else{
        console.log("paused");
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        masterGif.style.opacity=0;
    }
})

masterNext.addEventListener("click", ()=>{
    if(index<6){
        index+=1;
    }
    else{
        index=0;
    }
    audioElement.currentTime=0;
    audioElement.src=`songs/${index+1}.mp3`;
    masterSongName.innerText= songs[index].songName;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
     masterPlay.classList.add("fa-pause");
     masterGif.style.opacity=1;
})


masterPrevious.addEventListener("click", ()=>{
    if(index>0){
        index-=1;
    }
    else{
        index=6;
    }
    audioElement.currentTime=0;
    audioElement.src=`songs/${index+1}.mp3`;
    masterSongName.innerText= songs[index].songName;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
     masterPlay.classList.add("fa-pause");
     masterGif.style.opacity=1;
})


audioElement.addEventListener('timeupdate', ()=>{
    let progress= parseInt(audioElement.currentTime/audioElement.duration*100);
    seekBar.value= progress;
})

seekBar.addEventListener("change", ()=>{
    audioElement.currentTime= (seekBar.value*audioElement.duration/100);
})

