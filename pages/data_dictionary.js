import { useState, useEffect, React } from "react";
import { Layout } from "../components/";
import { requestDataDictionary } from "../actions/";
import { Typography } from "@mui/material";

import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableCell,
    TableRow,
} from "@mui/material";

function DataDictionary() {
    const [dataDict, setDataDict] = useState([]);
    // retrieve the version information
    useEffect(() => {
        async function fetchData() {
            let dd = await requestDataDictionary();
            setDataDict(dd)
        }
        fetchData();
    }, []);

    return (
        <Layout>
            <Typography variant='h3'>Data dictionary</Typography>
            <br />
            <Typography variant="body1" gutterBottom align="justify">
                Names and definitions of output fields returned by the GVS.
            </Typography>
            <br />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Column Name</TableCell>
                            <TableCell>Data Type</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataDict.map((row) => (
                            <TableRow key={row.col_name}>
                                <TableCell>
                                    {row.col_name}
                                </TableCell>
                                <TableCell>
                                    {row.data_type}
                                </TableCell>
                                <TableCell>
                                    {row.description}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    );
}

export default DataDictionary;
