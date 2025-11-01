import { useAtom } from 'jotai';

import type { ShapeType } from '../../types';

import arrowIcon from '../../assets/arrow.svg';
import circleIcon from '../../assets/circle.svg';
import shapesIcon from '../../assets/shapes.svg';
import squareIcon from '../../assets/square.svg';
import { selectedShapeAtom, shapeColorAtom } from '../../atoms/canvasAtoms';
import ToolMenu from '../ToolMenu';

const SHAPES: { name: ShapeType; icon: string }[] = [
  {
    name: 'rectangle',
    icon: squareIcon,
  },
  { name: 'circle', icon: circleIcon },
  { name: 'arrow', icon: arrowIcon },
];

function ShapeButton() {
  const [selectedShape, setSelectedShape] = useAtom(selectedShapeAtom);
  const [shapeColor, setShapeColor] = useAtom(shapeColorAtom);

  return (
    <ToolMenu
      target={<img src={shapesIcon} className="size-6" alt="Shapes icon" />}
      width={400}
      tool="shape"
    >
      <h3>Shape Tool</h3>
      <div className="text-gray-600 text-sm mb-4">
        Select color and shape. Drag and draw on the canvas!
      </div>
      <div className="flex gap-6">
        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="shapeColorInput">Color</label>
            <input
              className="w-12 h-8 rounded cursor-pointer border border-gray-300"
              id="shapeColorInput"
              onChange={(e) => setShapeColor(e.target.value)}
              value={shapeColor}
              type="color"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Shape</label>
            <div className="flex gap-2">
              {SHAPES.map((shape) => (
                <button key={shape.name} onClick={() => setSelectedShape(shape.name)} type="button">
                  <img
                    src={shape.icon}
                    alt={`${shape.name} icon`}
                    className={`size-8 hover:opacity-100 ${selectedShape === shape.name ? 'opacity-100' : 'opacity-50'}`}
                  />
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
