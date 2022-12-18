// import DataTable from "../components/Table";
import SortableTable from "../components/SortableTable";
import { BsBicycle } from "react-icons/bs";
import { MdDirectionsCar } from "react-icons/md";
import { FaBus } from "react-icons/fa";
import { GiHelicopter, GiShipBow } from "react-icons/gi";
import { RiMotorbikeFill } from "react-icons/ri";

const TablePage = () => {
  const data = [
    {
      name: "Bicycle",
      price: 10000,
      onRoad: 11000,
      img: <BsBicycle />,
      score: 5,
    },
    {
      name: "Bike",
      price: 200000,
      onRoad: 11000,
      img: <RiMotorbikeFill />,
      score: 3,
    },
    {
      name: "Car",
      price: 2000000,
      onRoad: 11000,
      img: <MdDirectionsCar />,
      score: 1,
    },
    {
      name: "Bus",
      price: 40000000,
      onRoad: 11000,
      img: <FaBus />,
      score: 4,
    },
    {
      name: "Ship",
      price: 90000000,
      onRoad: 11000,
      img: <GiShipBow />,
      score: 4,
    },
    {
      name: "Helicoptor",
      price: 100000000,
      onRoad: 11000,
      img: <GiHelicopter />,
    },
  ];

  const configData = [
    {
      label: "Vehicle",
      render: (item) => item.name,
      sortValue: (item) => item.name,
    },
    {
      label: "Price",
      render: (item) => item.price,
      sortValue: (item) => item.price,
    },
    {
      label: "OnRoad",
      render: (item) => item.price + item.price * 0.1,
      sortValue: (item) => item.onRoad,
    },
    {
      label: "Image",
      render: (item) => item.img,
    },
  ];
  return (
    <div>
      <SortableTable data={data} config={configData} />
    </div>
  );
};
export default TablePage;
