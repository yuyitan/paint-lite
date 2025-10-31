import FillButton from './FillButton';
import ShapeButton from './ShapeButton';

function Toolbar() {
  return (
    <div className="bg-gray-200 shadow p-2 flex items-center gap-2">
      <FillButton />
      <ShapeButton />
    </div>
  );
}

export default Toolbar;
