import React from "react";
import Grid from "@material-ui/core/Grid";

import CardStatic from "./CardStatic";
import CardDynamic from "./CardDynamic";


export default function RowCard(props) {

	return (
		<Grid container spacing={0}>
			<Grid item sm={1}></Grid>
			<Grid item sm={4} xs={12}>
				<CardStatic
					text={props.str}
					translateButton={true}
					code={props.code}
				/>
			</Grid>
			<Grid item sm={1}></Grid>

			<Grid item sm={1}></Grid>
			<Grid item sm={4} xs={12}>
				<CardDynamic val={props.val} code={props.code} translateButton={false} saveButton={true} />
			</Grid>
			<Grid item sm={1}></Grid>
		</Grid>
	);
}
