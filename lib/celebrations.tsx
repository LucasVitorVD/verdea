import confetti from "canvas-confetti";

export const celebrations = {
  device: ({ x, y }: { x: number; y: number }) => {
    confetti({
      particleCount: 15, // Bem menos partículas
      spread: 30, // Spread menor, mais concentrado
      origin: { x, y }, // Sai do botão
      colors: ["#7a8471", "#9ca086"],
      shapes: ["circle"],
      scalar: 0.8, // Partículas menores
      gravity: 1.2, // Caem mais rápido
      ticks: 120, // Duração menor
      startVelocity: 20, // Velocidade menor
    });

    // Segunda pequena rajada após 150ms
    setTimeout(() => {
      confetti({
        particleCount: 8,
        spread: 25,
        origin: { x, y },
        colors: ["#f5f5f4", "#7a8471"],
        shapes: ["star"],
        scalar: 0.6,
        gravity: 1.3,
        ticks: 100,
        startVelocity: 15,
      });
    }, 150);
  },

  plant: ({ x, y }: { x: number; y: number }) => {
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { x, y },
      colors: ["#7a8471", "#9ca086", "#6b7762"],
      shapes: ["star", "circle"],
      scalar: 0.9,
      gravity: 0.8, // Caem mais devagar, como folhas
      ticks: 180,
      startVelocity: 25,
      drift: 0.1, // Leve deriva lateral
    });
  },
};
