import { atom } from 'jotai';

import type { BackgroundLayer } from '../types';

export const layersAtom = atom<BackgroundLayer[]>([]);

export const backgroundColorAtom = atom('#ffffff');
