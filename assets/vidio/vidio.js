const main_video = document.querySelector('.main-video video');
const main_video_title = document.querySelector('.main-video .title');
const video_playlist = document.querySelector('.video-playlist .videos');

let data = [
    {
        'id': 'a1',
        'title': 'Membuat sidik jari',
        'name': 'assets/vidio/vidios/sidikJari.mp4',
        'duration': '0:30',
    }

];

data.forEach((video, i) => {
    let video_element = `
                <div class="video" data-id="${video.id}">
                    <img src="./assets/vidio/play.svg" alt="">
                    <p>${i + 1 > 9 ? i + 1 : '0' + (i + 1)}. </p>
                    <h3 class="title">${video.title}</h3>
                    <p class="time">${video.duration}</p>
                </div>
    `;
    video_playlist.innerHTML += video_element;
})




let videos = document.querySelectorAll('.video');
videos[0].classList.add('active');
videos[0].querySelector('img').src = './assets/vidio/pause.svg';

videos.forEach(selected_video => {
    selected_video.onclick = () => {

        for (all_videos of videos) {
            all_videos.classList.remove('active');
            all_videos.querySelector('img').src = './assets/vidio/play.svg';

        }

        selected_video.classList.add('active');
        selected_video.querySelector('img').src = './assets/vidio/pause.svg';

        let match_video = data.find(video => video.id == selected_video.dataset.id);
        main_video.src = match_video.name;

        main_video_title.innerHTML = match_video.title;
    }
});