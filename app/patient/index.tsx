// app/patient/index.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const PatientIndex = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulando carregamento antes de redirecionar para a tela de detalhes de pacientes ou outra rota
    setTimeout(() => {
      // Por exemplo, se não houver paciente selecionado, poderia redirecionar para a Home
      router.replace('./home');
    }, 2000); // Simulação de atraso de 2 segundos
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Carregando...</Text>
    </View>
  );
};

export default PatientIndex;
