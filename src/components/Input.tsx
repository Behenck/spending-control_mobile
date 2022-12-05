import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

type Props = IInputProps & {
  errorMessage?: string | null
}

export function Input({ errorMessage, ...rest }: Props) {
  return (
    <FormControl isInvalid>
      <NativeBaseInput
        h={10}
        variant="underlined"
        borderBottomColor="gray.200"
        fontSize="md"
        fontFamily="body"
        color="gray.800"
        placeholderTextColor="gray.300"
        _focus={{
          borderBottomColor: "gray.500",
          fontWeight: "bold"
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}