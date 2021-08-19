{
	let vimeoVideos = document.querySelectorAll('[data-cs-vimeo-id]');
	if(vimeoVideos.length) {
		vimeoVideos.forEach(video => {
			let id = video.dataset.csVimeoId;

			if(document.documentElement.clientWidth < 767.98) {
				if(video.dataset.csVimeoMobileId.trim()) {
					id = video.dataset.csVimeoMobileId;
				}
			}
			let player = new Vimeo.Player(video, {
				id,
				autoplay: true,
				controls: false,
				muted: true,
				loop: true,
				width: '100%',
				height: '100%',
			})
		})
	}

	let youtubeVideos = document.querySelectorAll('[data-youtube-id]');
	if (youtubeVideos.length) {
		youtubeVideos.forEach(video => {
			let videoContainer = document.createElement('div');
			video.append(videoContainer);
			let videoId = video.dataset.youtubeId;

			if(document.documentElement.clientWidth < 767.98) {
				if(video.dataset.youtubeMobileId.trim()) {
					videoId = video.dataset.youtubeMobileId;
				}
			}
			let player = new YT.Player(videoContainer, {
				height: 'auto',
				width: 'auto',
				videoId: videoId,
				playerVars: {
					autoplay: 1,
					loop: 1,
					playlist: videoId,
					controls: 0,
					enablejsapi: 1,
				},
				events: {
					onReady: (e) => {
						e.target.mute();
						e.target.playVideo();
					}
				}
			});
		})
	}



	function setMobileVideoForBanner() {
		let videos = document.querySelectorAll('[data-media-mobile]');
		if(videos.length) {
			videos.forEach(video => {
				let url = video.dataset.mediaMobile;
				Array.from(video.children).forEach(item => {
					item.setAttribute('src', url);
				})
	
				video.load();
			})
		}
	}

	if(document.documentElement.clientWidth < 767.98) {
		setMobileVideoForBanner()
	}
}