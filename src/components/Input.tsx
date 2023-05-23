import React, {ChangeEventHandler, useState} from "react";
import "./../scss/input.css";

export const Input = (
    props : {
        type : string,
        label : string,
        name : string,
        required? : boolean,
        autoFocus? : boolean,
        actionClick? : React.MouseEventHandler<HTMLButtonElement>,
        color? : string
        value? : string | number,
        onChange? : ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    }
) => {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocusIn = (e: React.FocusEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsFocused(true);
    }

    const handleFocusOut = (e: React.FocusEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsFocused(false);
    }


    return props.type === "area" ? (
        <div tabIndex={1} onFocus={handleFocusIn} onBlur={handleFocusOut}
             className={`input ${isFocused ? "input__focused" : ""}`}>
            <label htmlFor={props.name} className={"input__label"}>{props.label}</label>
            <textarea value={props.value || ''} {...props} className={"input__box"}/>
        </div>
    ) : (
        <div tabIndex={1} onFocus={handleFocusIn} onBlur={handleFocusOut}
             className={`input ${isFocused ? `input__focused__${props.color || ''}` : ""}`}>
            <label htmlFor={props.name} className={"input__label"}>{props.label}</label>
            <input onChange={props.onChange} value={props.value || ''} {...props} step={"any"} className={"input__box"}/>
        </div>
    );
}