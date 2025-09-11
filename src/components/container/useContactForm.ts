import type { langKeyType } from "@/types/data/returnType";
import { actions, isInputError } from "astro:actions";
import { useState } from "react";

export default function useContactForm() {
    const [errors, setErrors] = useState<Array<string>>([]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>, lang: langKeyType) => {
        e.preventDefault()
        setErrors([]);

        const formData = new FormData(e.currentTarget)
        const actionStragery = {
          vi: () => actions.contactVi(formData),
          en: () => actions.contactEn(formData)
        }
        const { data, error } = await actionStragery[lang]()

        if (data?.message) {
          alert(data.message)
        }
        
        if (error && isInputError(error)) {
          const fields = error.fields;
          const newErrors: string[] = [];

          if (fields.email) newErrors.push(...fields.email);
          if (fields.firstName) newErrors.push(...fields.firstName);
          if (fields.lastName) newErrors.push(...fields.lastName);
          if (fields.type) newErrors.push(...fields.type);
          if (fields.message) newErrors.push(...fields.message);

          setErrors(newErrors);
        }

        if (error?.message) {
          setErrors([error.message]);
        }
    }

    return {
        onContactSubmit: onSubmit,
        errorsContact: errors
    }
}