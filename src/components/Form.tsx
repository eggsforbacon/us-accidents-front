import {Input} from "./Input";
import "../scss/form.css";
import React, {Dispatch, SetStateAction, useState} from "react";

export const Form = (props: {
    saveState: [{
        clear: string,
        distance: string,
        cityFreq: string,
        stateFreq: string,
        dayOfYear: string,
        temperature: string,
        windSpeed: string,
    }, Dispatch<SetStateAction<{
        clear: string,
        distance: string,
        cityFreq: string,
        stateFreq: string,
        dayOfYear: string,
        temperature: string,
        windSpeed: string,
    }>>]
}) => {

    const [prediction, setPrediction] = useState("");
    const [formState, setFormState] = props.saveState

    const formPetition = async (form: HTMLFormElement) => {
        const payload = {
            "Clear": form.petClear.value,
            "Distance": form.petDistance.value,
            "City_Freq": form.petCityFreq.value,
            "State_Freq": form.petStateFreq.value,
            "Day_of_Year": form.petDayOfYear.value,
            "Temperature": form.petTemperature.value,
            "Wind_Speed": form.petWindSpeed.value
        };

        return await fetch("https://us-accidents.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(payload)
        }).then(res => res.json());
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPrediction("Predicting...");
        const form = (e.target as HTMLFormElement);
        const response = await formPetition(form);
        setPrediction(`Predicted severity: ${(response.prediction as number[])[0]}`)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
        setFormState((formState) => {
            return {
                ...formState,
                [key]: (e.target as HTMLInputElement).value
            }
        })
    };

    return (
        <form className={"form"} onSubmit={e => handleSubmit(e)}>
            <section className={"form__group"}>
                <Input onChange={e => handleChange(e, "clear")} color={"green"} type={"number"} label={"Clear"}
                       name={"petClear"} value={formState.clear}/>
                <Input onChange={e => handleChange(e, "distance")} color={"green"} type={"number"} label={"Distance"}
                       name={"petDistance"}
                       value={formState.distance}/>
            </section>
            <section className={"form__group"}>
                <Input onChange={e => handleChange(e, "cityFreq")} color={"green"} type={"number"}
                       label={"City Frequency"}
                       name={"petCityFreq"}
                       value={formState.cityFreq}/>
                <Input onChange={e => handleChange(e, "stateFreq")} color={"green"} type={"number"}
                       label={"State Frequency"} name={"petStateFreq"}
                       value={formState.stateFreq}/>
            </section>
            <section className={"form__group"}>
                <Input onChange={e => handleChange(e, "dayOfYear")} color={"green"} type={"number"}
                       label={"Day of the Year"} name={"petDayOfYear"}
                       value={formState.dayOfYear}/>
                <Input onChange={e => handleChange(e, "temperature")} color={"green"} type={"number"}
                       label={"Temperature (F)"} name={"petTemperature"}
                       value={formState.temperature}/>
            </section>
            <Input onChange={e => handleChange(e, "windSpeed")} color={"green"} type={"number"}
                   label={"Wind Speed (mph)"}
                   name={"petWindSpeed"}
                   value={formState.windSpeed}/>
            <input type={"submit"} className={"form__submit"} value={"Predict"}/>
            <p>{prediction}</p>
        </form>
    );
}