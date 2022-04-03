import { useState , useCallback} from 'preact/hooks';

interface FormState<T> {
    values: T;
    errors: Record<keyof T | string, string | null> | any;
}
type SubmitFn<T> = (data: FormState<T>['values']) => void;

function useForm <T>(submit: SubmitFn<T>, initValues: T, validation: (value: string ) => string | null) {

    const initState = {
        values: initValues,
        errors: {}
    }

    const [formState, setFormState] = useState<FormState<T>>(initState);

    const onInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const inputName = target.name;
        const newValues = { ...formState.values, [inputName]: target.value };
        setFormState({ ...formState, values: newValues });
    };

    const onBlur = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const inputName = target.name;
        const error = validation(target.value);
        const newErrors = { ...formState.errors, [inputName]: error }
        setFormState({ ...formState, errors: newErrors });
    };

    const onSubmit = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        const errorsList = validateAll<T>(formState.values);
        if (errorsList) {
            setFormState({ ...formState, errors: errorsList })
        } else {
            submit(formState.values);
        }
    }

    const reset = () => {
        setFormState(initState);
    }

    const validateAll = useCallback(<Type,>(values: Type) => {
        const valuesArray = Object.entries(values);
        let isValid = true;
        let allErrors = {};
        for (const [key, value] of valuesArray) {
            const error = validation(value);
            if (error) {
                isValid = false;
                allErrors = { ...allErrors, [key]: error };
            }
        }
        return isValid ? null : allErrors;
    }, [validation]);

    return ({
        values: formState.values, errors: formState.errors, onInput, onBlur, onSubmit, reset
    });
}



export default useForm;