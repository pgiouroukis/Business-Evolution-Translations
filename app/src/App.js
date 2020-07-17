import React from "react";
import "./App.css";

//general imports
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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

	return (
		<div className="App">
			<PrimarySearchAppBar />
			{list.map((val) => {
				return (
					<Grid container spacing={3}>
						<Grid item sm={1}></Grid>
						<Grid item sm={4} xs={12}>
							<CardStatic text={val} translateButton={true} />
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
