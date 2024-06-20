import { useEffect, useState } from "preact/hooks";

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function useAddToHomescreenPrompt(): [IBeforeInstallPromptEvent | null, () => void, boolean] {
  const [promptable, setPromptable] = useState<IBeforeInstallPromptEvent | null>(null);

  const [isInstalled, setIsInstalled] = useState(false);

  const promptToInstall = () => {
    if (promptable) {
      return promptable.prompt();
    }
    return Promise.reject(new Error('Tried installing before browser sent "beforeinstallprompt" event'));
  };

  useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault();
      setPromptable(e);
    };

    window.addEventListener("beforeinstallprompt", ready as EventListenerOrEventListenerObject);

    return () => {
      window.removeEventListener("beforeinstallprompt", ready as EventListenerOrEventListenerObject);
    };
  }, []);

  useEffect(() => {
    const onInstall = () => {
      setIsInstalled(true);
    };

    window.addEventListener("appinstalled", onInstall as any);

    return () => {
      window.removeEventListener("appinstalled", onInstall as any);
    };
  }, []);

  return [promptable, promptToInstall, isInstalled];
}
