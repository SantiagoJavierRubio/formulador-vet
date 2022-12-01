import { useState, ChangeEvent } from "react";
import type { ZodObject, ZodError } from "zod";

interface IError {
  [x: string]: string;
}

export function useForm<T>({
  initialValues,
  validationSchema,
}: {
  initialValues: T;
  validationSchema?: ZodObject<any>;
}) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ZodError | IError>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let parsedValue: string | number =
      e.target.type === "number"
        ? parseFloat(e.target.value) || 0
        : e.target.value || "";
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: parsedValue,
    }));
    const zodErrs = validationSchema?.safeParse({
      ...values,
      [e.target.name]: parsedValue,
    });
    zodErrs && !zodErrs?.success && setErrors(zodErrs.error);
  };
  return { values, errors, handleChange };
}
