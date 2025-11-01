import { atom } from 'jotai';

import type { CanvasLayer, ShapeType, ToolType } from '../types';

import { DEFAULT_BG_COLOR, DEFAULT_SHAPE_COLOR } from '../constants';

export const layersAtom = atom<CanvasLayer[]>([]);

export const selectedBackgroundColorAtom = atom(DEFAULT_BG_COLOR);

export const backgroundColorAtom = atom(DEFAULT_BG_COLOR);

export const selectedShapeAtom = atom<null | ShapeType>();

export const shapeColorAtom = atom(DEFAULT_SHAPE_COLOR);

export const selectedToolAtom = atom<null | ToolType>();

// running counters for naming purposes
export const shapeCounterAtom = atom(0);
export const backgroundCounterAtom = atom(0);
