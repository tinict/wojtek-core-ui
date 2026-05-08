"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();

      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      console.log("PWA installed");
    }

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  if (!showInstall) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 bg-black text-white p-4 rounded-xl shadow-xl z-50"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold">Tải ứng dụng</p>
          <p className="text-sm opacity-80">
            Cài app vào điện thoại để dùng nhanh hơn
          </p>
        </div>

        <button
          onClick={handleInstall}
          className="bg-white text-black px-4 py-2 rounded-lg font-medium"
        >
          Cài đặt
        </button>
      </div>
    </div>
  );
}