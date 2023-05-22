import "../scss/file-uploader.css";
import {useState} from "react";

export const FileUploader = () => {

    const [files, setFiles] = useState(null);

    return (
        <section className={"file-uploader"}>
            {!files && (
                <div className={"file-uploader__dropzone"}>
                    <h2>Drag and Drop a file</h2>
                </div>
            )}
        </section>
    );
}