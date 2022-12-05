import { NativeBaseProvider, StatusBar } from 'native-base'
import { theme } from './src/styles/theme';

import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts as UseFontsRoboto } from '@expo-google-fonts/roboto';
import { Acme_400Regular, useFonts as UseFontsAcme } from '@expo-google-fonts/acme';

import { Loading } from './src/components/Loading';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';
import { TransactionsContextProvider } from './src/contexts/TransactionsContext';

export default function App() {
  const [fontsLoadedRoboto] = UseFontsRoboto({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });
  const [fontsLoadedAcme] = UseFontsAcme({ Acme_400Regular });

  return (
    <NativeBaseProvider theme={theme}>
        <AuthContextProvider>
          <StatusBar 
            barStyle='light-content'
            backgroundColor="transparent"
            translucent
            />
          <TransactionsContextProvider>
            {fontsLoadedRoboto && fontsLoadedAcme ? <Routes /> : <Loading />}
          </TransactionsContextProvider>
        </AuthContextProvider>
    </NativeBaseProvider>
  );
}
