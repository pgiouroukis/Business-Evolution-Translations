import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function SimpleCard(props) {
	const classes = useStyles();
    
    function handleClick() {
        fetch("http://pgiouroukis.semantic.gr:9000/googleTranslate", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						literal: props.text,
						target: sessionStorage.getItem("languageCode"),
					}), // body data type must match "Content-Type" header
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });        

    }

    return (
		<Card raised className={classes.root} style={{ margin: "10px" }}>
			<CardContent>
				<Typography variant="h5" component="h2">
					{props.text}
				</Typography>
			</CardContent>
			<Grid container>
				<Grid item xs={6} sm={6} md={6}>
					<CardActions>
						<Typography>Code: {props.code}</Typography>
					</CardActions>
				</Grid>
				<Grid item container xs={6} sm={6} md={6} justify="flex-end">
					<CardActions>
						{props.translateButton && (
							<Button variant="outlined" color="primary" onClick={handleClick}>
								Translate
							</Button>
                        )}
					</CardActions>
				</Grid>
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
