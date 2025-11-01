import { atom } from 'jotai';

import type { CanvasLayer, ShapeType, ToolType } from '../types';

export const layersAtom = atom<CanvasLayer[]>([]);

export const selectedBackgroundColorAtom = atom('#ffffff');

export const backgroundColorAtom = atom('#ffffff');

export const selectedShapeAtom = atom<null | ShapeType>();

export const shapeColorAtom = atom('#000000');

export const selectedToolAtom = atom<null | ToolType>();

// running counters for naming purposes
export const shapeCounterAtom = atom(0);
export const backgroundCounterAtom = atom(0);
