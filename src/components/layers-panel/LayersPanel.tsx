import { useAtom } from 'jotai';

import {
  backgroundColorAtom,
  backgroundCounterAtom,
  layersAtom,
  shapeCounterAtom,
} from '../../atoms/canvasAtoms';
import { DEFAULT_BG_COLOR } from '../../constants';
import LayerCard from './LayerCard';

function LayersPanel() {
  const [layers, setLayers] = useAtom(layersAtom);
  const [, setBackgroundColor] = useAtom(backgroundColorAtom);
  const [, setShapeCounter] = useAtom(shapeCounterAtom);
  const [, setBackgroundCounter] = useAtom(backgroundCounterAtom);

  const handleClear = () => {
    // clear canvas
    setLayers([]);
    setBackgroundColor(DEFAULT_BG_COLOR);
    setBackgroundCounter(0);
    setShapeCounter(0);
  };

  return (
    <div className="fixed top-16 right-4 bg-white p-4 w-[300px] shadow-md rounded border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-slate-900">Layers</h2>
        <button
          type="button"
          className="bg-red-600 text-white px-2 py-0.5 rounded hover:bg-red-700"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      {layers.length === 0 ? (
        <div className="text-gray-500">Add something to the canvas</div>
      ) : (
        <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto">
          {layers
            .slice()
            .reverse()
            .map((layer) => (
              <LayerCard key={layer.id} name={layer.name} />
            ))}
        </div>
      )}
    </div>
  );
}
export default LayersPanel;
