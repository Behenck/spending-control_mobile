import { Text, HStack, Box, useTheme } from 'native-base';
import { CaretLeft, Export } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

import { ButtonIcon } from './ButtonIcon';

interface Props {
  title: string;
  showBackButton?: boolean;
}

export function HeaderNew({ title, showBackButton = false }: Props) {

  const { navigate } = useNavigation();
  const { colors } = useTheme()

  const EmptyBoxSpace = () => (<Box w={6} h={6} />);

  return (
    <HStack w="full" h={24} bgColor="blue.800" alignItems="flex-end" pb={5} px={5}>
      <HStack w="full" alignItems="center" justifyContent="space-between">
        {
          showBackButton
            ? <ButtonIcon icon={CaretLeft} color={colors.gray[100]} />
            : <EmptyBoxSpace />
        }

        <Text color="white" fontFamily="medium" fontSize="md" textAlign="center">
          {title}
        </Text>
          
        <EmptyBoxSpace />
      </HStack>
    </HStack>
  );
}