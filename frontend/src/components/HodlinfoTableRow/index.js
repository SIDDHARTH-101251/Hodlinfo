import { MdOutlineCurrencyRupee } from "react-icons/md";
import "./index.css";

const HodlinfoTableRow = (props) => {
  const { data } = props;
  const updatedData = {
    id: data.id,
    name: data.name,
    last: data.last,
    buy: data.buy,
    sell: data.sell,
    volume: data.volume,
    baseUnit: data.base_unit,
  };

  const { id, name, last, buy, sell, volume, baseUnit } = updatedData;
  return (
    <tr className="table-row">
      <td>{id}</td>
      <td>{name}</td>
      <td>
        <MdOutlineCurrencyRupee />
        {last}
      </td>
      <td>
        <MdOutlineCurrencyRupee />
        {buy}
      </td>
      <td>
        <MdOutlineCurrencyRupee />
        {sell}
      </td>
      <td>{volume}</td>
      <td>{baseUnit}</td>
    </tr>
  );
};

export default HodlinfoTableRow;
