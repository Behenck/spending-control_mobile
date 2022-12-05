import { Text, HStack, Box, useTheme } from 'native-base';
import { CaretLeft, CaretRight, Plus } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

import { color } from 'native-base/lib/typescript/theme/styled-system';
import { ButtonIcon } from '../../ButtonIcon';

interface Props {
  title: string;
  showBackButton?: boolean;
  showAddButton?: boolean;
  onShare?: () => void;
}

export function ChangeMonth({ title, showBackButton = false, showAddButton = false, onShare }: Props) {

  const { navigate } = useNavigation();

  const { colors } = useTheme();

  const EmptyBoxSpace = () => (<Box w={6} h={6} />);

  return (
    <HStack w="full" h={24} alignItems="flex-end" pb={5} px={5}>
      <HStack w="full" alignItems="center" justifyContent="center" space={10}>
        <ButtonIcon color="white" icon={CaretLeft}/>

        <Text color="white" fontFamily="medium" fontSize="md" textAlign="center">
          {title}
        </Text>

        <ButtonIcon color="white" icon={CaretRight}/>
      </HStack>
    </HStack>
  );
}