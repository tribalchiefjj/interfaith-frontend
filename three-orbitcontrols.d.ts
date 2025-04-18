declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera } from 'three';
    // Minimal types for OrbitControls – add more members as needed.
    export class OrbitControls {
      constructor(object: Camera, domElement?: HTMLElement);
      enableDamping: boolean;
      dampingFactor: number;
      rotateSpeed: number;
      update(): void;
      dispose(): void;
    }
  }
  