import React, { useEffect, useState } from "react";
import "./App.css";

//general imports
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "./components/Navbar";

import CardStatic from "./components/CardStatic";
import CardDynamic from "./components/CardDynamic";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

function App() {

    var list = ["keimenaki 1", "keimanki 2", "keimanaki 3"];
    var [records, setRecords] = useState([])

    useEffect(() => {
        fetch("http://pgiouroukis.semantic.gr:9000/listAll")
		.then((response) => response.json())
		.then((data) => {
            setRecords(data)
        });        
    } , [] )

	return (
		<div className="App">
			<PrimarySearchAppBar />
			{records.map((record) => {
				return (
					<Grid container spacing={3}>
						<Grid item sm={1}></Grid>
						<Grid item sm={4} xs={12}>
							<CardStatic text={record.str} translateButton={true} code={record.code} />
						</Grid>
						<Grid item sm={1}></Grid>

						<Grid item sm={1}></Grid>
						<Grid item sm={4} xs={12}>
							<CardDynamic translateButton={false} saveButton={true} />
						</Grid>
						<Grid item sm={1}></Grid>
					</Grid>
				);
			})}
		</div>
	);
}

export default App;
