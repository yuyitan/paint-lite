export type CanvasLayer = {
  id: string;
  name: string;
};

export type BackgroundLayer = {
  color: string; // hex code
  type: 'background';
} & CanvasLayer;
