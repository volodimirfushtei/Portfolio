import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

import styles from "./DotGrid.module.css";

gsap.registerPlugin(InertiaPlugin);

const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

const DotGrid = ({
  dotSize = 8,
  gap = 24,
  baseColor = "#ed0c4c",
  activeColor = "#ed0c4c",
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = "",
  style,
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const isMountedRef = useRef(true);
  const animationFrameRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const pointerRef = useRef({
    x: -1000,
    y: -1000,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;
    const p = new window.Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  // Побудова сітки точок
  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !isMountedRef.current) return;

    const { width, height } = wrap.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    setDimensions({ width, height });

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const extraX = width - gridW;
    const extraY = height - gridH;
    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({
          cx,
          cy,
          xOffset: 0,
          yOffset: 0,
          _inertiaApplied: false,
          _tween: null
        });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  // Малювання точок
  useEffect(() => {
    if (!circlePath || !canvasRef.current) return;

    const draw = () => {
      if (!isMountedRef.current || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;
      const proxSq = proximity * proximity;
      const hasValidPointer = px !== -1000 && py !== -1000;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + (dot.xOffset || 0);
        const oy = dot.cy + (dot.yOffset || 0);

        // Розрахунок кольору
        let style = baseColor;
        if (hasValidPointer) {
          const dx = dot.cx - px;
          const dy = dot.cy - py;
          const dsq = dx * dx + dy * dy;

          if (dsq <= proxSq) {
            const dist = Math.sqrt(dsq);
            const t = 1 - dist / proximity;
            const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
            const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
            const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
            style = `rgb(${r},${g},${b})`;
          }
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [proximity, baseColor, activeColor, baseRgb, activeRgb, circlePath]);

  // Відстеження зміни розміру
  useEffect(() => {
    buildGrid();

    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        if (isMountedRef.current) {
          buildGrid();
        }
      });
      if (wrapperRef.current) ro.observe(wrapperRef.current);
    } else {
      window.addEventListener("resize", buildGrid);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", buildGrid);
    };
  }, [buildGrid]);

  // Обробка руху миші та кліків
  useEffect(() => {
    isMountedRef.current = true;

    const onMove = (e) => {
      if (!canvasRef.current || !isMountedRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) return;

      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? Math.min(now - pr.lastTime, 100) : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;

      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);

      if (speed > maxSpeed && maxSpeed > 0) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }

      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      // Обробка відштовхування точок
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;

          if (dot._tween) dot._tween.kill();

          const pushX = (dot.cx - pr.x) * 0.5 + vx * 0.005;
          const pushY = (dot.cy - pr.y) * 0.5 + vy * 0.005;

          dot._tween = gsap.to(dot, {
            xOffset: pushX,
            yOffset: pushY,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              if (isMountedRef.current && dot) {
                dot._tween = gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: "elastic.out(1, 0.75)",
                  onComplete: () => {
                    if (dot) dot._inertiaApplied = false;
                  }
                });
              }
            }
          });
        }
      }
    };

    const onClick = (e) => {
      if (!canvasRef.current || !isMountedRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      if (!rect) return;

      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;

          if (dot._tween) dot._tween.kill();

          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;

          dot._tween = gsap.to(dot, {
            xOffset: pushX,
            yOffset: pushY,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              if (isMountedRef.current && dot) {
                dot._tween = gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: "elastic.out(1, 0.75)",
                  onComplete: () => {
                    if (dot) dot._inertiaApplied = false;
                  }
                });
              }
            }
          });
        }
      }
    };

    const handleMouseLeave = () => {
      // Скидаємо позицію курсора при виході
      pointerRef.current.x = -1000;
      pointerRef.current.y = -1000;
      pointerRef.current.speed = 0;
    };

    const throttledMove = throttle(onMove, 16); // Зменшив затримку для плавності

    window.addEventListener("mousemove", throttledMove);
    window.addEventListener("click", onClick);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      isMountedRef.current = false;
      window.removeEventListener("mousemove", throttledMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("mouseleave", handleMouseLeave);

      // Зупиняємо всі анімації GSAP
      for (const dot of dotsRef.current) {
        if (dot._tween) {
          dot._tween.kill();
        }
        gsap.killTweensOf(dot);
      }
    };
  }, [
    maxSpeed,
    speedTrigger,
    proximity,
    resistance,
    returnDuration,
    shockRadius,
    shockStrength,
  ]);

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <div ref={wrapperRef} className={styles.wrapper}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </div>
  );
};

export default DotGrid;
