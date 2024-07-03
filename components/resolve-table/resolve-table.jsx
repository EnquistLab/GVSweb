import React, { useState, useEffect, useRef } from "react";
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
import { DownloadResults } from "../";
import { getComparator, stableSort } from "../../actions";
import Map from "../map/map";

export function ResolveTable({ tableData }) {
    const [dataPopUpOpen, setDataPopUpOpen] = useState(false);
    const [popUpDetails, setPopUpDetails] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState("");
    const [order, setOrder] = useState("asc");
    const [selectedCoordinate, setSelectedCoordinate] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [initialCenter, setInitialCenter] = useState([0, 0]);
    const mapRef = useRef(null);

    const isValidCoordinate = ({ latitude, longitude }) => {
        return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
    };

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

    const handleCoordinateClick = (coord) => {
        if (isValidCoordinate(coord)) {
            setSelectedCoordinate(coord);
            mapRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            console.error("Invalid coordinate clicked:", coord);
        }
    };

    const handleMarkerClick = (coord) => {
        setPopUpDetails(coord.row);
        setDataPopUpOpen(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'OK':
                return 'green';
            case 'In ocean':
            case 'Possible centroid':
            case 'Possibly erroneous centroid':
                return 'orange';
            default:
                return 'red';
        }
    };

    const renderRow = (row, id) => {
        const coordinatesSubmitted = `${row.latitude_verbatim}, ${row.longitude_verbatim}`;
        const coordinatesResolved = (row.latitude && row.longitude) ? `${row.latitude},${row.longitude}` : "";
        const centroid = row.centroid_poldiv ? `${row.centroid_poldiv} centroid` : "";
        const coordinatesStatus = row.latlong_err ? row.latlong_err : "OK";
        const statusColor = getStatusColor(coordinatesStatus);

        return (
            <TableRow key={id}>
                <TableCell>{coordinatesSubmitted}</TableCell>
                <TableCell>
                    {coordinatesStatus === "OK" || coordinatesStatus === "Possible centroid" || coordinatesStatus === "In ocean" ? (
                        <Link
                            href="#"
                            onClick={() => handleCoordinateClick({ latitude: row.latitude, longitude: row.longitude, status: coordinatesStatus, row })}
                        >
                            {coordinatesResolved}
                        </Link>
                    ) : (
                        coordinatesResolved
                    )}
                </TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.county}</TableCell>
                <TableCell>{centroid}</TableCell>
                <TableCell style={{ color: statusColor }}>{coordinatesStatus}</TableCell>
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

    useEffect(() => {
        const allCoords = tableData
            .map((row) => ({ latitude: row.latitude, longitude: row.longitude, status: row.latlong_err || "OK", row }))
            .filter(coord => isValidCoordinate(coord) && (coord.status === 'OK' || coord.status === 'Possible centroid' || coord.status === 'In ocean'));
        setCoordinates(allCoords);

        if (allCoords.length > 0) {
            setInitialCenter([allCoords[0].longitude, allCoords[0].latitude]);
        }
    }, [tableData]);

    return tableData.length > 0 ? (
        <>
            <Paper>
                <Box m={2} ref={mapRef}>
                    <Map coordinates={coordinates} selectedCoordinate={selectedCoordinate} onMarkerClick={handleMarkerClick} initialCenter={initialCenter} />
                </Box>
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
        </>
    ) : null;
}
