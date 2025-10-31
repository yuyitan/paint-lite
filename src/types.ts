export type BaseLayer = {
  id: string;
  name: string;
};

export type BackgroundLayer = {
  color: string; // hex code
  tool: 'background';
} & BaseLayer;

export type ShapeType = 'circle' | 'rectangle';

export type Shape = {
  height: number;
  id: string;
  shapeType: ShapeType;
  width: number;
  x: number;
  y: number;
};

export type ShapeLayer = {
  tool: 'shape';
} & BaseLayer &
  Shape;

export type CanvasLayer = BackgroundLayer | ShapeLayer;
