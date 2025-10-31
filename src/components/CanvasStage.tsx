import { useAtom } from 'jotai';
import { Stage } from 'react-konva';

import { backgroundColorAtom } from '../atoms/canvasAtoms';

function CanvasStage() {
  const [backgroundColor] = useAtom(backgroundColorAtom);

  return <Stage height={window.innerHeight} style={{ backgroundColor }}></Stage>;
}

export default CanvasStage;
