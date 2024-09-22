// app/index.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const Index = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Controla a montagem inicial
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      router.replace('/auth/Login'); // Redireciona automaticamente para a tela de Login
    }
  }, [isMounted]);

  return null; // Não renderiza nada, apenas redireciona
};

export default Index;
