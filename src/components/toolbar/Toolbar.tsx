import FillButton from './FillButton';
import ShapeButton from './ShapeButton';

function Toolbar() {
  return (
    <div className="bg-slate-900 shadow-lg py-3 px-4 flex items-center justify-between">
      <div className="flex gap-3">
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
