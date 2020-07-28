import React, { useEffect, useState } from "react";
import "./App.css";

//general imports
import languages from "./media/languages.json"

//custom components
import PrimarySearchAppBar from "./components/Navbar";
import Toolbar from "@material-ui/core/Toolbar";
import RowCard from "./components/RowCard";
import Footer from "./components/Footer";

function App() {

    var [records, setRecords] = useState([])
    var [languageCode, setLanguageCode] = useState("");

    useEffect(() => {

        if (sessionStorage.getItem("languageId") === null) { //first time loading the session
            sessionStorage.setItem("languageId", "0"); //target language
            sessionStorage.setItem("languageCode", "en");
            sessionStorage.setItem("startingLanguageId", "-1"); //starting language (-1 stands for greek)
            sessionStorage.setItem("startingLanguageCode", "str");  //str stands for greek too
            sessionStorage.setItem("page" , "1");
            sessionStorage.setItem("batch", "100");
        }

        for (var language of languages) { //getting the code for the id of the language e.g. id=0, code="en"
            if (language.id === sessionStorage.getItem("languageId")) {
                setLanguageCode(language.code);
                sessionStorage.setItem("languageCode", language.code);
                break;
            }

        }
        //defaults to http://pgiouroukis.semantic.gr:9000/listForeign/str/100/1
        fetch("http://pgiouroukis.semantic.gr:9000/listForeign/" + sessionStorage.getItem("startingLanguageCode") + "/" + sessionStorage.getItem("batch") +"/" + sessionStorage.getItem("page"))
		.then((response) => response.json())
		.then((data) => {
            var startingLanguage = sessionStorage.getItem("startingLanguageCode");
            if (startingLanguage !== "str") //"str" means greek
                data = data.filter((entry) => (entry[startingLanguage]!==undefined?entry:undefined) ) //filtering only the starting language entries
            console.log(data);
            setRecords(data);
        });
    } , [] )

	return (
		<div className="App">
			<PrimarySearchAppBar />
			<Toolbar />{" "}
			{/* removing this will cause an overlay between the first card and the AppBar */}
            {records.map((record,idx) => {
                return (
                    <RowCard
                        key={record.code}
                        str={record[sessionStorage.getItem("startingLanguageCode")]}
                        code={record.code}
                        translateButton={false}
                        saveButton={true}
                        val={record[languageCode]}
                    />
                );
            })}
			<Footer />
		</div>
	);
}


export default App;
