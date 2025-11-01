import { atom } from 'jotai';

import type { CanvasLayer, ShapeType } from '../types';

export const layersAtom = atom<CanvasLayer[]>([]);

export const backgroundColorAtom = atom('#ffffff');

export const selectedShapeAtom = atom<null | ShapeType>();

export const shapeColorAtom = atom('#000000');

// running counters for naming purposes
export const shapeCounterAtom = atom(0);
export const backgroundCounterAtom = atom(0);
