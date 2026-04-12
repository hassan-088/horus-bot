import { useState, useCallback, useRef, useEffect } from 'react';

interface UseAudioGuideOptions {
  text: string;
  lang?: 'en' | 'ar';
  rate?: number;
  pitch?: number;
}

export function useAudioGuide({ text, lang = 'en', rate = 0.9, pitch = 1 }: UseAudioGuideOptions) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
  }, []);

  const updateProgress = useCallback(() => {
    if (!utteranceRef.current) return;
    // Note: Web Speech API doesn't provide exact progress, so we estimate
    // This is a rough approximation based on typical speech rate
  }, []);

  const play = useCallback(() => {
    if (!isSupported || !text) return;

    // Cancel any existing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Try to find a good voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      lang === 'ar' 
        ? v.lang.startsWith('ar')
        : (v.lang.startsWith('en') && v.name.includes('Google'))
    ) || voices.find(v => v.lang.startsWith(lang));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setProgress(0);
      
      // Estimate progress based on character count
      const estimatedDuration = (text.length / 15) * 1000; // ~15 chars/sec
      const startTime = Date.now();
      
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / estimatedDuration) * 100, 100);
        setProgress(newProgress);
      }, 100);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Reset progress after a short delay
      setTimeout(() => setProgress(0), 500);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [text, lang, rate, pitch, isSupported]);

  const pause = useCallback(() => {
    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isPlaying, isPaused]);

  const resume = useCallback(() => {
    if (isPlaying && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPlaying, isPaused]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const toggle = useCallback(() => {
    if (!isPlaying) {
      play();
    } else if (isPaused) {
      resume();
    } else {
      pause();
    }
  }, [isPlaying, isPaused, play, resume, pause]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    isPlaying,
    isPaused,
    progress,
    isSupported,
    play,
    pause,
    resume,
    stop,
    toggle,
  };
}
