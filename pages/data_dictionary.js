import { useState, useEffect, React } from "react";
import { Layout } from "../components/";
import { requestDataDictionary, requestConstrainedVocabulary } from "../actions/";
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
    const [constrainedVocabulary, setConstrainedVocabulary] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let dd = await requestDataDictionary();
            let cv = await requestConstrainedVocabulary();
            console.log(dd);
            console.log(cv);
            setDataDict(dd.filter(item => item.mode !== "err_msg"));
            setConstrainedVocabulary(cv);
        }
        fetchData();
    }, []);

    return (
        <Layout>
            <Typography variant='h3'>Data Dictionary</Typography>
            <br/>
            <Typography variant="body1" gutterBottom align="justify">
                Names and definitions of output fields returned by the GVS.
            </Typography>
            <br/>
            <br/>
            <Typography variant='h4'>Output Fields and Definitions</Typography>
            <br/>
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
            <br/>
            <br/>

            {constrainedVocabulary.length > 0 && (
                <>
                    <Typography variant='h4'>Constrained Vocabulary Definitions</Typography>
                    <br/>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Value</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {constrainedVocabulary.map((row) => (
                                    <TableRow key={row.value}>
                                        <TableCell>
                                            {row.value}
                                        </TableCell>
                                        <TableCell>
                                            {row.description}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Layout>
    );
}

export default DataDictionary;
