import React from 'react';
import Header from '../Header/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(projectName, toDo, inProgress, done) {
    return { projectName, toDo, inProgress, done };
}

const rows = [
    createData('AWS', 10, 4, 24),
    createData('Lhowst', 2, 30, 0),
];

export default function AdminView() {
    return(
        <div>
        <Header />
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Project</TableCell>
                <TableCell align="right">To Do</TableCell>
                <TableCell align="right">In Progress</TableCell>
                <TableCell align="right">Done</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="left">{row.projectName}</TableCell>
                        <TableCell align="right">{row.toDo}</TableCell>
                        <TableCell align="right">{row.inProgress}</TableCell>
                        <TableCell align="right">{row.done}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
      </div>
    )
}