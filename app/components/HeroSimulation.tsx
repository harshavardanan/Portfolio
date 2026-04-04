"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

// ── Custom Fluid Shader Material ──
class FluidMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#0A1628") },
        uColor2: { value: new THREE.Color("#1E3A5F") },
        uColor3: { value: new THREE.Color("#3B82F6") },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vDisplacement;

        // Simplex-style noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Multi-layered noise for organic water movement
          float noise1 = snoise(vec3(pos.x * 1.5, pos.y * 1.5, uTime * 0.3)) * 0.25;
          float noise2 = snoise(vec3(pos.x * 3.0, pos.y * 3.0, uTime * 0.5)) * 0.1;
          float noise3 = snoise(vec3(pos.x * 0.5, pos.y * 0.5, uTime * 0.15)) * 0.4;

          float displacement = noise1 + noise2 + noise3;
          vDisplacement = displacement;

          pos += normal * displacement;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;
        varying float vDisplacement;

        void main() {
          // Create depth-based color mixing
          float mixFactor1 = smoothstep(-0.3, 0.3, vDisplacement);
          float mixFactor2 = smoothstep(0.0, 0.5, vDisplacement);

          vec3 color = mix(uColor1, uColor2, mixFactor1);
          color = mix(color, uColor3, mixFactor2 * 0.6);

          // Add shimmer highlights on peaks
          float shimmer = pow(max(0.0, vDisplacement), 3.0) * 2.0;
          color += vec3(0.2, 0.5, 1.0) * shimmer;

          // Soft edge fade
          float edgeFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
          edgeFade *= smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);

          // Fresnel-like rim effect
          float rim = pow(1.0 - edgeFade, 2.0) * 0.3;
          color += vec3(0.1, 0.3, 0.8) * rim;

          gl_FragColor = vec4(color, 0.85 * edgeFade + 0.15);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false,
    });
  }
}

extend({ FluidMaterial });

// ── Fluid Sphere ──
function FluidSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<FluidMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 128, 128]} />
        {/* @ts-ignore */}
        <fluidMaterial ref={materialRef} />
      </mesh>
    </Float>
  );
}

// ── Wireframe Orbital Ring ──
function OrbitalRing({
  radius,
  speed,
  color,
  opacity,
}: {
  radius: number;
  speed: number;
  color: string;
  opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * speed;
      ref.current.rotation.z = clock.getElapsedTime() * speed * 0.3;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.005, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

// ── Floating Particles (Custom Buffer Geometry) ──
function FloatingParticles({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#6DB3F2"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// ── Main Scene ──
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#4A90D9" />
      <pointLight position={[-3, 2, 4]} intensity={0.6} color="#3B82F6" />
      <pointLight position={[3, -2, -4]} intensity={0.3} color="#1E40AF" />

      {/* Main fluid sphere */}
      <FluidSphere />

      {/* Orbital rings */}
      <OrbitalRing radius={2.8} speed={0.15} color="#3B82F6" opacity={0.15} />
      <OrbitalRing radius={3.3} speed={-0.1} color="#60A5FA" opacity={0.08} />
      <OrbitalRing radius={3.8} speed={0.08} color="#93C5FD" opacity={0.05} />

      {/* Sparkle particles (Drei) */}
      <Sparkles
        count={1500}
        scale={12}
        size={1.5}
        speed={0.3}
        color="#A2D4F6"
      />

      {/* Custom floating particles */}
      <FloatingParticles count={400} />
    </>
  );
}

// ── Export ──
export default function HeroSimulation() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
