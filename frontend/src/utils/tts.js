export function speak(text, lang = "en-IN") {
  if (!text) return;

  // Stop any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.lang = lang;

  const voices = window.speechSynthesis.getVoices();

  // 🔎 Try to find best matching voice
  let selectedVoice = null;

  if (lang === "hi-IN") {
    selectedVoice = voices.find(v => v.lang === "hi-IN");
  } 
  else if (lang === "mr-IN") {
    // Marathi voices are rare → fallback to Hindi
    selectedVoice =
      voices.find(v => v.lang === "mr-IN") ||
      voices.find(v => v.lang === "hi-IN");
  } 
  else {
    selectedVoice = voices.find(v => v.lang === "en-IN") ||
                    voices.find(v => v.lang.startsWith("en"));
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  window.speechSynthesis.speak(utterance);
}
