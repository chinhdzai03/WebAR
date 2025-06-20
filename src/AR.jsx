import React, { useEffect, useRef, useState } from 'react';
import { ZapparCamera, InstantTracker, ZapparCanvas, BrowserCompatibility } from '@zappar/zappar-react-three-fiber';
import { useFrame, useThree } from '@react-three/fiber';

function ResizeGLCanvas() {
  const { gl } = useThree();

  useEffect(() => {
    gl.setSize(window.innerWidth, window.innerHeight);
  }, [gl]);

  return null;
}
function AR() {
    let [placementMode, setPlacementMode] = useState(true);
    const [scale, setScale] = useState(1);
    const [rotationY, setRotationY] = useState(0); 

    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
        meshRef.current.rotation.y = rotationY;
        meshRef.current.scale.set(scale, scale, scale);
            }
    });

    return (
      <>
        <ZapparCanvas  >
          <ZapparCamera />
          <InstantTracker placementMode={placementMode} placementCameraOffset={[0, 0, -5]}>
            <mesh ref={meshRef}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="white" />
            </mesh>
          </InstantTracker>
          <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
          <ResizeGLCanvas />
        </ZapparCanvas>
        <div style={{
            position: 'absolute',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '1rem',
            borderRadius: '12px',
            zIndex: 10
        }}>
            <div>
            <label>Scale: {scale.toFixed(2)}</label>
            <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                style={{ width: '100%' }}
            />
            </div>
            <div style={{ marginTop: '1rem' }}>
            <label>Rotation: {(rotationY * (180 / Math.PI)).toFixed(0)}°</label>
            <input
                type="range"
                min="0"
                max={(2 * Math.PI).toFixed(2)}
                step="0.01"
                value={rotationY}
                onChange={(e) => setRotationY(parseFloat(e.target.value))}
                style={{ width: '100%' }}
            />
            </div>
        </div>
      
        <div
          id="zappar-placement-ui"
          onClick={() => {
            setPlacementMode((currentPlacementMode) => !currentPlacementMode);
          }}
          onKeyDown={() => {
            setPlacementMode((currentPlacementMode) => !currentPlacementMode);
          }}
          role="button"
          tabIndex={0}
        >
          Tap here to
          {placementMode ? ' place ' : ' pick up '}
          the object
        </div>
      </>
    );
}
export default AR;