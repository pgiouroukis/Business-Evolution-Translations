import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export default function SimpleCard(props) {
	const classes = useStyles();

	return (
		<Card raised className={classes.root} style={{ margin: "10px" }}>
			<CardContent>
				<Typography variant="h5" component="h2">
					<TextareaAutosize
						style={{ width: "50%" }}
						aria-label="empty textarea"
						placeholder="Empty"
					/>
				</Typography>
			</CardContent>
			<Grid container justify="flex-end">
				<CardActions>
					{props.translateButton && (
						<Button variant="outlined" color="primary">
							Google Translate It.
						</Button>
					)}
					{props.saveButton && (
						<Button variant="outlined" color="primary">
							Save Translation.
						</Button>
					)}
				</CardActions>
			</Grid>
		</Card>
	);
}

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
