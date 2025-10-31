import type Konva from 'konva';

import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';

import type { Shape } from '../types';

import {
  backgroundColorAtom,
  layersAtom,
  selectedShapeAtom,
  shapeCounterAtom,
} from '../atoms/canvasAtoms';
import { addLayer, createShapeLayer } from './layers-panel/utils';

function CanvasStage() {
  const [backgroundColor] = useAtom(backgroundColorAtom);
  const [layers, setLayers] = useAtom(layersAtom);
  const [shapeCounter, setShapeCounter] = useAtom(shapeCounterAtom);
  const [selectedShape, setSelectedShape] = useAtom(selectedShapeAtom);
  const [newShape, setNewShape] = useState<null | Shape>(null);

  const stageRef = useRef<Konva.Stage | null>(null);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = stageRef.current;
    const clickedOnEmpty = e.target === stage;
    if (!clickedOnEmpty || !selectedShape) return;

    if (stage) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        const { x, y } = pointerPosition;
        setNewShape({
          id: crypto.randomUUID(),
          x,
          y,
          width: 50,
          height: 50,
          shapeType: selectedShape,
        });
      }
    }
  };

  const handleMouseUp = () => {
    if (newShape) {
      const newLayer = createShapeLayer(`Shape ${shapeCounter + 1}`, newShape);
      setLayers(addLayer(layers, newLayer));
      setShapeCounter(shapeCounter + 1);
    }
    setNewShape(null);
    setSelectedShape(null);
  };

  const renderShape = (shape: Shape) => {
    switch (shape.shapeType) {
      case 'circle':
        return <Circle {...shape} fill="#000000" />;
      case 'rectangle':
        return <Rect {...shape} fill="#000000" />;
    }
  };

  return (
    <Stage
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={stageRef}
      style={{ backgroundColor }}
      width={window.innerWidth}
    >
      <Layer>
        {layers.map((layer) => {
          if (layer.tool === 'shape') {
            return renderShape(layer);
          }
        })}
      </Layer>
    </Stage>
  );
}

export default CanvasStage;
