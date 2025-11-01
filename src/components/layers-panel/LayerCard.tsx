interface LayerCardProps {
  name: string;
}
function LayerCard({ name }: LayerCardProps) {
  return <div className="bg-gray-100 rounded py-1 px-2">{name}</div>;
}
export default LayerCard;
