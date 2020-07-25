import React, {useEffect, useState} from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

export default function TemporaryDrawer() {
    
    const classes = useStyles();
    const [state, setState] = useState({left: false,});
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        fetch("http://pgiouroukis.semantic.gr:9000/listAll")
		.then((response) => response.json())
		.then((data) => {
            var list = [];
            var count = data.length
            var batch = parseInt(sessionStorage.getItem("batch"));
            var max = count/batch

            for (var i=0; i< max ; i++) {
                var flag = true;
                var missingTranslations= 0;
                for (var j=0; j<batch; j++) {
                    var languageCode = sessionStorage.getItem("languageCode");
                    if (data[i*batch+j]!==undefined)
                        if ( data[i*batch+j][ languageCode ] === undefined || data[i*batch+j][languageCode] === "" ) {
                            flag = false;
                            missingTranslations++;
                        }
                }
                list.push({"page" : String(i + 1), "full" : flag, "progress" : batch-missingTranslations + "/" + batch});
            }
            if (count%batch)
                list.push({"page" : String(i + 1), "full" : false, "progress" : 0 + "/" + batch}); //last list item that contains fewer literals
            setListItems(list)
        });               
    },[])

	const toggleDrawer = (anchor, open) => (event) => {
		if ( event.type === "keydown" &&(event.key === "Tab" || event.key === "Shift")) return;
		setState({ ...state, [anchor]: open });
	};

	const list = () => (
		<div
			className={clsx(classes.list)}
			onClick={toggleDrawer("left", false)}
			onKeyDown={toggleDrawer("left", false)}
		>
			<List>
				{listItems.map((item) => (
                    <ListItem button key={item["page"]} 
                        onClick={() => {
                            sessionStorage.setItem("page", item["page"])
                            window.location.reload();
                        }}
                    >
						<Grid container>
							<Grid item xs={2} style={{ verticalAlign: "center" }}>
								<ListItemText primary={item["full"] ? "🟢" : "🔴"} />
							</Grid>
							<Grid item container xs={7} justify="flex-start">
								<ListItemText primary={"Σελίδα "+item["page"]} />
							</Grid>
							<Grid item container xs={3} justify="flex-start">
								<ListItemText primary={item["progress"]} />
							</Grid>
						</Grid>
					</ListItem>
				))}
			</List>
			<Divider />
		</div>
	);

	return (
		<div>
			<React.Fragment key={"left"}>
				<IconButton onClick={toggleDrawer("left", true)}  color="inherit">
					<MenuIcon />
				</IconButton>
				<Drawer open={state["left"]} onClose={toggleDrawer("left", false)}>
					{list()}
				</Drawer>
			</React.Fragment>
		</div>
	);
}

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: "auto",
	},
});