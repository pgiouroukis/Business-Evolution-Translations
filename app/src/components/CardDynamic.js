import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextareaAutosize from "react-textarea-autosize";

export default function SimpleCard(props) {
	const classes = useStyles();

    var [val, setVal] = useState(props.val || "")
    var [icon, setIcon] = useState(props.val !== undefined ? "✔️" : "❌");

    const updateIcons = ((val) => {
        if (props.val === "" || (props.val === undefined && val === "")) 
            {setIcon("❌"); return} //<RemoveIcon style={{ color: "gray" }} fontSize="large" />
        if (val === props.val) 
            {setIcon("✔️"); return} //<DoneIcon style={{ color: "green" }} fontSize="large" />
        if (val !== props.val || (props.val === undefined && val !== "")) 
            {setIcon("💾"); return} //<SaveIcon style={{ color: "gray" }} fontSize="large" />
    })

    function handleSave() {
        fetch("http://pgiouroukis.semantic.gr:9000/addTranslation/" + props.code + "/" + sessionStorage.getItem("languageCode"), {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ literal: val }) // body data type must match "Content-Type" header
        })
        .then((response) => response.json())
        .then((data) => {
            setIcon("✔️");
            return;
        });        

    }

	return (
		<Card raised className={classes.root} style={{ margin: "10px" }}>
			<CardContent>
				<Typography variant="h5" component="h2">
					<TextareaAutosize
						rows={1}
						variant="filled"
						style={{
							fontSize: "25px",
							width: "80%",
							color:
								props.val === undefined || props.val !== val
									? "black"
									: "green",
						}}
						aria-label="empty textarea"
						placeholder="Empty"
						value={val}
						onChange={(e) => {
							setVal(e.target.value);
							updateIcons(e.target.value);
						}}
					/>
				</Typography>
			</CardContent>
			<Grid container>
				<Grid item container xs={6} sm={6} md={6} justify="flex-start">
					<CardActions>
						<Typography variant="h4">{icon}</Typography>
					</CardActions>
				</Grid>
				<Grid item container xs={6} sm={6} md={6} justify="flex-end">
					<CardActions>
						{props.translateButton && (
							<Button variant="outlined" color="primary">
								Google Translate It.
							</Button>
						)}
						{props.saveButton && (
							<Button variant="outlined" color="primary" onClick={handleSave}>
								Save{"\u00A0"}
								<Box display={{ xs: "none", sm: "block", md: "block" }}>
									Translation.{" "}
								</Box>
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
