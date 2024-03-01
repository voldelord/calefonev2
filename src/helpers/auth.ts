import AsyncStorage from '@react-native-async-storage/async-storage';
const AUTH_KEY = 'auth_info_v2';

export const storeAuth = async ({
  token,
  user,
}: {
  token: string;
  user: Record<string, any>;
}) => {
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify({token, user}));
};

export const clearAuth = async () => {
  await AsyncStorage.removeItem(AUTH_KEY);
};

export const getAuth = async () => {
  const authInfo = await AsyncStorage.getItem(AUTH_KEY);

  if (authInfo === null) {
    return null;
  }

  const {token, user} = JSON.parse(authInfo);

  return {token, user};
};
