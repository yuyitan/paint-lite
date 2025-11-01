import CanvasStage from './components/CanvasStage';
import LayersPanel from './components/layers-panel/LayersPanel';
import Toolbar from './components/toolbar/Toolbar';

function App() {
  return (
    <>
      <Toolbar />
      <div className="flex">
        <CanvasStage />
        <LayersPanel />
      </div>
    </>
  );
}

export default App;
