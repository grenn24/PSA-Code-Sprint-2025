export const textToSpeech = (
	text: string,
	{
		lang = "en-US",
		pitch = 1,
		rate = 0.7,
		volume = 0.4,
	}: {
		lang?: string;
		pitch?: number;
		rate?: number;
		volume?: number;
	} = {
		lang: "en-US",
		pitch: 1,
		rate: 0.7,
		volume: 0.4,
	}
) => {
	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = lang;
	utterance.pitch = pitch;
	utterance.rate = rate;
	utterance.volume = volume;
	window.speechSynthesis.speak(utterance);
};
