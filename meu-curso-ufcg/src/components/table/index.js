import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { STATUS_CONCLUIDA } from '../../utils/constants';

function Table(props) {
  const { disciplines, schoolRecords, changeSchoolRecordsList } = props;
  const [rows, setRows] = useState([]);

  const schoolRecordsUpdate = () => {
    if (schoolRecords !== null) {
      const updateRows =
        disciplines &&
        disciplines.map((e) => {
          const aux = schoolRecords && schoolRecords.filter((h) => h.disciplineId === e.id);
          if (aux.length > 0) {
            return { ...e, status: aux[0].status };
          }
          return e;
        });
      setRows(updateRows);
    }
  };

  function createMatriz() {
    if (schoolRecords) {
      schoolRecordsUpdate();
    } else {
      const updateRows = disciplines.map((e) => {
        return { id: e.id, name: e.name, value: e.value, period: e.period, type: e.type };
      });
      setRows(updateRows);
    }
  }

  useEffect(() => {
    createMatriz();
  }, [disciplines]);

  useEffect(() => {
    schoolRecordsUpdate();
  }, [schoolRecords]);
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 500,
    },
    {
      field: 'value',
      headerName: 'Créditos',
      width: 140,
    },
    {
      field: 'period',
      headerName: 'Periodo',
      width: 140,
    },
    {
      field: 'type',
      headerName: 'Tipo',
      width: 140,
    },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(x) => changeSchoolRecordsList(x)}
        isRowSelectable={(params) => params.row.status !== STATUS_CONCLUIDA}
      />
    </div>
  );
}
// selectionModel
export default Table;
