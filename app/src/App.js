import React, { useEffect, useState } from "react";
import "./App.css";

//general imports
import PrimarySearchAppBar from "./components/Navbar";
import languages from "./media/languages.json"

//custom components
import RowCard from "./components/RowCard";

function App() {

    var [records, setRecords] = useState([])
    var [languageCode, setLanguageCode] = useState("");

    useEffect(() => {

        if (sessionStorage.getItem("languageId") === null) {
            sessionStorage.setItem("languageId", "0");
            sessionStorage.setItem("languageCode", "en");
        }

        for (var language of languages) {
            if (language.id === sessionStorage.getItem("languageId")) {
                setLanguageCode(language.code);
                sessionStorage.setItem("languageCode", language.code);
                break;
            }

        }

        fetch("http://pgiouroukis.semantic.gr:9000/list/100")
		.then((response) => response.json())
		.then((data) => {
            setRecords(data)
        });        
    } , [] )

	return (
		<div className="App">
			<PrimarySearchAppBar />
			<div>
				{records.map((record) => {
				return (
                    <RowCard
                        key={record.code}
						str={record.str}
						code={record.code}
						translateButton={false}
                        saveButton={true}
                        val={record[languageCode]}
                    />
                );
			})}
			</div>
		</div>
	);
}


export default App;
