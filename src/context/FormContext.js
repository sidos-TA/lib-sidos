import { createContext, useContext } from "react";

const FormContext = createContext({});

export const useFormContext = () => useContext(FormContext);

export default FormContext;
