import { useAtom } from 'jotai';
import { useState } from 'react';

import { backgroundColorAtom, layersAtom } from '../../atoms/canvasAtoms';
import { addLayer, createBackgroundLayer } from '../layers-panel/utils';
import ToolMenu from '../ToolMenu';

function FillButton() {
  const [layers, setLayers] = useAtom(layersAtom);
  const [backgroundColor, setBackgroundColor] = useAtom(backgroundColorAtom);
  const [color, setColor] = useState('#ffffff');

  const handleConfirm = () => {
    if (color === backgroundColor) return;
    const layer = createBackgroundLayer(`Background ${layers.length + 1}`, color);
    setLayers(addLayer(layers, layer));
    setBackgroundColor(color);
  };

  return (
    <ToolMenu onClose={handleConfirm} target={<div>fill</div>}>
      <label className="text-sm text-gray-700" htmlFor="backgroundColorInput">
        Background Fill Tool
      </label>
      <input
        className="w-12 h-8 rounded cursor-pointer border border-gray-300"
        id="backgroundColorInput"
        onChange={(e) => setColor(e.target.value)}
        type="color"
        value={color}
      />
    </ToolMenu>
  );
}
export default FillButton;
