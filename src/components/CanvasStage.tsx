import type Konva from 'konva';

import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';

import type { Shape } from '../types';

import {
  backgroundColorAtom,
  backgroundCounterAtom,
  layersAtom,
  selectedBackgroundColorAtom,
  selectedShapeAtom,
  selectedToolAtom,
  shapeColorAtom,
  shapeCounterAtom,
} from '../atoms/canvasAtoms';
import { addLayer, createBackgroundLayer, createShapeLayer } from './layers-panel/utils';

function CanvasStage() {
  const [layers, setLayers] = useAtom(layersAtom);
  const [selectedTool, setSelectedTool] = useAtom(selectedToolAtom);

  const [selectedBackgroundColor] = useAtom(selectedBackgroundColorAtom);
  const [backgroundColor, setBackgroundColor] = useAtom(backgroundColorAtom);
  const [backgroundCounter, setBackgroundCounter] = useAtom(backgroundCounterAtom);

  const [shapeCounter, setShapeCounter] = useAtom(shapeCounterAtom);
  const [selectedShape, setSelectedShape] = useAtom(selectedShapeAtom);
  const [shapeColor] = useAtom(shapeColorAtom);
  const [newShape, setNewShape] = useState<null | Shape>(null);

  const stageRef = useRef<Konva.Stage | null>(null);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = stageRef.current;
    const clickedOnEmpty = e.target === stage;
    if (!stage || !clickedOnEmpty || !selectedShape) return;

    if (selectedTool === 'shape') {
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
          fill: shapeColor,
        });
      }
    }
  };

  const handleMouseUp = () => {
    if (selectedTool === 'shape' && newShape) {
      const newLayer = createShapeLayer(`Shape ${shapeCounter + 1}`, newShape);
      setLayers(addLayer(layers, newLayer));
      setShapeCounter(shapeCounter + 1);
      setNewShape(null);
      setSelectedShape(null);
    } else if (selectedTool === 'background-fill') {
      setBackgroundColor(selectedBackgroundColor);
      const layer = createBackgroundLayer(
        `Background ${backgroundCounter + 1}`,
        selectedBackgroundColor,
      );
      setLayers(addLayer(layers, layer));
      setBackgroundCounter(backgroundCounter + 1);
    }
    setSelectedTool(null);
  };

  const renderShape = (shape: Shape) => {
    switch (shape.shapeType) {
      case 'circle':
        return <Circle {...shape} />;
      case 'rectangle':
        return <Rect {...shape} />;
    }
  };

  return (
    <Stage
      height={window.innerHeight}
      width={window.innerWidth * 0.75}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={stageRef}
      style={{ backgroundColor }}
    >
      <Layer>
        {layers.filter((layer) => layer.tool === 'shape').map((layer) => renderShape(layer))}
      </Layer>
    </Stage>
  );
}

export default CanvasStage;
