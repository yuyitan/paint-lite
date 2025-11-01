import FillButton from './FillButton';
import ShapeButton from './ShapeButton';

function Toolbar() {
  return (
    <div className="bg-slate-900 shadow-lg p-2 flex items-center justify-between">
      <div className="flex gap-2">
        <FillButton />
        <ShapeButton />
      </div>
      <div className="text-white">
        paint-lite by <span className="font-semibold">Raine Tan</span>
      </div>
    </div>
  );
}

export default Toolbar;
