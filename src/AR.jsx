import React, { useState } from 'react';
import { ZapparCamera, InstantTracker, ZapparCanvas, BrowserCompatibility } from '@zappar/zappar-react-three-fiber';
import { useThree } from '@react-three/fiber';

function AR() {
    let [placementMode, setPlacementMode] = useState(true);
    const { gl } = useThree();

    useEffect(() => {
    gl.setSize(window.innerWidth, window.innerHeight);
  }, [gl]);

    return (
      <>
        <ZapparCanvas  >
          <ZapparCamera />
          <InstantTracker placementMode={placementMode} placementCameraOffset={[0, 0, -5]}>
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="white" />
            </mesh>
          </InstantTracker>
          <directionalLight position={[2.5, 8, 5]} intensity={1.5} />

        </ZapparCanvas>
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