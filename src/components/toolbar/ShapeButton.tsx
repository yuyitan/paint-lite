import { useAtom } from 'jotai';

import type { ShapeType } from '../../types';

import { selectedShapeAtom } from '../../atoms/canvasAtoms';
import ToolMenu from '../ToolMenu';

const SHAPES: ShapeType[] = ['rectangle', 'circle'];

function ShapeButton() {
  const [selectedShape, setSelectedShape] = useAtom(selectedShapeAtom);

  return (
    <ToolMenu target={<div>shape</div>} width={300}>
      <label>Shape Tool</label>
      <div className="flex gap-4">
        <div>
          Shape
          <div className="flex gap-2">
            {SHAPES.map((shape) => (
              <button
                className={`hover:font-bold ${selectedShape === shape ? 'font-bold' : ''}`}
                key={shape}
                onClick={() => setSelectedShape(shape)}
                type="button"
              >
                {shape}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolMenu>
  );
}
export default ShapeButton;
