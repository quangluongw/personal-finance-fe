import { useEffect, useState } from "react";
const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)]" />

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo Icon Animation */}
        <div className="relative size-16 mb-4">
          <img src="/app/Image/icon.png" alt="/app/Image/icon.png" />
        </div>

        {/* Brand Text with Staggered Animation */}
        <h1 className="flex overflow-hidden text-5xl font-bold tracking-tighter md:text-7xl text-foreground">
          {["S", "p", "e", "n", "d", "S", "e", "n", "s", "e"].map((char, i) => (
            <span
              key={i}
              className="animate-reveal opacity-0"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Progress Bar Container */}
        <div className="group relative w-64 h-1 overflow-hidden rounded-full bg-black/5">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 animate-shimmer opacity-50" />

          {/* Progress Fill */}
          <div
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out shadow-[0_0_15px_rgba(0,0,0,0.1)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Counter */}
        <div className="font-mono text-xs tracking-widest uppercase opacity-60">
          Syncing Assets — {progress}%
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] opacity-30">
        <div className="h-px w-8 bg-current" />
        Financial Intelligence
        <div className="h-px w-8 bg-current" />
      </div>
    </div>
  );
};

export default Loading;
