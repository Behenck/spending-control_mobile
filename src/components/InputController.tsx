import { FormControl, Text } from "native-base";
import { FormControlComponentType } from "native-base/lib/typescript/components/composites/FormControl/types";
import { Control, Controller } from "react-hook-form";
import { Input } from "./Input";

interface Props {
  title: string;
  control: Control<{
    price?: string;
    description?: string;
    title?: string;
    dueDate?: Date;
  }, any>
  errors: any;
  placeholder: string
  name: any
  flex?: number
  isDisabled?: boolean
}

export function InputController({ name, title, control, errors, placeholder, flex, isDisabled }: Props) {
  return (
    <FormControl flex={flex}>
      <Text bold>{title}</Text>
      <Controller 
        control={control}
        render={({ field: {onChange, onBlur, value} }) => (
          <Input 
            placeholder={placeholder} 
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            errorMessage={errors}
            isDisabled={isDisabled}
          />
        )}
        name={name}
        defaultValue=""
      />
    </FormControl>
  )
}