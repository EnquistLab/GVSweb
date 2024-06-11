import {
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
} from "@mui/material";

export default function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const tableColumns = [
        ["coordinatesSubmitted", "Coordinates Submitted"],
        ["coordinatesResolved", "Coordinates Resolved"],
        ["country", "Country"],
        ["state", "State/Province"],
        ["county", "County/Parish"],
        ["centroid", "Centroid of...?"],
        ["coordinatesStatus", "Coordinates Status"],
    ];

    const tableColumnsJsx = tableColumns.map((names, idx) => {
        return (
            <TableCell key={idx}>
                <TableSortLabel
                    active={orderBy === names[0]}
                    direction={orderBy === names[0] ? order : "asc"}
                    onClick={createSortHandler(names[0])}
                >
                    {names[1]}
                </TableSortLabel>
            </TableCell>
        );
    });

    return (
        <TableHead>
            <TableRow>
                {tableColumnsJsx}
                <TableCell>Details</TableCell>
            </TableRow>
        </TableHead>
    );
}
