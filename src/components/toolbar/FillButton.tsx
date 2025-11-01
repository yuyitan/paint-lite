import { useAtom } from 'jotai';

import fillIcon from '../../assets/fill.svg';
import { selectedBackgroundColorAtom } from '../../atoms/canvasAtoms';
import ToolMenu from '../ToolMenu';

function FillButton() {
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useAtom(
    selectedBackgroundColorAtom,
  );

  return (
    <ToolMenu
      target={<img src={fillIcon} className="size-6" alt="Fill icon" />}
      width={200}
      tool="background-fill"
    >
      <div className="flex flex-col">
        <label htmlFor="backgroundColorInput">
          <h3>Background Fill Tool</h3>
        </label>
        <div className="text-gray-600 text-sm mb-4">Choose a color</div>
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
