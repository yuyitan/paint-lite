import crossIcon from '../../assets/cross.svg';

interface LayerCardProps {
  id: string;
  name: string;
  onDelete(id: string): void;
}

function LayerCard({ id, name, onDelete }: LayerCardProps) {
  return (
    <div className="bg-gray-100 rounded py-1 px-2 flex justify-between">
      <div>{name}</div>
      <button type="button" onClick={() => onDelete(id)}>
        <img src={crossIcon} className="size-4" alt="Delete icon" />
      </button>
    </div>
  );
}
export default LayerCard;
