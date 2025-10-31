import CanvasStage from './components/CanvasStage';
import LayersPanel from './components/layers-panel/LayersPanel';
import Toolbar from './components/toolbar/Toolbar';

function App() {
  return (
    <>
      <Toolbar />
      <div className="flex">
        <div className="w-3/4">
          <CanvasStage />
        </div>
        <div className="w-1/4">
          <LayersPanel />
        </div>
      </div>
    </>
  );
}

export default App;
