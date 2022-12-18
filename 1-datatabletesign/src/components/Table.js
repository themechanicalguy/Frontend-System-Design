import { Fragment } from "react";
import Table from "react-bootstrap/Table";

const DataTable = ({ data, config }) => {
  const renderHeaders = config.map((col) => {
    if (col.header) {
      return <Fragment key={col.label}>{col.header()}</Fragment>;
    }
    return <th key={col.label}>{col.label}</th>;
  });
  const renderRows = data.map((rowData) => {
    const renderCells = config.map((column) => {
      return <td key={column.label}>{column.render(rowData)}</td>;
    });
    return <tr key={rowData.name}>{renderCells}</tr>;
  });
  return (
    <div>
      <h1>Table component</h1>
      <div>
        <Table striped bordered hover size="md">
          <thead>
            <tr>{renderHeaders}</tr>
          </thead>
          <tbody>{renderRows}</tbody>
        </Table>
      </div>
    </div>
  );
};
export default DataTable;
