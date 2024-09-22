// app/_layout.tsx
import { Session } from '@supabase/supabase-js';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useSystem } from '~/powersync/PowerSync';

const Layout = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true); // Adiciona um estado de carregamento
  const router = useRouter();
  const segments = useSegments();
  const { supabaseConnector } = useSystem();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseConnector.client.auth.onAuthStateChange((_, session) => {
      setSession(session);
      setInitialized(true);
      setLoading(false); // Termina o estado de carregamento após a inicialização
    });

    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === 'auth';

    // Verifica o estado da sessão após a inicialização
    if (!session && !inAuthGroup) {
      router.replace('/auth/Login');
    } else if (session && inAuthGroup) {
      router.replace('/home/HomeScreen');
    }
  }, [session, initialized]);

  // Exibe um indicador de carregamento enquanto o layout está inicializando
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Slot />;
};

export default Layout;
