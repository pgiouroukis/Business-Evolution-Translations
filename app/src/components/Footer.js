import React from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

function Footer({ children }) {

    function handleRightArrow() {
			sessionStorage.setItem(
				"page",
				String(parseInt(sessionStorage.getItem("page")) + 1)
			);
			window.location.reload();
		}

    function handleLeftArrow() {
        if (parseInt(sessionStorage.getItem("page")) > 1) {
            sessionStorage.setItem(
                "page",
                String(parseInt(sessionStorage.getItem("page")) - 1)
            );
            window.location.reload();
        }
    }

	return (
		<div>
			<div style={phantom} />
			<div style={style}>
				<Grid container spacing={3}>
					<Grid item container xs={6} sm={6} justify="flex-start">
						<Fab
							color="primary"
							style={{ pointerEvents: "auto" }}
							aria-label="add"
							onClick={handleLeftArrow}
						>
							<ChevronLeftIcon fontSize="large" />
						</Fab>
					</Grid>
					<Grid item container xs={6} sm={6} justify="flex-end">
						<Fab
							color="primary"
							style={{ pointerEvents: "auto" }}
							aria-label="add"
							onClick={handleRightArrow}
						>
							<ChevronRightIcon fontSize="large" />
						</Fab>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Footer;


			

var style = {
	backgroundColor: "rgba(255, 0, 0, 0.01)",
	textAlign: "center",
	position: "fixed",
	left: "0",
	bottom: "0",
	height: "60px",
	width: "100%",
	pointerEvents: "none",
};

var phantom = {
	display: "block",
	height: "60px",
	width: "100%",
};