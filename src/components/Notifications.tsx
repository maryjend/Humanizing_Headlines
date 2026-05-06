"use client";

import { useEffect, useState } from "react";

export default function Notification() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const msg = localStorage.getItem("notification");
    if (msg) {
      setMessage(msg);
      localStorage.removeItem("notification");

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, []);

  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
}