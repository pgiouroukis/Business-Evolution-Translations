import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import languages from "../media/languages.json";

export default function ButtonAppBar() {
	const classes = useStyles();

	const [selectVal, setSelectVal] = useState(sessionStorage.getItem("languageId"));

	const handleChange = (event) => {
        sessionStorage.setItem("languageId", event.target.value);
        setSelectVal(event.target.value);
        window.location.reload();
	};

	useEffect(() => {}, [selectVal]);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Business Evolution Translate
					</Typography>

					<FormControl className={classes.formControl}>
						<InputLabel id="demo-simple-select-label">Language</InputLabel>
						<Select
							onChange={handleChange}
							defaultValue={selectVal}
							labelId="demo-simple-select-label"
							id="demo-simple-select"
						>
							{languages &&
								languages.map((lang) => {
									return <MenuItem key={lang.id} value={lang.id}>{lang.name}</MenuItem>;
								})}
						</Select>
					</FormControl>
				</Toolbar>
			</AppBar>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));
