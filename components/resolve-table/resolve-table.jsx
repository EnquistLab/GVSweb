import React, { useState } from "react";
import {
    Box,
    TableContainer,
    TableRow,
    TablePagination,
    TableCell,
    TableBody,
    Link,
    Table,
    Paper,
} from "@mui/material";

import DetailsDialog from "./resolve-details-dialog";
import EnhancedTableHead from "./resolve-table-head";
import TablePaginationActions from "./table-pagination-actions";

import { DownloadResults, } from "../";
import { getComparator, stableSort } from "../../actions";

export function ResolveTable({ tableData }) {
    const [dataPopUpOpen, setDataPopUpOpen] = useState(false);
    const [popUpDetails, setPopUpDetails] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState("");
    const [order, setOrder] = useState("asc");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickClose = () => {
        setDataPopUpOpen(false);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const renderRow = (row, id) => {
        const coordinatesSubmitted = `${row.latitude_verbatim}, ${row.longitude_verbatim}`;
        console.log(coordinatesSubmitted);
        const coordinatesResolved = `${row.latitude},${row.longitude}`;
        const centroid = row.centroid_poldiv ? `${row.centroid_poldiv} centroid` : "";
        const coordinatesStatus = row.latlong_err ? row.latlong_err : "OK";

        return (
            <TableRow key={id}>
                <TableCell>{coordinatesSubmitted}</TableCell>
                <TableCell>{coordinatesResolved}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.county}</TableCell>
                <TableCell>{centroid}</TableCell>
                <TableCell>{coordinatesStatus}</TableCell>
                <TableCell>
                    <Link
                        href="#"
                        onClick={() => {
                            setDataPopUpOpen(true);
                            setPopUpDetails(row);
                        }}
                    >
                        Details
                    </Link>
                </TableCell>
            </TableRow>
        );
    };

    if (tableData.length > 0)
        return <>
            <Paper>
                <Box pt={2} m={2} mb={0}>
                    <DownloadResults data={tableData} />
                </Box>
                <Box m={2}>
                    <TableContainer>
                        <Table size="small">
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {stableSort(tableData, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(renderRow)}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={tableData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableContainer>
                </Box>
                <DetailsDialog
                    open={dataPopUpOpen}
                    onClose={handleClickClose}
                    row={popUpDetails}
                />
            </Paper>
        </>;
    else return <></>;
}
