import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import {
  useRef,
  useMemo,
  useState,
  useEffect,
  type PointerEvent as ReactPointerEvent,
} from "react";
import * as THREE from "three";

function createLeatherPatchTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createLinearGradient(0, 0, 512, 320);
  gradient.addColorStop(0, "#6b5335");
  gradient.addColorStop(0.35, "#b8956a");
  gradient.addColorStop(0.65, "#c4a574");
  gradient.addColorStop(1, "#8a6b42");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 320);

  // Leather grain
  for (let i = 0; i < 1400; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 320;
    const a = 0.04 + Math.random() * 0.08;
    ctx.fillStyle = Math.random() > 0.5 ? `rgba(40,25,10,${a})` : `rgba(255,220,170,${a})`;
    ctx.fillRect(x, y, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }

  // Stitch border
  ctx.strokeStyle = "rgba(40, 28, 12, 0.55)";
  ctx.lineWidth = 6;
  ctx.setLineDash([8, 10]);
  ctx.strokeRect(28, 28, 456, 264);
  ctx.setLineDash([]);

  // Debossed brand
  ctx.font = "bold 92px 'Arial Black', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(30, 20, 10, 0.45)";
  ctx.fillText("BRAND", 248, 148);
  ctx.fillStyle = "rgba(20, 12, 6, 0.55)";
  ctx.font = "bold 92px Arial, sans-serif";
  ctx.fillText("iT", 400, 148);

  // Soft highlight on letters
  ctx.fillStyle = "rgba(255, 230, 180, 0.12)";
  ctx.font = "bold 92px 'Arial Black', Arial, sans-serif";
  ctx.fillText("BRAND", 246, 146);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function createMeshFabricTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = "rgba(80,80,80,0.45)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 128; i += 8) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 128);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(128, i);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function CapModel({
  rotationY,
  rotationX,
}: {
  rotationY: number;
  rotationX: number;
}) {
  const group = useRef<THREE.Group>(null);
  const patchTexture = useMemo(() => createLeatherPatchTexture(), []);
  const meshTexture = useMemo(() => createMeshFabricTexture(), []);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = rotationY;
    const targetX = rotationX;
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 8);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 8);
  });

  const navy = "#1a2433";
  const meshDark = "#141414";
  const brimColor = "#121820";
  const buttonColor = "#c4a574";

  return (
    <group ref={group} position={[0, 0.05, 0]} scale={1.55}>
      {/* Crown dome */}
      <mesh castShadow position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.72, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        <meshStandardMaterial color={navy} roughness={0.78} metalness={0.05} />
      </mesh>

      {/* Front structured panel */}
      <mesh castShadow position={[0, 0.42, 0.48]} rotation={[0.18, 0, 0]}>
        <boxGeometry args={[0.95, 0.72, 0.08]} />
        <meshStandardMaterial color={navy} roughness={0.72} metalness={0.04} />
      </mesh>

      {/* Soft front curve overlay */}
      <mesh castShadow position={[0, 0.48, 0.52]} rotation={[0.22, 0, 0]}>
        <cylinderGeometry args={[0.52, 0.55, 0.7, 24, 1, true, -0.85, 1.7]} />
        <meshStandardMaterial color={navy} roughness={0.74} side={THREE.DoubleSide} />
      </mesh>

      {/* Side panels */}
      <mesh castShadow position={[-0.55, 0.4, 0.05]} rotation={[0.05, 0.55, 0.08]}>
        <boxGeometry args={[0.55, 0.55, 0.06]} />
        <meshStandardMaterial color={navy} roughness={0.76} />
      </mesh>
      <mesh castShadow position={[0.55, 0.4, 0.05]} rotation={[0.05, -0.55, -0.08]}>
        <boxGeometry args={[0.55, 0.55, 0.06]} />
        <meshStandardMaterial color={navy} roughness={0.76} />
      </mesh>

      {/* Mesh back */}
      <mesh castShadow position={[0, 0.4, -0.35]} rotation={[0.1, 0, 0]}>
        <sphereGeometry args={[0.7, 24, 16, Math.PI * 0.55, Math.PI * 0.9, 0.15, Math.PI * 0.45]} />
        <meshStandardMaterial
          map={meshTexture}
          color={meshDark}
          roughness={0.9}
          metalness={0}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Brim */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.08, 0.55]}
        rotation={[-0.12, 0, 0]}
      >
        <cylinderGeometry args={[0.95, 1.05, 0.045, 48, 1, false, -1.2, 2.4]} />
        <meshStandardMaterial color={brimColor} roughness={0.7} metalness={0.08} />
      </mesh>

      {/* Brim underside */}
      <mesh position={[0, 0.055, 0.55]} rotation={[-0.12, 0, 0]}>
        <cylinderGeometry args={[0.92, 1.02, 0.02, 48, 1, false, -1.2, 2.4]} />
        <meshStandardMaterial color="#0a0e14" roughness={0.85} />
      </mesh>

      {/* Leather patch */}
      <mesh castShadow position={[0, 0.42, 0.58]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.58, 0.36, 0.035]} />
        <meshStandardMaterial
          map={patchTexture}
          roughness={0.55}
          metalness={0.12}
          bumpScale={0.02}
        />
      </mesh>

      {/* Patch edge bevel */}
      <mesh position={[0, 0.42, 0.565]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.6, 0.38, 0.015]} />
        <meshStandardMaterial color="#5c4030" roughness={0.65} />
      </mesh>

      {/* Top button */}
      <mesh castShadow position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
        <meshStandardMaterial color={buttonColor} roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Visor stitch line */}
      <mesh position={[0, 0.1, 0.72]} rotation={[-0.12, 0, 0]}>
        <torusGeometry args={[0.78, 0.008, 8, 48, 2.2]} />
        <meshStandardMaterial color="#2a3545" roughness={0.8} />
      </mesh>
    </group>
  );
}

function CapScene({
  rotationY,
  rotationX,
}: {
  rotationY: number;
  rotationX: number;
}) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 3, -2]} intensity={0.45} color="#c4a574" />
      <directionalLight position={[0, -2, 4]} intensity={0.25} color="#8a9bb0" />
      <spotLight position={[0, 5, 2]} intensity={0.75} angle={0.45} penumbra={0.65} />
      <CapModel rotationY={rotationY} rotationX={rotationX} />
      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.5}
        scale={10}
        blur={2.8}
        far={4}
      />
    </>
  );
}

export default function Cap3D() {
  const [rotationY, setRotationY] = useState(0.35);
  const [rotationX, setRotationX] = useState(-0.12);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const idle = useRef(true);
  const autoAngle = useRef(0.35);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      if (idle.current) {
        autoAngle.current += 0.004;
        setRotationY(Math.sin(autoAngle.current) * 0.55 + 0.15);
        setRotationX(-0.12 + Math.sin(autoAngle.current * 0.6) * 0.04);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    idle.current = false;
    last.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setRotationY((y) => y + dx * 0.008);
    setRotationX((x) => THREE.MathUtils.clamp(x + dy * 0.005, -0.45, 0.35));
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    window.setTimeout(() => {
      if (!dragging.current) idle.current = true;
    }, 2200);
  };

  return (
    <div
      className="hero__canvas"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      role="img"
      aria-label="Interactive 3D trucker cap with BRANDiT leather patch. Drag to rotate."
    >
      <Canvas
        camera={{ position: [0, 0.2, 2.85], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
      >
        <CapScene rotationY={rotationY} rotationX={rotationX} />
      </Canvas>
    </div>
  );
}
