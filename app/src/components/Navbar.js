import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

//general imports
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";

//custom components and media
import NavbarDrawer from "../components/NavbarDrawer"
import languages from "../media/languages.json";

export default function ButtonAppBar() {
	const classes = useStyles();

    const [selectVal, setSelectVal] = useState(sessionStorage.getItem("languageId"));

	const handleChange = (event) => {
        sessionStorage.setItem("languageId", event.target.value);
        setSelectVal(event.target.value);
        window.location.reload();
	};

	return (
		<div className={classes.root}>
			<AppBar position="fixed">
				<Toolbar>
					<NavbarDrawer />
                    <Typography>Current Page: {sessionStorage.getItem("page")}</Typography>
					<Typography variant="h6" className={classes.title}>
						<Box display={{ xs: 'none', sm: 'block', md: 'block' }}>Business Evolution Translate</Box>
					</Typography>

					<FormControl className={classes.formControl}>
						<InputLabel  id="demo-simple-select-label">Language</InputLabel>
						<Select
							onChange={handleChange}
							defaultValue={selectVal}
							labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            style={{color:"white"}}
						>
							{languages &&
								languages.map((lang) => {
									return (
										<MenuItem key={lang.id} value={lang.id}>
											{lang.name}
										</MenuItem>
									);
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
        minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));
