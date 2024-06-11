import React, { useState, useEffect } from "react";
import { Layout } from "../components/";
import { requestDataDictionary, requestNativeStatusCodes } from "../actions/";
import { Typography, Table, TableBody, TableContainer, TableHead, TableCell, TableRow } from "@mui/material";

function DataDictionary() {
    const [dataDict, setDataDict] = useState([]);
    const [nativeStatusCodes, setNativeStatusCodes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const ddResponse = await requestDataDictionary();
                const nsResponse = await requestNativeStatusCodes();
                console.log(nsResponse);

                if (ddResponse && Array.isArray(ddResponse)) {
                    setDataDict(ddResponse.map(item => item.dd));
                }
                if (nsResponse && Array.isArray(nsResponse)) {
                    setNativeStatusCodes(nsResponse.map(item => ({
                        code: item.dd_ns.val,
                        description: item.dd_ns.description
                    })));
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchData();
    }, []);


    return (
        <Layout>
            <Typography variant="h2">Data Dictionary</Typography>
            <br/>
            <br/>
            <Typography variant="h4" gutterBottom><strong>Native Status Codes</strong></Typography>
            <hr/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Status Code</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nativeStatusCodes.length > 0 ? (
                            nativeStatusCodes.map((code, index) => (
                                <TableRow key={index}>
                                    <TableCell>{code.code}</TableCell>
                                    <TableCell>{code.description}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} align="center">No data available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <br/>
            <br/>

            <Typography variant="h4" gutterBottom>
                <strong>
                    Definitions of NSR Results Fields
                </strong>
            </Typography>
            <hr/>

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
                        {dataDict.length > 0 ? (
                            dataDict.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.col_name}</TableCell>
                                    <TableCell>{row.data_type}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">No data available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    );
}

export default DataDictionary;
