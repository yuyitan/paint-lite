import { useAtom } from 'jotai';

import { layersAtom } from '../../atoms/canvasAtoms';
import LayerCard from './LayerCard';

function LayersPanel() {
  const [layers] = useAtom(layersAtom);

  return (
    <>
      <h2>Layers</h2>
      <div className="flex flex-col gap-1">
        {layers
          .slice()
          .reverse()
          .map((layer) => (
            <LayerCard key={layer.id} name={layer.name} />
          ))}
      </div>
    </>
  );
}
export default LayersPanel;
