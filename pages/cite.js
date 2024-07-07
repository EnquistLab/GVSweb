import { React, useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { Layout } from "../components/";
import { requestCitations, requestMeta } from "../actions/";

import Cite from "citation-js";

import {
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link,
} from "@mui/material";

function BibTexDialog({ displayText }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Link href="#" onClick={handleClickOpen}>
                [bibtex]
            </Link>
            <Dialog maxWidth={"md"} fullWidth open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">{"BibTeX entry"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {displayText.split("\n").map((line, index) => {
                            if ((index > 0) & (line !== "}")) {
                                line = "\xa0\xa0\xa0\xa0" + line;
                            }
                            return (
                                <span key={index}>
                  {line}
                                    <br />
                </span>
                            );
                        })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

BibTexDialog.propTypes = {
    displayText: PropTypes.string
};

function CiteApp() {
    let [meta, setMeta] = useState({ code_version: '' });
    let [citations, setCitations] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let meta = await requestMeta();
            setMeta(meta[0] || {});

            let citations = await requestCitations();
            console.log(citations);
            // console.log(citations);
            let gvsPubCitations = [];
            let gvsAppCitations = [];
            let otherCitations = [];

            // Group citations by 'gvs' and others
            citations.forEach(citation => {
                if (citation.source === "gvs.pub") {
                    gvsPubCitations.push(citation);
                } else if (citation.source === "gvs.app") {
                    gvsAppCitations.push(citation);
                } else {
                    otherCitations.push(citation);
                }
            });

            // Process citations for display
            let processedCitations = [];
            if (gvsPubCitations.length > 0) {
                processedCitations.push({
                    header: "If results derived from the GVS are used in a publication, please cite the GVS publication:",
                    citations: gvsPubCitations
                });
            }
            if (gvsAppCitations.length > 0) {
                processedCitations.push({
                    header: "Please cite the GVS application:",
                    citations: gvsAppCitations
                });
            }
            if (otherCitations.length > 0) {
                processedCitations.push({
                    header: "Acknowledge the GVS data sources as follows:",
                    citations: otherCitations
                });
            }

            // Format citations for display
            setCitations(processedCitations.map(group => ({
                header: group.header,
                citations: group.citations.map(citation => {
                    let parsed = new Cite(citation.citation);
                    return parsed.format('bibliography', {
                        format: 'html',
                        template: 'apa',
                        lang: 'en-US'
                    });
                })
            })));
        }
        fetchData();
    }, []);

    return (
        <Layout>
            <Typography variant="h3" gutterBottom>
                How to Cite the GVS
            </Typography>

            {citations.map((group, index) => (
                <div key={index}>
                    <Typography variant="h5" gutterBottom style={{fontWeight: 'bold'}}>
                        {group.header}
                    </Typography>
                    {group.citations.map((citation, citationIndex) => (
                        <div key={citationIndex}>
                            <div dangerouslySetInnerHTML={{ __html: citation }}></div>
                            <BibTexDialog displayText={citation} />
                            <br />
                        </div>
                    ))}
                </div>
            ))}

            <Typography variant="h6">
                API Version
            </Typography>
            <Typography variant="body1" gutterBottom>
                {meta.code_version}
            </Typography>
        </Layout>
    );
}

export default CiteApp;