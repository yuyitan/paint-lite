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

  const handleDelete = (id: string) => {
    setLayers((prev) => {
      const target = prev.find((layer) => layer.id === id);
      if (!target) return prev;
      const updatedLayers = prev.filter((layer) => layer.id !== id);

      // delete background layer
      if (target.tool === 'background-fill') {
        const remainingBgLayers = updatedLayers.filter((layer) => layer.tool === 'background-fill');
        if (remainingBgLayers.length > 0) {
          // set background to top most background layer
          const topBg = remainingBgLayers[remainingBgLayers.length - 1];
          setBackgroundColor(topBg.color);
        } else {
          setBackgroundColor(DEFAULT_BG_COLOR);
          setBackgroundCounter(0);
        }
      }
      if (!updatedLayers.length) {
        setBackgroundCounter(0);
        setShapeCounter(0);
      }
      return updatedLayers;
    });
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
              <LayerCard key={layer.id} id={layer.id} name={layer.name} onDelete={handleDelete} />
            ))}
        </div>
      )}
    </div>
  );
}
export default LayersPanel;
