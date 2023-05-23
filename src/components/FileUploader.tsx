import "../scss/file-uploader.css";
import React, {Dispatch, SetStateAction, useRef, useState} from "react";

export const FileUploader = (props : {
    fileState: [FileList, Dispatch<SetStateAction<FileList>>]
}) => {

    const [file, setFile] = props.fileState;
    const [info, setInfo] = useState("");
    const [payload, setPayload] = useState({data: [] as { [key: string]: string }[]});
    const [predictions, setPredictions] = useState(null);
    const inputRef = useRef(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log(e.dataTransfer);
        setFile(e.dataTransfer.files);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        setFile(input.files || {} as FileList);
    };

    const processCSV = async () => {
        const reader = new FileReader();
        reader.onload = async () => {
            const csvData = reader.result as string;

            const lines = (csvData as string).split('\n');
            const headers = lines[0].split(',');
            const data = [];

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',');
                const entry: { [key: string]: string } = {};

                for (let j = 0; j < headers.length; j++) {
                    entry[headers[j]] = values[j];
                }

                data.push(entry);
            }

            setPayload({data});
        };

        await reader.readAsText(file[0]);
    }

    const sendRequest = async () => {
        return await fetch("https://us-accidents.onrender.com/multiplePredict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(payload)
        }).then(res => res.json());
    }

    const handlePredict = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setInfo("Processing data...");
        await processCSV();
        console.log(payload);
        setInfo("Predicting...");
        const response = await sendRequest();

        setPredictions(response);
        console.log(predictions);
    };

    return (
        <section className={"file-uploader"}>
            {!predictions ? (
                <div onDragOver={handleDragOver} onDrag={handleDrop} className={"file-uploader__dropzone"}>
                    <h2>{(file[0] as File) === undefined ? "Drag and Drop a file (not working)" : <>{`Selected "${(file[0] as File).name}"`}<br/><span>(press the "Browse" button to change)</span></>}</h2>
                    <input type={"file"} accept={".csv"} onChange={handleChange} hidden ref={inputRef}/>
                    <p>(Or click "Browse" to add one)</p>
                    <button onClick={() => (inputRef.current as unknown as HTMLInputElement).click()}>Browse
                    </button>
                </div>
            ) : (
                <div>
                </div>
            )}
            <button className={"file-uploader__submit"} onClick={handlePredict}>Predict</button>
            <p>{info}</p>
        </section>
    );
}