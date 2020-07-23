import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

//icons
import DoneIcon from "@material-ui/icons/Done";
import RemoveIcon from "@material-ui/icons/Remove";
import SaveIcon from "@material-ui/icons/Save";

export default function SimpleCard(props) {
	const classes = useStyles();

    var [val, setVal] = useState(props.val || "")
    var [icon, setIcon] = useState(<div></div>);

    useEffect(() => {
        if (props.val === "" || (props.val === undefined && val === "")) 
            {setIcon(<RemoveIcon style={{ color: "gray" }} fontSize="large" />); return}
        if (val === props.val) 
            {setIcon(<DoneIcon style={{ color: "green" }} fontSize="large" />); return}
        if (val !== props.val || (props.val === undefined && val !== "")) 
            {setIcon(<SaveIcon style={{ color: "gray" }} fontSize="large" />); return}
    } , [val, props.val])

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
            setIcon(<DoneIcon style={{ color: "green" }} fontSize="large" />);
        });        

    }

	return (
		<Card raised className={classes.root} style={{ margin: "10px" }}>
			<CardContent>
				<Typography variant="h5" component="h2">
					<TextareaAutosize
                        variant="filled"
						style={{ width: "50%", color: (props.val === undefined || props.val!== val ? "black" : "green") }}
						aria-label="empty textarea"
						placeholder="Empty"
						value={val}
						onChange={(e) => {
							setVal(e.target.value);
						}}
					/>
				</Typography>
			</CardContent>
			<Grid container spacing={3}>
				<Grid item container xs={12} sm={5} md={6} justify="flex-start">
					<CardActions>{icon}</CardActions>
				</Grid>
				<Grid item container xs={12} sm={5} md={6} justify="flex-end">
					<CardActions>
						{props.translateButton && (
							<Button variant="outlined" color="primary">
								Google Translate It.
							</Button>
						)}
						{props.saveButton && (
							<Button variant="outlined" color="primary" onClick={handleSave}>
								Save Translation.
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
