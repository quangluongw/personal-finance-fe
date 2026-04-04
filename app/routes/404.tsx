import { ArrowLeft, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export async function loader() {
  return new Response("Not Found", { status: 404 });
}

export default function NotFoundPage() {
  const navigate = useNavigate();

  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-emerald-300 rounded-full opacity-20 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-6">
        <h1 className="text-[180px] font-black text-emerald-600">404</h1>

        <h2 className="text-3xl font-bold mb-4">Oops! Trang không tồn tại</h2>

        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl"
          >
            <Home className="inline w-5 h-5 mr-2" />
            Về trang chủ
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border rounded-xl"
          >
            <ArrowLeft className="inline w-5 h-5 mr-2" />
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
