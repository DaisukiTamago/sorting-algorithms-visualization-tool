const context = new AudioContext();
const oscilator = context.createOscillator();
const volume = context.createGain();

const minFrequency = 120;
const maxFrequency = 1212;

window.onclick = () => {
  oscilator.type = "triangle";
  oscilator.connect(volume);
  volume.connect(context.destination);
  oscilator.start(0);
};

function getFrenquency(value: number, listLength: number) {
  let soundFrenquency = (maxFrequency / listLength) * value;

  if (soundFrenquency > maxFrequency) {
    soundFrenquency = maxFrequency;
  }
  if (soundFrenquency < minFrequency) {
    soundFrenquency = minFrequency;
  }

  return soundFrenquency;
}

function beep(value: number, listLength: number) {
  const soundFrenquency = getFrenquency(value, listLength);

  oscilator.frequency.value = soundFrenquency;
  volume.gain.setValueAtTime(0.2, context.currentTime);
  volume.gain.setTargetAtTime(0, context.currentTime, 0.1);
  //volume.gain.setValueAtTime(0.000001, context.currentTime + 1)
}

function startBeep(value: number, listLength: number) {
  let soundFrenquency = (maxFrequency / listLength) * value;
  if (soundFrenquency > maxFrequency) {
    soundFrenquency = maxFrequency;
  }
  if (soundFrenquency < minFrequency) {
    soundFrenquency = minFrequency;
  }

  volume.gain.value = 0.3;
  oscilator.frequency.value = soundFrenquency;
  //volume.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1)
}

function endBeep() {
  //volume.gain.setValueAtTime(volume.gain.value, context.currentTime);
  volume.gain.linearRampToValueAtTime(0.00001, context.currentTime);
  //volume.gain.value = 0
  //volume.gain.setTargetAtTime(0, context.currentTime, 0.015);
  //volume.disconnect(context.destination)
}

export { startBeep, endBeep, beep };
