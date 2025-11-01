import { useAtom } from 'jotai';

import { layersAtom } from '../../atoms/canvasAtoms';
import LayerCard from './LayerCard';

function LayersPanel() {
  const [layers] = useAtom(layersAtom);

  return (
    <div className="fixed top-16 right-4 bg-white p-4 w-[300px] shadow-md rounded border border-gray-200">
      <h3 className="mb-2 text-slate-900">Layers</h3>
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
