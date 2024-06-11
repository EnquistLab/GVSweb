import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Cite from 'citation-js';

import { requestCitations, requestMeta } from "../actions/";

import {
    Layout,
    BibTexDialog
} from "../components/";

export default function Index() {
    let [groupedCitations, setGroupedCitations] = useState({});
    let [metaState, setMetaState] = useState("");

    useEffect(() => {
        async function fetchCitations() {
            let citationsResponse = await requestCitations();
            let metaResponse = await requestMeta();
            let acknowledgmentUsed = false; // Flag to track if acknowledgment header has been used

            let formattedCitations = citationsResponse.map(citation => {
                let cleanedCitation = citation.citations.citation.replace(/\\n/g, " ");
                let parsed = new Cite(cleanedCitation);

                let formatted = parsed.format('bibliography', {
                    format: 'html',
                    template: 'apa',
                    lang: 'en-US'
                });

                return {
                    source: citation.citations.source,
                    parsed: parsed,
                    raw: citation.citations.citation,
                    formatted: formatted
                };
            });

            // Group citations by source and manage headers
            const groupedBySource = formattedCitations.reduce((acc, citation) => {
                const source = citation.source;
                if (!acc[source]) {
                    acc[source] = {
                        header: getHeaderForSource(source, acknowledgmentUsed),
                        citations: []
                    };
                    // Ensure acknowledgment header is only used once
                    if (acc[source].header === "Acknowledge the NSR data sources as follows:") {
                        acknowledgmentUsed = true;
                    }
                }
                acc[source].citations.push(citation);
                return acc;
            }, {});

            setGroupedCitations(groupedBySource);

            try {
                setMetaState(metaResponse[0].meta.code_version);
            } catch (error) {
                console.log("Error getting metadata from API");
            }
        }
        fetchCitations();
    }, []);

    const getHeaderForSource = (source, acknowledgmentUsed) => {
        if (source === 'nsr.pub') {
            return "Please cite the NSR application itself:";
        } else if (source === 'nsr.app') {
            return "If results derived from the NSR are used in a publication, please cite the NSR publication:";
        } else if (!acknowledgmentUsed) {
            return "Acknowledge the NSR data sources as follows:";
        }
        return "";
    };

    return (
        <Layout>
            <Typography variant="h3" gutterBottom>
                How to Cite the NSR
            </Typography>

            {Object.keys(groupedCitations).map((source, index) => (
                <div key={index}>
                    <Typography variant="h5" gutterBottom style={{marginTop: '20px', fontWeight: 'bold'}}>
                        {groupedCitations[source].header}
                    </Typography>
                    {groupedCitations[source].citations.map((citation, citationIndex) => (
                        <div key={citationIndex}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: citation.formatted,
                                }}
                            ></div>
                            <BibTexDialog displayText={citation.raw} />
                            <br />
                        </div>
                    ))}
                </div>
            ))}

            <Typography variant="h6">
                API Version
            </Typography>
            <Typography variant="body1" gutterBottom>
                {metaState}
            </Typography>
        </Layout>
    );
}
