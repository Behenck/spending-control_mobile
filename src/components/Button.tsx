import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

interface Props extends IButtonProps {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY' | 'SUCCESS';
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === 'SECONDARY' ? 'red.500' : type === 'SUCCESS' ? 'green.400' : 'blue.800'}
      _pressed={{
        bg: type === 'SECONDARY' ? "red.500" : type === 'SUCCESS' ? 'green.400' : 'blue.900'
      }}
      _loading={{
        _spinner: { color: "black" }
      }}
      {...rest}
    >
      <Text
        fontSize="lg"
        fontFamily="heading"
        color="white"
      >
        {title}
      </Text>
    </ButtonNativeBase >
  );
}