import type { BackgroundLayer, CanvasLayer, Shape, ShapeLayer } from '../../types';

export const createBackgroundLayer = (name: string, color: string): BackgroundLayer => {
  return {
    id: crypto.randomUUID(),
    name,
    tool: 'background',
    color,
  };
};

export const createShapeLayer = (name: string, newShape: Shape): ShapeLayer => {
  return {
    name,
    tool: 'shape',
    ...newShape,
  };
};

export const addLayer = (layers: CanvasLayer[], newLayer: CanvasLayer): CanvasLayer[] => {
  return [...layers, newLayer];
};
