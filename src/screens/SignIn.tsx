import { Center, Text, Icon, HStack, Flex } from 'native-base';
import { Fontisto } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';

import Logo from '../assets/logo.svg';

import { Button } from '../components/Button';

export function SignIn() {

  const { singIn, isUserLoading } = useAuth();

  return (
    <Center flex={1} bgColor="blue.800" p={7}>
      <Logo width={272} height={50} color='white' />

      <Button 
        type="SECONDARY"
        title="ENTRAR COM GOOGLE"
        leftIcon={<Icon as={Fontisto} name='google' color="white" size="md" />}
        mt={12}
        onPress={singIn}
        isLoading={isUserLoading}
        _loading={{
          _spinner: { color: 'white' }
        }}
      />

      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além{'\n'}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  );
}