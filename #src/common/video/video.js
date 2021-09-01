{
	let vimeoVideos = document.querySelectorAll('[data-cs-vimeo-id]');
	if(vimeoVideos.length) {
		vimeoVideos.forEach(async video => {
			let id = video.dataset.csVimeoId;
			let img = video.querySelector('img');
			
			if(document.documentElement.clientWidth < 992) {
				if(video.dataset.csVimeoMobileId.trim()) {
					id = video.dataset.csVimeoMobileId;
				}
			}
			// let player = await new Vimeo.Player(video, {
			// 	id,
			// 	autoplay: true,
			// 	controls: false,
			// 	muted: true,
			// 	loop: true,
			// })
			video.insertAdjacentHTML('beforeend', `<iframe src="https://player.vimeo.com/video/${id}?muted=1&amp;autoplay=1&amp;controls=0&amp;loop=1&amp;background=1&amp"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay;" ></iframe>`);
			let iframe = video.querySelector('iframe')
			iframe.onload = () => {
				if(img) {
					img.style.opacity = 0;
				}
			}

			setCoverVideoIframe(iframe, video);

		})
	}

	function setCoverVideoIframe(iframe, parent) {
		if(parent.clientWidth > 1282) {
			iframe.style.width = '100%';
			iframe.style.height = parent.clientWidth * 0.57 + 'px';
		} else if(parent.clientWidth < 992) {
			if((parent.clientWidth / parent.clientHeight * 100) < 79.929) {
				iframe.style.width = parent.clientHeight * 0.8 + 'px';
				iframe.style.height = '100%';
			} else {
				iframe.style.width = '100%';
				iframe.style.height = parent.clientWidth * 1.25 + 'px';
			}
		} else {
			iframe.style.width = parent.clientHeight * 1.8 + 'px';
			iframe.style.height = '100%';
		}
		window.addEventListener('resize', () => {
			if(parent.clientWidth > 1282) {
				iframe.style.width = '100%';
				iframe.style.height = parent.clientWidth * 0.57 + 'px';
			} else if(parent.clientWidth < 992) {
				if((parent.clientWidth / parent.clientHeight * 100) < 79.929) {
					iframe.style.width = parent.clientHeight * 0.8 + 'px';
					iframe.style.height = '100%';
				} else {
					iframe.style.width = '100%';
					iframe.style.height = parent.clientWidth * 1.25 + 'px';
				}
			} else {
				iframe.style.width = parent.clientHeight * 1.8 + 'px';
				iframe.style.height = '100%';
			}
		})
	}
	

	let youtubeVideos = document.querySelectorAll('[data-youtube-id]');
	if (youtubeVideos.length) {
		youtubeVideos.forEach(video => {
			let videoContainer = document.createElement('div');
			video.append(videoContainer);
			let videoId = video.dataset.youtubeId;
			let img = video.querySelector('img');

			if(document.documentElement.clientWidth < 992) {
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

						if(img) {
							img.style.opacity = 0;
						}
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

	if(document.documentElement.clientWidth < 992) {
		setMobileVideoForBanner()
	}

	let fancyboxYoutubeLinks = document.querySelectorAll('[data-fancybox-youtube]');
	if(fancyboxYoutubeLinks.length) {
		fancyboxYoutubeLinks.forEach(link => {
			let id = link.getAttribute('href');
			if(/https:\/\/www\.youtube\.com/i.test(id)) return;
			link.setAttribute('href', `https://www.youtube.com/watch?v=${id}`)
		})
	}

	let fancyboxVimeoLinks = document.querySelectorAll('[data-fancybox-vimeo]');
	if(fancyboxVimeoLinks.length) {
		fancyboxVimeoLinks.forEach(link => {
			let id = link.getAttribute('href');
			if(/https:\/\/vimeo\.com\//i.test(id)) return;
			link.setAttribute('href', `https://vimeo.com/${id}`)
		})
	}
}