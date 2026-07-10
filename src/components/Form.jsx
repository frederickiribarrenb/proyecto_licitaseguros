import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import localData from '../json/backupApi.json'; // Importar el JSON local

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

 /**
 * Componente Form
 * Muestra una tabla de resultados de licitaciones con filtros y paginación.
 * Características principales:
 *  - Obtiene datos desde un endpoint JSON.
 *  - Permite filtrar por código externo, nombre, estado y fecha de cierre.
 *  - Normaliza texto para búsquedas insensibles a mayúsculas/acentos.
 *  - Usa paginación para mostrar los resultados.
 *  - Muestra mensajes de error o "sin datos" según corresponda.
 *  - Estiliza la tabla y los filtros usando Material UI.
 */
export default function Form() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Estados para filtros
  const [filterCodigoExterno, setFilterCodigoExterno] = useState('');
  const [filterNombre, setFilterNombre] = useState('');
  const [filterCodigoEstado, setFilterCodigoEstado] = useState('');
  const [filterFechaCierre, setFilterFechaCierre] = useState('');

  // Opciones de estado para el filtro select
  const estadoOptions = [
    { value: '', label: 'Filtrar por Estado' },
    { value: '5', label: '5 Publicada' },
    { value: '6', label: '6 Cerrada' },
    { value: '7', label: '7 Desierta' },
    { value: '8', label: '8 Adjudicada' },
    { value: '18', label: '18 Revocada' },
    { value: '19', label: '19 Suspendida' },
  ];


// LLama a la API si no la encuentra llama al Json local
 useEffect(() => {
    fetch('/ipss/api/mercadoPublico/resultado.json')
    .then((res) => {
      if (!res.ok) throw new Error("Error en la respuesta de la red")
        return res.json();
    })
    .then((json) => {
      setData(json.Listado || []);
      setError(false);
    })
    .catch((err) => {
      console.warn("La api fallo, usando json local de respaldo", err);
      setData(localData.Listado || []);
      setError(false);
    })
  }, []);
 

 

  // Función para normalizar texto (eliminar acentos y pasar a minúsculas)
  // Permite búsquedas más flexibles
  const normalize = (str) =>
    (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  // Filtra los datos según los filtros activos
  const filteredData = data.filter((row) => {
    const matchCodigoExterno = row.CodigoExterno?.toString().toLowerCase().includes(filterCodigoExterno.toLowerCase());
    // Normalizar ambos para comparar sin acentos ni mayúsculas
    const matchNombre = normalize(row.Nombre).includes(normalize(filterNombre));
    // Filtrado por estado usando select
    const matchCodigoEstado = filterCodigoEstado === '' || row.CodigoEstado?.toString() === filterCodigoEstado;
    const matchFechaCierre = row.FechaCierre?.toLowerCase().includes(filterFechaCierre.toLowerCase());
    return (
      matchCodigoExterno &&
      matchNombre &&
      matchCodigoEstado &&
      matchFechaCierre
    );
  });

  // Calcula los datos a mostrar en la página actual
  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Calcula cuántas filas vacías agregar para mantener el alto de la tabla
  const emptyRows = rowsPerPage - paginatedData.length;

  // Manejar cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Manejar cambio de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper
      style={{
        width: '70%',
        margin: '32px auto',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        borderRadius: 16,
        paddingBottom: 24,
        background: '#fafbfc',
      }}
    >
      {/* Filtros de búsqueda */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          padding: 24,
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          borderBottom: '1px solid #e0e0e0',
          background: '#f5f7fa',
        }}
        className="filtros-responsive"
      >
        {/* Filtro por Código Externo */}
        <input
          type="text"
          placeholder="Filtrar por Código Externo"
          value={filterCodigoExterno}
          onChange={e => { setFilterCodigoExterno(e.target.value); setPage(0); }}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #bdbdbd',
            outline: 'none',
            fontSize: 15,
            minWidth: 180,
            transition: 'border 0.2s',
          }}
        />
        {/* Filtro por Nombre */}
        <input
          type="text"
          placeholder="Filtrar por Nombre"
          value={filterNombre}
          onChange={e => { setFilterNombre(e.target.value); setPage(0); }}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #bdbdbd',
            outline: 'none',
            fontSize: 15,
            minWidth: 180,
            transition: 'border 0.2s',
          }}
        />
        {/* Filtro por Estado (select) */}
        <select
          value={filterCodigoEstado}
          onChange={e => { setFilterCodigoEstado(e.target.value); setPage(0); }}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #bdbdbd',
            outline: 'none',
            fontSize: 15,
            minWidth: 180,
            background: '#fff',
            transition: 'border 0.2s',
          }}
        >
          {estadoOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {/* Filtro por Fecha Cierre */}
        <input
          type="text"
          placeholder="Filtrar por Fecha Cierre"
          value={filterFechaCierre}
          onChange={e => { setFilterFechaCierre(e.target.value); setPage(0); }}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #bdbdbd',
            outline: 'none',
            fontSize: 15,
            minWidth: 180,
            transition: 'border 0.2s',
          }}
        />
      </div>
      <div style={{ height: 16 }} />
      <TableContainer
        style={{
          margin: '0 auto',
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          // Ajuste para móvil: ancho completo
          width: '70%',
        }}
        className="tabla-responsive"
      >
        <Table
          sx={{
            minWidth: 700,
            tableLayout: 'fixed',
            '@media (max-width:600px)': {
              minWidth: 0,
              tableLayout: 'auto',
              fontSize: 12,
            },
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {/* Encabezados de la tabla */}
              <StyledTableCell className='col-codigo'>Código Externo</StyledTableCell>
              <StyledTableCell className='col-nombre'>Nombre</StyledTableCell>
              <StyledTableCell className='col-estado'>Estado</StyledTableCell>
              <StyledTableCell className='col-fecha'>Fecha Cierre</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Muestra error, sin datos o los datos paginados */}
            {error ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Error al cargar los datos.</TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No hay datos disponibles.</TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => (
                <StyledTableRow
                  key={row.CodigoExterno}
                  sx={{
                    transition: 'background 0.2s',
                    '&:hover': { background: '#e3f2fd' }
                  }}
                >
                  <StyledTableCell style={{ width: 160, wordBreak: 'break-word' }}>{row.CodigoExterno}</StyledTableCell>
                  <StyledTableCell style={{ width: 300, wordBreak: 'break-word' }}>{row.Nombre}</StyledTableCell>
                  <StyledTableCell style={{ width: 140, wordBreak: 'break-word' }}>{row.CodigoEstado}</StyledTableCell>
                  <StyledTableCell style={{ width: 180, wordBreak: 'break-word' }}>{row.FechaCierre}</StyledTableCell>
                </StyledTableRow>
              ))
            )}
            {/* Agrega filas vacías para mantener el alto visual */}
            {emptyRows > 0 && !error && Array.from({ length: emptyRows }).map((_, idx) => (
              <StyledTableRow key={`empty-${idx}`}>
                <StyledTableCell colSpan={4} style={{ height: 53 }} />
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Paginación de la tabla */}
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5]}
        labelRowsPerPage="Filas por página"
        style={{
          margin: '16px auto 0 auto',
          borderRadius: 8,
          background: '#f5f7fa',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          border: '1px solid #e0e0e0',
          width: '70%',
        }}
        classes={{
          toolbar: 'pagination-toolbar',
          selectLabel: 'pagination-select-label',
          displayedRows: 'pagination-displayed-rows',
          select: 'pagination-select',
          actions: 'pagination-actions'
        }}
      />
    </Paper>
  );
}