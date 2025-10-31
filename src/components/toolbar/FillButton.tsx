import { useAtom } from 'jotai';
import { useState } from 'react';

import { backgroundColorAtom, backgroundCounterAtom, layersAtom } from '../../atoms/canvasAtoms';
import { addLayer, createBackgroundLayer } from '../layers-panel/utils';
import ToolMenu from '../ToolMenu';

function FillButton() {
  const [layers, setLayers] = useAtom(layersAtom);
  const [backgroundColor, setBackgroundColor] = useAtom(backgroundColorAtom);
  const [backgroundCounter, setBackgroundCounter] = useAtom(backgroundCounterAtom);

  const [color, setColor] = useState('#ffffff');

  const handleConfirm = () => {
    if (color === backgroundColor) return;
    const layer = createBackgroundLayer(`Background ${backgroundCounter + 1}`, color);
    setLayers(addLayer(layers, layer));
    setBackgroundColor(color);
    setBackgroundCounter(backgroundCounter + 1);
  };

  return (
    <ToolMenu onClose={handleConfirm} target={<div>fill</div>} width={200}>
      <div className="flex flex-col gap-1">
        <label htmlFor="backgroundColorInput">Background Fill Tool</label>
        <input
          className="w-12 h-8 rounded cursor-pointer border border-gray-300"
          id="backgroundColorInput"
          onChange={(e) => setColor(e.target.value)}
          type="color"
          value={color}
        />
      </div>
    </ToolMenu>
  );
}
export default FillButton;
