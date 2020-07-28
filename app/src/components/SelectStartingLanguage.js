import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import languages from "../media/languages.json"

const useStyles = makeStyles((theme) => ({
	formControl: {
        margin: theme.spacing(1),
        minWidth: 150
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export default function SimpleSelect() {
	const classes = useStyles();

	return (
		<div>
			<FormControl variant="filled" className={classes.formControl}>
				<InputLabel id="demo-simple-select-filled-label"> {"Starting Language"} </InputLabel>
				<Select
					labelId="demo-simple-select-filled-label"
					id="demo-simple-select-filled"
                    defaultValue={sessionStorage.getItem("startingLanguageCode") || "str"}
                    onClose={()=>{console.log()}}
					onChange={(e) => {
						sessionStorage.setItem("startingLanguageCode", e.target.value );
						window.location.reload();
					}}
				>
					<MenuItem value={"str"}>Greek</MenuItem>;
					{languages.map((lang) => {
						return (
							<MenuItem key={lang.id} value={lang.code}>
								{lang.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</div>
	);
}
