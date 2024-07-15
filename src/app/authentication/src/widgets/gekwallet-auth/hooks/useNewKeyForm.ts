import { useContext } from "react";
import { NewKeyContext } from "../model/NewKeyContext";

export default function useNewKeyForm() {
    const {opened, setOpened} = useContext(NewKeyContext)

    const openForm = () => {
        setOpened(true)
    }
    const closeForm = () => {
        setOpened(false)
    }

    return {opened, openForm, closeForm}
}