export default function WavyLoader() {

  // Create an array of wave elements with different properties
  const waves = Array(5)
    .fill(0)
    .map((_, i) => ({
      delay: i * 0.15,
      opacity: 1 - i * 0.15,
      height: 16 - i * 2,
    }));

  return (
    <div className="flex flex-col items-center justify-center w-full rounded-lg ">
      {/* Wave container */}
      <div className="relative w-64 h-24 mb-4">
        <div className="absolute bottom-0 w-full flex justify-center">
          {/* Animated waves */}
          {waves.map((wave, index) => (
            <div
              key={index}
              className="flex space-x-3"
              style={{
                opacity: wave.opacity,
                animation: "wave 1.5s infinite ease-in-out",
                animationDelay: `${wave.delay}s`,
                position: "absolute",
                bottom: "0",
              }}
            >
              {/* Individual wave dots/elements */}
              {Array(7)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"
                    style={{
                      width: wave.height,
                      height: wave.height,
                      animation: "waveDot 1.5s infinite ease-in-out",
                      animationDelay: `${i * 0.1 + wave.delay}s`,
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Loading text with shimmer effect */}
      <div className="relative mt-6">
        <div className="text-xl font-medium text-blue-700">
          Loading<span className="animate-pulse">.</span>
          <span className="animate-pulse delay-150">.</span>
          <span className="animate-pulse delay-300">.</span>
        </div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-30"
          style={{
            animation: "shimmer 2s infinite linear",
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes waveDot {
          0%,
          100% {
            transform: scale(0.8) translateY(0);
            background-image: linear-gradient(to right, #ec4899, #3b82f6);
          }
          50% {
            transform: scale(1) translateY(-10px);
            background-image: linear-gradient(to right, #d946ef, #60a5fa);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
