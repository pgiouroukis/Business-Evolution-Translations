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
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import SelectStartingLanguage from "../components/SelectStartingLanguage";

export default function TemporaryDrawer() {
    
    const classes = useStyles();
    const [state, setState] = useState({left: false,});
    const [listItems, setListItems] = useState([]);
    const [batchSize, setBatchSize] = useState(parseInt(sessionStorage.getItem("batch")) || 100);

    useEffect(() => {
        fetch("http://pgiouroukis.semantic.gr:9000/listAllForeign/" + (sessionStorage.getItem("startingLanguageCode") || "str"))
		.then((response) => response.json())
		.then((data) => {
            var list = [];
            var count = data.length
            var batch = parseInt(sessionStorage.getItem("batch"));
            var max = count/batch
            for (var i=0; i< parseInt(max) ; i++) {
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
                list.push({"page" : String(i + 1), "full" : false, "progress" : ""}); //last list item that contains fewer literals

            console.log(list)
            setListItems(list)
        });               
    }, [])

	const toggleDrawer = (anchor, open) => (event) => {
		if ( event.type === "keydown" &&(event.key === "Tab" || event.key === "Shift")) return;
		setState({ ...state, [anchor]: open });
	};

	const list = () => (
		<div className={clsx(classes.list)}>
			<List>
                <ListItem>
                    <SelectStartingLanguage/>
                </ListItem>
                <Divider/>
				<ListItem>
					<Grid container>
						<Grid item container xs={4} sm={4} justify={"flex-start"}>
							Batch:{"   "}
						</Grid>
						<Grid item container xs={2} sm={2}>
							<Input variant="filled" onChange={(e)=>{setBatchSize(e.target.value)}} value={batchSize||0} fullWidth id="standard-basic" label="Standard" />
						</Grid>
                        <Grid item container xs={2} sm={2}></Grid>
						<Grid item container xs={4} sm={4} justify={"flex-end"}>
                            <Button variant="contained" color="primary"
                                 onClick={()=>{
                                    sessionStorage.setItem("batch", String(batchSize))
                                    window.location.reload();
                                }} 
                            >    
                                Save
                            </Button>
						</Grid>
					</Grid>
				</ListItem>
				<Divider />
				{listItems.map((item) => (
					<ListItem
						button
						key={item["page"]}
						onClick={() => {
							toggleDrawer("left", false);
							sessionStorage.setItem("page", item["page"]);
							window.location.reload();
						}}
					>
						<Grid container>
							<Grid item xs={2} style={{ verticalAlign: "center" }}>
								<ListItemText primary={item["full"] ? "🟢" : "🔴"} />
							</Grid>
							<Grid item container xs={7} justify="flex-start">
								<ListItemText primary={"Page " + item["page"]} />
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