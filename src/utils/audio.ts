/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Safe browser audio synthesizer utilizing Web Audio API
class AudioSynth {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    // Resume context if suspended (common browser restriction)
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {
      console.warn('Audio check blocked:', e);
    }
  }

  playCorrect() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Play ascending sweet chime: C5 -> E5 -> G5 -> C6
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0.1, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.08 + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.16);
      });
    } catch (e) {
      console.warn('Audio check blocked:', e);
    }
  }

  playIncorrect() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Low sliding buzz downward
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.25);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.26);
    } catch (e) {
      console.warn('Audio check blocked:', e);
    }
  }

  playLevelComplete() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.1);

        gain.gain.setValueAtTime(0.12, now + index * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + index * 0.1);
        osc.stop(now + index * 0.1 + 0.26);
      });
    } catch (e) {
      console.warn('Audio check blocked:', e);
    }
  }

  private bgmIntervalId: any = null;
  private bgmStep = 0;
  private bgmNotes = [
    261.63, 329.63, 392.00, 440.00, 523.25, 659.25, 523.25, 440.00,
    349.23, 440.00, 523.25, 587.33, 698.46, 587.33, 523.25, 440.00,
    392.00, 493.88, 587.33, 659.25, 783.99, 659.25, 587.33, 493.88,
    349.23, 440.00, 523.25, 587.33, 698.46, 587.33, 523.25, 440.00
  ];

  startBGM() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.bgmIntervalId) return; // already active

      this.bgmStep = 0;
      const playNextWarmTone = () => {
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        
        const now = this.ctx.currentTime;
        
        // Every 8 steps play a super soft low base note for nice full ambient feel
        if (this.bgmStep % 8 === 0) {
          const bassChords = [130.81, 146.83, 174.61, 196.00]; // C3, D3, F3, G3
          const baseFreq = bassChords[Math.floor(this.bgmStep / 8) % bassChords.length];
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          
          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(baseFreq, now);
          
          // Silent pad volume - 0.015 Max
          bassGain.gain.setValueAtTime(0.012, now);
          bassGain.gain.linearRampToValueAtTime(0.001, now + 1.1);
          
          bassOsc.connect(bassGain);
          bassGain.connect(this.ctx.destination);
          
          bassOsc.start(now);
          bassOsc.stop(now + 1.2);
        }

        const freq = this.bgmNotes[this.bgmStep % this.bgmNotes.length];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        
        // Melody chime low intensity
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.85);
        
        this.bgmStep++;
      };

      playNextWarmTone();
      this.bgmIntervalId = setInterval(playNextWarmTone, 600);
    } catch (e) {
      console.warn('BGM blocked by user gesture:', e);
    }
  }

  stopBGM() {
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
  }
}

export const sound = new AudioSynth();
