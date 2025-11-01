import { useAtom } from 'jotai';

import type { ShapeType } from '../../types';

import { selectedShapeAtom, shapeColorAtom } from '../../atoms/canvasAtoms';
import ToolMenu from '../ToolMenu';

const SHAPES: ShapeType[] = ['rectangle', 'circle'];

function ShapeButton() {
  const [selectedShape, setSelectedShape] = useAtom(selectedShapeAtom);
  const [shapeColor, setShapeColor] = useAtom(shapeColorAtom);

  return (
    <ToolMenu target={<div className="text-white">shape</div>} width={400} tool="shape">
      <label>Shape Tool</label>
      <div className="text-gray-600 text-sm mb-4">
        Select color and shape. Drag and draw on the canvas!
      </div>
      <div className="flex gap-6">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <label htmlFor="shapeColorInput">Color</label>
            <input
              className="w-12 h-8 rounded cursor-pointer border border-gray-300"
              id="shapeColorInput"
              onChange={(e) => setShapeColor(e.target.value)}
              value={shapeColor}
              type="color"
            />
          </div>
          <div>
            <label>Shape</label>
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
      </div>
    </ToolMenu>
  );
}
export default ShapeButton;
