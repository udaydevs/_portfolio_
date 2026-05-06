import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from '@rive-app/react-canvas';
import { useEffect, useState } from 'react';

export function RiveBackground({ className }: { className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const { rive, setCanvasRef, setContainerRef } = useRive({
    src: '/images/4014-8344-cat-not-track-mouse.riv',
    stateMachines: ['State Machine 1'],
    autoplay: true,
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
    onLoad: () => setIsLoaded(true),
    enableRiveAssetCDN: true,
  });

  const numX = useStateMachineInput(rive, 'State Machine 1', 'Axis_X', 0);
  const numY = useStateMachineInput(rive, 'State Machine 1', 'Axis_Y', 0);

  useEffect(() => {
    if (!rive || !numX || !numY) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      numX.value = (e.clientX / innerWidth) * 100;
      numY.value = 100 - (e.clientY / innerHeight) * 100;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rive, numX, numY]);

  return (
    <div
      ref={setContainerRef}
      className={`rive-container ${className ?? ''} ${
        isLoaded ? 'show' : 'hide'
      }`}
    >
      <canvas ref={setCanvasRef} />
    </div>
  );
}