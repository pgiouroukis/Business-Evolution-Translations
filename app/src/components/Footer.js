import React from "react";

var style = {
	backgroundColor: "rgba(255, 0, 0, 0.01)",
	textAlign: "center",
	position: "fixed",
	left: "0",
	bottom: "0",
	height: "60px",
	width: "100%",
	pointerEvents: "none"
};

var phantom = {
	display: "block",
    height: "60px",
    width: "100%"
};

function Footer({ children }) {
	return (
		<div>
			<div style={phantom} />
			<div style={style}>{children}</div>
		</div>
	);
}

export default Footer;
