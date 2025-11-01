import { useAtom } from 'jotai';

import { backgroundColorAtom, layersAtom } from '../../atoms/canvasAtoms';
import { DEFAULT_BG_COLOR } from '../../constants';
import LayerCard from './LayerCard';

function LayersPanel() {
  const [layers, setLayers] = useAtom(layersAtom);
  const [, setBackgroundColor] = useAtom(backgroundColorAtom);

  return (
    <div className="fixed top-16 right-4 bg-white p-4 w-[300px] shadow-md rounded border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-slate-900">Layers</h3>
        <button
          type="button"
          className="bg-red-400 text-white px-2 py-0.5 rounded hover:bg-red-500"
          onClick={() => {
            // clear canvas
            setLayers([]);
            setBackgroundColor(DEFAULT_BG_COLOR);
          }}
        >
          Clear
        </button>
      </div>
      {layers.length === 0 ? (
        <div className="text-gray-400">Add something to the canvas</div>
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
