export type BaseLayer = {
  id: string;
  name: string;
};

export type BackgroundLayer = {
  color: string; // hex code
  tool: 'background-fill';
} & BaseLayer;

export type ShapeType = 'arrow' | 'circle' | 'rectangle';

export type Shape = {
  fill: string; // hex code
  id: string;
  shapeType: ShapeType;
  height: number;
  width: number;
  x: number;
  y: number;
  points?: number[];
  stroke?: string;
  dash?: number[];
  opacity?: number;
};

export type ShapeLayer = {
  tool: 'shape';
} & BaseLayer &
  Shape;

export type CanvasLayer = BackgroundLayer | ShapeLayer;

export type ToolType = 'background-fill' | 'shape';
