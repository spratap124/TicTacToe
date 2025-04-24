import "./cell.styles.css";

interface Props {
  value: string | null;
  handleClick: () => void;
}

const Cell = ({ value, handleClick }: Props) => {
  return (
    <div className="cell" onClick={handleClick}>
      {value}
    </div>
  );
};

export default Cell;
