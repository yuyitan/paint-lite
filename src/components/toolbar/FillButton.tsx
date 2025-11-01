import { useAtom } from 'jotai';

import { selectedBackgroundColorAtom } from '../../atoms/canvasAtoms';
import ToolMenu from '../ToolMenu';

function FillButton() {
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useAtom(
    selectedBackgroundColorAtom,
  );

  return (
    <ToolMenu target={<div className="text-white">fill</div>} width={200} tool="background-fill">
      <div className="flex flex-col gap-1">
        <label htmlFor="backgroundColorInput">Background Fill Tool</label>
        <input
          className="w-12 h-8 rounded cursor-pointer border border-gray-300"
          id="backgroundColorInput"
          onChange={(e) => setSelectedBackgroundColor(e.target.value)}
          type="color"
          value={selectedBackgroundColor}
        />
      </div>
    </ToolMenu>
  );
}
export default FillButton;
