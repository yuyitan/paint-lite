interface LayerCardProps {
  name: string;
}
function LayerCard({ name }: LayerCardProps) {
  return <div>{name}</div>;
}
export default LayerCard;
