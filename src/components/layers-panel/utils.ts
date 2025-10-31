import type { BackgroundLayer } from '../../types';

export const createBackgroundLayer = (name: string, color: string): BackgroundLayer => {
  return {
    id: crypto.randomUUID(),
    name: name,
    type: 'background',
    color: color,
  };
};

export const addLayer = (
  layers: BackgroundLayer[],
  newLayer: BackgroundLayer,
): BackgroundLayer[] => {
  return [...layers, newLayer];
};
