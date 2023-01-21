import React, {useEffect} from 'react';
import {LogBox, StatusBar} from 'react-native';
import 'react-native-gesture-handler';

import {Host} from 'react-native-portalize';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

//import {initializeOnesignal} from '@/utils';
import {linking, locale, toastConfig} from '@/config';
import {useAppSelector} from '@/hooks';
import {persistor, store} from '@/store';

import AppLoader from './components/Common/AppLoader';
import MainStack from './navigation/stacks/MainStack';

const MainContainer = () => {
  const language = useAppSelector(state => state.settings.language);
  const theme = useAppSelector(state => state.settings.theme);

  useEffect(() => {
    locale(language);
  }, [language]);

  //useEffect(() => {
  //  initializeOnesignal();
  //}, []);

  return (
    <Host>
      <NavigationContainer
        linking={linking}
        theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar barStyle="dark-content" />
        <MainStack />
      </NavigationContainer>
      <AppLoader />
    </Host>
  );
};

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainContainer />
      </PersistGate>

      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
