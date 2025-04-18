'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sparkles, Heart, MessageCircle, Compass } from 'lucide-react';
import * as Three from 'three';
// Import OrbitControls from three.js examples
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Define  Three.js scene object type using InstanceType
type ThreeSceneType = {
  scene: InstanceType<typeof Three.Scene>;
  camera: InstanceType<typeof Three.PerspectiveCamera>;
  renderer: InstanceType<typeof Three.WebGLRenderer>;
  controls: OrbitControls;
  symbolMesh: InstanceType<typeof Three.Mesh>;
  ambientLight: InstanceType<typeof Three.AmbientLight>;
  directionalLight: InstanceType<typeof Three.DirectionalLight>;
  animationFrameId: number | null;
};

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const animationControls = useAnimationControls();
  const sceneRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<ThreeSceneType | null>(null);
  const [showMore, setShowMore] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  



  // Handle window resize events.
  useEffect(() => {
    const onResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Set dark mode from localStorage or system preference.
  useEffect(() => {
    const theme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setIsDarkMode(theme === 'dark');
  }, []);

  // Toggle the HTML "dark" class.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Framer Motion animation sequence.
  useEffect(() => {
    (async () => {
      await animationControls.start({ opacity: 0, y: -30, scale: 0.95, rotate: -5 });
      await animationControls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: { duration: 0.8, ease: 'easeInOut', type: 'spring', stiffness: 100 },
      });
    })();
  }, [animationControls]);
  // Three.js scene setup.
  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    // build scene
    const scene = new Three.Scene();
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new Three.PerspectiveCamera(75, aspect, 0.1, 1000);
    const renderer = new Three.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Create OrbitControls.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;

    // Build geometry and material for the symbol.
    const geometry = new Three.TorusKnotGeometry(3, 0.8, 256, 32, 2, 3);
    const material = new Three.MeshPhysicalMaterial({
      color: isDarkMode ? 0xaf4cff : 0x9013fe,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const symbolMesh = new Three.Mesh(geometry, material);
    symbolMesh.castShadow = true;
    symbolMesh.receiveShadow = true;

    // Create lights.
    const ambientLight = new Three.AmbientLight(0x404040);
    const directionalLight = new Three.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(2048, 2048);
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;

    scene.add(symbolMesh, ambientLight, directionalLight);
    camera.position.z = 12;

    renderer.domElement.style.cssText = `
      z-index: 0;
      position: absolute;
      top: 0;
      left: 0;
    `;
    container.appendChild(renderer.domElement);

    threeRef.current = {
      scene,
      camera,
      renderer,
      controls,
      symbolMesh,
      ambientLight,
      directionalLight,
      animationFrameId: null,
    };

    // Animation loop.
    const animate = () => {
      if (!threeRef.current) return;
      const { camera, controls, renderer, symbolMesh } = threeRef.current;
      symbolMesh.rotation.x += 0.01;
      symbolMesh.rotation.y += 0.015;
      symbolMesh.rotation.z += 0.01;
      symbolMesh.position.y = Math.sin(Date.now() * 0.001) * 1.5;
      controls.update();
      renderer.render(scene, camera);
      threeRef.current.animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Update on window resize.
    const handleResize = () => {
      if (!threeRef.current || !container) return;
      const { camera, renderer } = threeRef.current;
      const newAspect = container.clientWidth / container.clientHeight;
      camera.aspect = newAspect;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      // cleanup using the same refs
      if (threeRef.current) {
        const { renderer, controls, animationFrameId } = threeRef.current;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        controls.dispose();
        renderer.dispose();
      }
      window.removeEventListener('resize', handleResize);
      container.innerHTML = ''; // remove canvas
      threeRef.current = null;
    };
  }, [isDarkMode]);

  // update material color on theme toggle
  useEffect(() => {
    if (threeRef.current) {
      threeRef.current.symbolMesh.material.color.set(
        new Three.Color(isDarkMode ? 0xaf4cff : 0x9013fe)
      );
    }
  }, [isDarkMode]);

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center px-4 py-12',
        'bg-gradient-to-br from-blue-50 to-white dark:from-gray-950 dark:via-purple-950 dark:to-black',
        'transition-all duration-500 relative'
      )}
    >
      <div ref={sceneRef} className="absolute inset-0 w-full h-full" />
      <div className="text-center space-y-8 max-w-3xl relative z-10">
        <motion.h1
          animate={animationControls}
          className={cn(
            'text-4xl sm:text-5xl md:text-6xl font-bold',
            'bg-clip-text text-transparent',
            'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400',
            'drop-shadow-lg flex items-center justify-center gap-3',
            isLargeScreen ? 'scale-110' : ''
          )}
        >
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 animate-pulse" />
          Brutal Facts 
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 animate-pulse" />
        </motion.h1>

        <AnimatePresence mode="wait">
  <motion.div
    key={showMore ? 'expanded' : 'collapsed'}
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.6, ease: 'easeInOut' }}
    className={cn(
      'relative',
      'text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed',
      isLargeScreen ? 'text-center px-8' : ''
    )}
    ref={textRef}
  >
    {showMore ? (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {[
          `Why even this site?, well there must be some truth out there right? something !!Many of us don’t really know what to follow — we just go with what we were born into. Some follow blindly, never questioning, never exploring. And often, the signs are right there, plain as day… but we just don’t see them until someone finally says it out loud. That “Ohhhh…” moment? That’s what this space is for.`,
          `Here, you’re free to speak your mind. Share what you see through your lens — because your words might be the spark someone else needed. You never know: someone might read your post, connect with your thoughts, and reach out. They might even come to love your way of life… and just like that, you may have guided someone toward truth.`,
          `Instead of arguing endlessly over traditions we inherited — passed down by forefathers we never met, based on messages we never directly received — let’s come together and reflect. Because at the end of the day, we’re all just searching. Searching for truth, for peace, for God — not fighting over men we’ve never seen or scriptures we never personally heard.`,
          `This is your space to reflect. To share. To guide. Speak your truth — someone might just be waiting to hear it.`,
        ].map((text, index) => (
          <motion.p
            key={index}
            className="mb-6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {text}
          </motion.p>
        ))}
      </motion.div>
    ) : (
      <div className="relative max-h-[130px] overflow-hidden">
        <p>
         Why even this site?, well there must be some truth out there right? something !! Many of us don’t really know what to follow — we just go with what we were born into. Some follow blindly, never questioning, never exploring. And often, the signs are right there, plain as day… but we just don’t see them until someone finally says it out loud. That “Ohhhh…” moment? That’s what this space is for.
        </p>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />
      </div>
    )}
  </motion.div>
</AnimatePresence>

{/* Fancy toggle button with scroll logic */}
<motion.button
  onClick={() => {
    setShowMore((prev) => {
      const next = !prev;
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.scrollIntoView({ behavior: 'smooth', block: next ? 'start' : 'start' });
        }
      }, 100);
      return next;
    });
  }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="mt-4 text-blue-600 dark:text-blue-400 relative group text-sm font-medium"
>
  <span className="relative z-10">{showMore ? 'Show Less' : 'Read More'}</span>
  <span
    className="absolute left-0 bottom-0 w-full h-[1px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
  />
</motion.button>



        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.4, type: 'spring', stiffness: 120 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
        asChild
        size="sm" // 👈 this is the key fix
        className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition"
      >
        <a href="/posts">
          <Compass className="w-4 h-4" />
          Explore Reflections
        </a>
      </Button>
      

      

      
      

        </motion.div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2 animate-pulse">
            <Heart className="w-5 h-5 text-red-400" />
            <span>Embrace Unity</span>
          </div>
          <div className="flex items-center gap-2 animate-bounce">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span>Share Your Thoughts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;













