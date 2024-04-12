import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {clearAuth, getAuth, storeAuth} from '../helpers/auth';
import {Alert, PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const AuthContext = createContext<{
  user: Record<string, any> | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: {token: string; user: Record<string, any>}) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (profile: Record<string, any>) => void;
} | null>(null);

export const AuthProvider = ({children}: React.PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<Record<string, any> | null>(null);

  const login = async ({
    token,
    user,
  }: {
    token: string;
    user: Record<string, any>;
  }) => {
    await storeAuth({token, user});

    setAuthToken(token);

    setUser(user);
  };

  const logout = async () => {
    await clearAuth();

    setAuthToken(null);

    setUser(null);
  };

  const updateUserProfile = useCallback(
    async (profile: Record<string, any>) => {
      if (user && authToken) {
        const newUser = {
          ...user,
          profile: {
            ...profile,
            userId: user!.id,
          },
        };

        setUser(newUser);

        await storeAuth({token: authToken, user: user});
      }
    },
    [user, authToken],
  );

  useEffect(() => {
    const loadAuthInfo = async () => {
      const authInfo = await getAuth();

      setIsLoading(false);

      if (authInfo === null) {
        return;
      }

      const {user, token} = authInfo;

      setUser(user);

      setAuthToken(token);
    };

    loadAuthInfo();
  }, [isLoading]);

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (user?.id) {
      console.log(user.id);
      messaging().subscribeToTopic(user.id);
    }

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return () => {
      unsubscribe();

      if (user?.id) {
        messaging().unsubscribeFromTopic(user.id);
      }
    };
  }, [user?.id]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token: authToken,
        isAuthenticated: !!authToken,
        isLoading,
        login,
        logout,
        updateUserProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
