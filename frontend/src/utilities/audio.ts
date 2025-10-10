export const fadeOutAudio = (
	audio: HTMLAudioElement | null,
	duration = 1000,
	targetVolume = 0
) => {
	if (!audio) return;

	const steps = 20;
	const stepTime = duration / steps;
	const volumeStep = (audio.volume - targetVolume) / steps;

	const fadeInterval = setInterval(() => {
		if (!audio) return;

		audio.volume = Math.max(targetVolume, audio.volume - volumeStep);

		if (audio.volume <= targetVolume + 0.001) {
			clearInterval(fadeInterval);
			audio.pause();
		}
	}, stepTime);
};

export const pauseAudio = (audio: HTMLAudioElement | null) => {
    if (audio) audio.pause();
};

export const playAudio = (audio: HTMLAudioElement | null) => {
    if (audio) audio.play();
};