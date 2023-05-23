import React, {useState} from "react";
import {FileUploader} from "./FileUploader";
import {Form} from "./Form";
import "../scss/query-view.css";

export const QueryView = () => {
    const [bulkMode, setBulkMode] = useState(false);
    const [formState, setFormState] = useState({
        clear : "",
        distance : "",
        cityFreq : "",
        stateFreq : "",
        dayOfYear : "",
        temperature : "",
        windSpeed : "",
    });
    const [fileState, setFileState] = useState({} as FileList);

    const toggleBulkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setBulkMode(!bulkMode);
    };

    return (
        <section className={"query-view"}>
            <section className={"query-view__heading"}>
                <h3>{bulkMode ? "Bulk Mode" : "Individual Mode"}</h3>
                <button onClick={toggleBulkMode} className={"query-view__heading__toggle"}>
                    <span className={"query-view__heading__toggle__track"}/>
                    <span className={`query-view__heading__toggle__bulb query-view__heading__toggle__bulb__${bulkMode ? "active" : "inactive"}`}/>
                </button>
            </section>
            {bulkMode ? (
                <>
                    <FileUploader  fileState={[fileState, setFileState]}/>
                </>
            ) : (
                <>
                    <Form saveState={[formState, setFormState]} />
                </>
            )}
        </section>
    );
}