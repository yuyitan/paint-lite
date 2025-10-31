import { atom } from 'jotai';

import type { CanvasLayer } from '../types';

export const layersAtom = atom<CanvasLayer[]>([]);
