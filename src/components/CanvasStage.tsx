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
          width: 0,
          height: 0,
          shapeType: selectedShape,
          fill: shapeColor,
        });
      }
    }
  };

  const handleMouseMove = () => {
    if (!newShape || selectedTool !== 'shape') return;

    const stage = stageRef.current;
    if (!stage) return;

    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const width = pointerPosition.x - newShape.x;
    const height = pointerPosition.y - newShape.y;

    setNewShape({
      ...newShape,
      width,
      height,
    });
  };

  const normalizeShape = (shape: Shape): Shape => {
    const normalized = { ...shape };
    if (shape.width < 0) {
      normalized.x = shape.x + shape.width;
      normalized.width = Math.abs(shape.width);
    }
    if (shape.height < 0) {
      normalized.y = shape.y + shape.height;
      normalized.height = Math.abs(shape.height);
    }
    return normalized;
  };

  const handleMouseUp = () => {
    if (selectedTool === 'shape' && newShape) {
      const normalizedShape = normalizeShape(newShape);
      const newLayer = createShapeLayer(`Shape ${shapeCounter + 1}`, normalizedShape);
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

  const renderShape = (shape: Shape, isPreview = false) => {
    const normalizedShape = normalizeShape(shape);
    const commonProps = {
      ...normalizedShape,
      opacity: isPreview ? 0.75 : (normalizedShape.opacity ?? 1),
      stroke: isPreview ? normalizedShape.fill : normalizedShape.stroke,
      dash: isPreview && !normalizedShape.dash ? [4, 2] : normalizedShape.dash,
      draggable: !isPreview, // only finalized shapes draggable
    };
    switch (shape.shapeType) {
      case 'circle':
        return (
          <Circle
            key={shape.id}
            x={shape.x + shape.width / 2}
            y={shape.y + shape.height / 2}
            radius={Math.max(Math.abs(shape.width), Math.abs(shape.height)) / 2}
            fill={commonProps.fill}
            opacity={commonProps.opacity}
            dash={commonProps.dash}
            stroke={commonProps.stroke}
            draggable={commonProps.draggable}
          />
        );
      case 'rectangle':
        return <Rect key={shape.id} {...commonProps} />;
    }
  };

  return (
    <Stage
      height={window.innerHeight}
      width={window.innerWidth}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={stageRef}
      style={{ backgroundColor }}
    >
      <Layer>
        {layers.filter((layer) => layer.tool === 'shape').map((layer) => renderShape(layer))}
        {newShape && renderShape(newShape, true)}
      </Layer>
    </Stage>
  );
}

export default CanvasStage;
