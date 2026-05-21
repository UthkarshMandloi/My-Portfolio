"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

const genStar = (r: number) => {
  return new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(
      r,
      Math.acos(1 - Math.random() * 2),
      Math.random() * 2 * Math.PI
    )
  );
};

interface DynamicStarsProps {
  radius?: number;
  depth?: number;
  count?: number;
  factor?: number;
  fade?: boolean;
  speed?: number;
  isDark: boolean;
}

// Custom animated ShaderMaterial for shifting hue-wave stars and thick tilted dashes
class CustomStarfieldMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: { value: 0.0 },
        fade: { value: 1.0 },
        isDark: { value: 1.0 },
      },
      vertexShader: `
        uniform float time;
        uniform float isDark;
        attribute float size;
        attribute float speedOffset;
        varying vec3 vColor;
        varying float vTime;
        varying vec3 vPosition;
        varying float vSpeedOffset;
        void main() {
          vColor = color;
          vTime = time * 1.2 + speedOffset * 100.0;
          vPosition = position;
          vSpeedOffset = speedOffset;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Colorful stars size reduced to half (from 3.6 to 1.8) while keeping Hero stars at 1.0
          float sizeMultiplier = mix(1.8, 1.0, isDark);
          
          // For light mode, prevent distant star dashes from shrinking too much
          float distSize = 35.0 / -mvPosition.z;
          float sizeFactor = mix(max(distSize, 0.3), distSize, isDark);
          
          // Twinkling size amplitude reduced to 1/3 in light mode (from 0.45 to 0.15)
          float twinkleAmplitude = mix(0.15, 0.45, isDark);
          gl_PointSize = size * sizeMultiplier * sizeFactor * (1.4 + sin(time * 2.5 + speedOffset * 12.0) * twinkleAmplitude);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float fade;
        uniform float isDark;
        varying vec3 vColor;
        varying float vTime;
        varying vec3 vPosition;
        varying float vSpeedOffset;
        
        vec3 hueToRgb(float hue) {
          float r = abs(hue * 6.0 - 3.0) - 1.0;
          float g = 2.0 - abs(hue * 6.0 - 2.0);
          float b = 2.0 - abs(hue * 6.0 - 4.0);
          return clamp(vec3(r, g, b), 0.0, 1.0);
        }

        // Signed Distance Function to draw beautiful slanted dash strokes (slanted top-right to bottom-left)
        float distToSegment(vec2 p, vec2 a, vec2 b) {
          vec2 pa = p - a, ba = b - a;
          float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
          return length(pa - ba * h);
        }

        void main() {
          // 1. Shape morphing: Circle (Dark Theme) vs Tilted Dashed Stroke (Light Themes)
          float dCircle = distance(gl_PointCoord, vec2(0.5, 0.5));
          float opCircle = 1.0 / (1.0 + exp(16.0 * (dCircle - 0.25)));

          // Thick slanted capsule segment (matching hand-drawn sketch style)
          // Ends of the segment are placed safely inside gl_PointCoord bounds to avoid clipping
          float dSegment = distToSegment(gl_PointCoord, vec2(0.28, 0.72), vec2(0.72, 0.28));
          // Sharp, bold, extremely visible 40%-wide capsule body with micro-aliasing edge
          float opDash = smoothstep(0.24, 0.20, dSegment);

          // Density modifier: reduce colorful stars' density to exactly 1/3 in light mode
          // 2/3 of stars smoothly fade out as isDark transitions from 1.0 to 0.0
          float densityFactor = mix(step(vSpeedOffset, 0.333), 1.0, isDark);

          // Smoothly interpolate the shapes and apply density scaling
          float opacity = mix(opDash, opCircle, isDark) * densityFactor;

          // 2. Dynamic Shifting Waves mapping to Blue-Purple-Magenta
          float spatialPhase = (vPosition.x + vPosition.y + vPosition.z) * 0.012;
          float waveTime = time * 0.35 + spatialPhase;
          
          // Animate HSL hue back-and-forth strictly within royal blue (0.60) to pink-magenta (0.96)
          float hue = 0.78 + sin(waveTime * 0.3) * 0.18;
          vec3 waveColor = hueToRgb(hue);

          // Blend wave color with individual star colors for rich variance
          vec3 mixedColor = mix(vColor, waveColor, 0.72);

          // Dark theme (isDark = 1.0): keep hero stars soft, twinkling, bright white/subtle pastels
          vec3 darkColor = mix(vec3(1.0), mixedColor, 0.25) * 1.7;

          // Light theme (isDark = 0.0): rich, opaque, highly visible "color mixer" strokes
          vec3 lightColor = mixedColor * 0.95;

          // Smoothly interpolate final color styles
          vec3 finalColor = mix(lightColor, darkColor, isDark);

          gl_FragColor = vec4(finalColor, opacity);
        }
      `
    });
  }
}

function DynamicStars({
  radius = 100,
  depth = 50,
  count = 6000,
  factor = 5.2,
  fade = true,
  speed = 1.2,
  isDark
}: DynamicStarsProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Stable useMemo: positions and base colors are generated only ONCE!
  // This guarantees that stars never "jump" or flicker on scroll.
  const [position, color, size, speedOffset] = useMemo(() => {
    const positions = [];
    const colors = [];
    const sizes = [];
    const speedOffsets = [];
    const colorObj = new THREE.Color();
    let r = radius + depth;
    const increment = depth / count;

    for (let i = 0; i < count; i++) {
      r -= increment * Math.random();
      positions.push(...genStar(r).toArray());
      sizes.push((0.5 + 0.5 * Math.random()) * factor);
      speedOffsets.push(Math.random());

      // Premium Color-Mixer Palette: Royal Blue, Deep Purple, Vivid Magenta/Red-Pink
      const rand = Math.random();
      if (rand < 0.34) {
        // Royal Blue
        colorObj.setHSL(0.61 + 0.04 * Math.random(), 0.95, 0.5 + 0.1 * Math.random());
      } else if (rand < 0.67) {
        // Deep Purple
        colorObj.setHSL(0.74 + 0.04 * Math.random(), 0.95, 0.48 + 0.1 * Math.random());
      } else {
        // Vivid Magenta/Red-Pink
        colorObj.setHSL(0.95 + 0.04 * Math.random(), 0.95, 0.5 + 0.1 * Math.random());
      }
      colors.push(colorObj.r, colorObj.g, colorObj.b);
    }

    return [
      new Float32Array(positions),
      new Float32Array(colors),
      new Float32Array(sizes),
      new Float32Array(speedOffsets)
    ];
  }, [count, depth, factor, radius]);

  const [starfieldMaterial] = useState(() => new CustomStarfieldMaterial());
  const targetIsDark = useRef(isDark ? 1.0 : 0.0);

  // Sync targets
  useEffect(() => {
    targetIsDark.current = isDark ? 1.0 : 0.0;
  }, [isDark]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime * speed;
      // Smoothly lerp the isDark uniform!
      materialRef.current.uniforms.isDark.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.isDark.value,
        targetIsDark.current,
        0.05
      );
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[position, 3]} />
        <bufferAttribute attach="attributes-color" args={[color, 3]} />
        <bufferAttribute attach="attributes-size" args={[size, 1]} />
        <bufferAttribute attach="attributes-speedOffset" args={[speedOffset, 1]} />
      </bufferGeometry>
      <primitive
        ref={materialRef}
        object={starfieldMaterial}
        attach="material"
        // Use NormalBlending for both to ensure smooth, non-popping transitions and clear colors on white
        blending={THREE.NormalBlending}
        uniforms-fade-value={fade ? 1.0 : 0.0}
        depthWrite={false}
        transparent
        vertexColors
      />
    </points>
  );
}

interface InteractiveParticlesProps {
  isDark: boolean;
  wireframeColor: string;
}

function InteractiveParticles({ isDark, wireframeColor }: InteractiveParticlesProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Use refs for materials to enable extremely smooth color interpolation (lerping) in useFrame
  const targetWireframeColor = useRef(new THREE.Color(wireframeColor));
  const mesh1MaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const mesh2MaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Sync targets
  useEffect(() => {
    targetWireframeColor.current.set(wireframeColor);
  }, [wireframeColor]);

  useFrame((state: any) => {
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;

      // Gentle parallax linked to mouse coordinates
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (state.pointer.y * Math.PI) / 12,
        0.05
      );
      groupRef.current.rotation.y += THREE.MathUtils.lerp(
        0,
        (state.pointer.x * Math.PI) / 12,
        0.05
      );
    }

    // Buttery smooth color transition for wireframe models
    if (mesh1MaterialRef.current) {
      mesh1MaterialRef.current.color.lerp(targetWireframeColor.current, 0.05);
    }
    if (mesh2MaterialRef.current) {
      mesh2MaterialRef.current.color.lerp(targetWireframeColor.current, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Dynamic Stars canvas particles */}
      <DynamicStars radius={100} depth={50} count={6000} factor={5.2} fade speed={1.2} isDark={isDark} />

      {/* Floating Geometric Wireframes */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.8}>
        <mesh position={[-2, 1, -12]}>
          <icosahedronGeometry args={[3.2, 1]} />
          <meshStandardMaterial
            ref={mesh1MaterialRef}
            color={wireframeColor}
            wireframe
            opacity={0.18}
            transparent
          />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1.8} floatIntensity={1.2}>
        <mesh position={[6, -2, -16]}>
          <octahedronGeometry args={[2.2, 0]} />
          <meshStandardMaterial
            ref={mesh2MaterialRef}
            color={wireframeColor}
            wireframe
            opacity={0.12}
            transparent
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  const [theme, setTheme] = useState({
    isDark: true,
    wireframeColor: "#b026ff",
    ambientIntensity: 0.5,
    directionalIntensity: 1.0,
  });

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setTheme({
          isDark: customEvent.detail.isDark,
          wireframeColor: customEvent.detail.wireframeColor,
          ambientIntensity: customEvent.detail.ambientIntensity,
          directionalIntensity: customEvent.detail.directionalIntensity,
        });
      }
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ backgroundColor: "var(--theme-bg-color)" }}
    >
      {/* We make the Canvas transparent so that the parent div's CSS transitions can fade the background color smoothly */}
      <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <ambientLight intensity={theme.ambientIntensity} />
        <directionalLight position={[10, 10, 5]} intensity={theme.directionalIntensity} />
        <InteractiveParticles
          isDark={theme.isDark}
          wireframeColor={theme.wireframeColor}
        />
      </Canvas>
    </div>
  );
}
