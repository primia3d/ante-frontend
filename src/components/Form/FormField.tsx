import { FieldValues, FieldPath, ControllerProps, Controller } from 'react-hook-form';

import { FormFieldContext } from './FormFieldContext';

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}
