import { useEffect, useRef } from "react";
import "../matrix.css";

export function Matrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const fontSize = 20;
    const columnSpacing = fontSize * 1.2;
    const columns = Math.floor(canvas.width / columnSpacing);

    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";

    interface Column {
      characters: string[];
      lastUpdate: number;
      speed: number;
      maxLength: number;
      active: boolean;
      currentY: number;
    }

    const columnState: Column[] = [];

    for (let i = 0; i < columns; i++) {
      columnState.push({
        characters: [],
        lastUpdate: 0,
        speed: Math.random() * 200 + 50,
        maxLength: Math.floor(Math.random() * 20) + 10,
        active: Math.random() > 0.3,
        currentY: Math.random() * -canvas.height,
      });
    }

    const draw = (currentTime: number) => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "left";

      columnState.forEach((column, columnIndex) => {
        if (!column.active) {
          if (Math.random() > 0.995) {
            column.active = true;
            column.characters = [];
            column.currentY = -fontSize;
          }
          return;
        }

        const x = columnIndex * columnSpacing;

        if (currentTime - column.lastUpdate > column.speed) {
          column.lastUpdate = currentTime;

          column.currentY += fontSize;

          const newChar = chars[Math.floor(Math.random() * chars.length)];
          column.characters.push(newChar);

          if (column.characters.length > column.maxLength) {
            column.characters.shift();
          }

          if (column.currentY > canvas.height) {
            column.currentY = -column.characters.length * fontSize;
            column.active = Math.random() > 0.1;
          }
        }

        column.characters.forEach((char, charIndex) => {
          const y =
            column.currentY -
            (column.characters.length - 1 - charIndex) * fontSize;

          if (y < -fontSize || y > canvas.height + fontSize) return;

          if (charIndex === column.characters.length - 1) {
            ctx.fillStyle = "rgba(255, 255, 255, 1)";
            ctx.shadowColor = "rgba(255, 255, 255, 1)";
            ctx.shadowBlur = 8;
          } else if (charIndex === column.characters.length - 2) {
            ctx.fillStyle = "rgba(200, 255, 200, 1)";
            ctx.shadowColor = "rgba(200, 255, 200, 0.8)";
            ctx.shadowBlur = 3;
          } else {
            const age =
              (column.characters.length - 1 - charIndex) /
              column.characters.length;
            const brightness = 255 - age * 150;
            const opacity = 1 - age * 0.5;
            ctx.fillStyle = `rgba(0, ${brightness}, 0, ${opacity})`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, x, y);
        });
      });
    };

    let animationId: number;

    const animate = (currentTime: number) => {
      draw(currentTime);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="matrix-bg">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
