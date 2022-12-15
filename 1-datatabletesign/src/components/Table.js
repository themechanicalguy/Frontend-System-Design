import Table from "react-bootstrap/Table";

const DataTable = ({ data, configData }) => {
  const renderColumns = configData.map((col) => {
    return <th key={col.label}>{col.label}</th>;
  });
  const renderRows = data.map((rowData) => {
    const renderCells = configData.map((column) => {
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
            <tr>{renderColumns}</tr>
          </thead>
          <tbody>{renderRows}</tbody>
        </Table>
      </div>
    </div>
  );
};
export default DataTable;
