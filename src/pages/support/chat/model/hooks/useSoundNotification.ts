import {useState, useEffect} from 'react';

export function useSoundNotification(soundPath: string) {
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const notificationSound = new Audio(soundPath);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }
  }, []);

  const showNotificationWithSound = (title: string, options: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
      playNotificationSound(notificationSound);
    }
  };

  const playNotificationSound = (audioElement: HTMLAudioElement) => {
    if (audioElement && audioElement.paused) {
      audioElement.play().catch((error) => {
        console.error("Audio play error:", error);
      });
    }
  };

  return {
    notificationPermission,
    showNotificationWithSound
  };
}

export default useSoundNotification;
