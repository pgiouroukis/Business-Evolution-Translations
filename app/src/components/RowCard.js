import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

import CardStatic from "./CardStatic";
import CardDynamic from "./CardDynamic";


export default function RowCard(props) {

	return (
		<div>
			<Grid container spacing={0} style={props.style}>
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
					<CardDynamic
						val={props.val}
						code={props.code}
						translateButton={false}
						saveButton={true}
					/>
				</Grid>
				<Grid item sm={1}></Grid>
			</Grid>
			<Box display={{ xs: "block", sm: "none", md: "none" }}>
				<Divider style={{ margin: "15px" }} />
			</Box>
		</div>
	);
}
