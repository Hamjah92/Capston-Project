import { useEffect } from "react";
import { DeepMap, FieldError, UseFormSetFocus } from "react-hook-form";

type Props = {
  errors: DeepMap<any, FieldError>
  setFocus: UseFormSetFocus<any>
}

export const useErrorFocus = ({ errors, setFocus }: Props) => {
  useEffect(() => {
    if (Object.keys(errors).length === 0) return
    const firstError = (
      Object.keys(errors) as Array<keyof typeof errors>
    ).find((field) => {
      const fieldKey = field as keyof typeof errors;
      return errors[fieldKey] ? fieldKey : null
    });

    if (firstError) {
      setFocus(firstError as string);
    }
  }, [errors, setFocus]);

}