import {Input} from "./Input";
import "../scss/form.css";
import React from "react";

export const Form = () => {

    const formPetition = async (form: HTMLFormElement) => {
        const payload = {
            "data": [
                {
                    "Clear": form.petClear.value,
                    "Distance(mi)": form.petDistance.value,
                    "City_Freq": form.petCityFreq.value,
                    "State_Freq": form.petStateFreq.value,
                    "Day_of_Year": form.petDayOfYear.value,
                    "Temperature(F)": form.petTemperature.value,
                    "Wind_Speed(mph)": form.petWindSpeed.value
                }
            ]
        };

        const res = await fetch("http://13d82b37-284c-42a6-8a7a-fbe5a48650f1.eastus2.azurecontainer.io/score", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(payload)
        }).then(res => res.json());

        console.log(res);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = (e.target as HTMLFormElement);
        await formPetition(form);
    };

    return (
        <form className={"form"} onSubmit={e => handleSubmit(e)}>
            <Input type={"number"} label={"Clear"} name={"petClear"} />
            <Input type={"number"} label={"Distance"} name={"petDistance"} />
            <Input type={"number"} label={"City Frequency"} name={"petCityFreq"} />
            <Input type={"number"} label={"State Frequency"} name={"petStateFreq"} />
            <Input type={"number"} label={"Day of the Year"} name={"petDayOfYear"} />
            <Input type={"number"} label={"Temperature (F)"} name={"petTemperature"} />
            <Input type={"number"} label={"Wind Speed (mph)"} name={"petWindSpeed"} />
            <input type={"submit"} className={"form__submit"}/>
        </form>
    );
}