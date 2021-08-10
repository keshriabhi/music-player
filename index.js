console.clear();

let music = document.getElementById('player');
let playBtn = document.getElementById('play-btn');
let pauseBtn = document.getElementById('pause-btn');

let playlistSection = document.getElementById('playlist-section');

$(document).ready(()=>{
    $('#play-btn').click(()=>{
        music.play();
        playBtn.classList.toggle('hide');
        pauseBtn.classList.toggle('hide');
        //console.log(music.currentTime);
    });
    $('#pause-btn').click(()=>{
        music.pause();
        playBtn.classList.toggle('hide');
        pauseBtn.classList.toggle('hide');
    });
    music.addEventListener('timeupdate',()=>{
        $('#progress').css('width', (music.currentTime/music.duration * 100)+'%');
    })
    $.get('https://5dd1894f15bbc2001448d28e.mockapi.io/playlist',(response)=>{
        for(let i=0;i<response.length;i++){
            playlistSection.appendChild(render(response[i]));
        }
        // $('#album-cover').attr('src', response[0].albumCover);
        // $('#album-title').text(response[0].track);
        // $('#artist').text(response[0].artist);
    })
})

const render = (obj) => {
    // <div class="playlist-item">
    //     <img class="playlist-item-img" src="https://m.media-amazon.com/images/I/81mNRm3F6KL._SS500_.jpg" alt="without-you">
    //     <div class="playlist-item-list">
    //         <p class="playlist-item-title">Without You</p>
    //         <p class="playlist-item-artist">Avicii</p>
    //     </div>
    // </div>
    let playlistItem = document.createElement('div');
    playlistItem.className = 'playlist-item';

    let albumCover = document.createElement('img');
    albumCover.className = 'playlist-item-img';
    albumCover.src = obj.albumCover;
    albumCover.alt = obj.track;
    albumCover.addEventListener('click',(e)=>{
        renderInMainSection(track);
    })
    playlistItem.appendChild(albumCover);

    let playlistItemInfo = document.createElement('div');
    playlistItemInfo.className = 'playlist-item-list';
    let track = document.createElement('p');
    track.className = 'playlist-item-title';
    track.innerHTML = obj.track;
    track.addEventListener('click',(e)=>{
        renderInMainSection(track,obj);
    })
    playlistItemInfo.appendChild(track);
    
    let artist = document.createElement('p');
    artist.className = 'playlist-item-artist';
    artist.innerHTML = obj.artist;
    playlistItemInfo.appendChild(artist);

    playlistItem.appendChild(playlistItemInfo);
    
    return playlistItem;
}

const renderInMainSection = (elem, obj) =>{
    $('#album-cover').attr('src', elem.parentNode.parentNode.firstElementChild.src);
    $('#album-title').text(elem.innerHTML);
    //console.log(elem.parentNode.lastElementChild.innerHTML);
    $('#artist').text(elem.parentNode.lastElementChild.innerHTML);
    $('#music-source').attr('src',obj.file);
    console.log(music.loadeddata);
}