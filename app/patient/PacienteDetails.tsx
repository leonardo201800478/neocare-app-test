// app/patient/PacienteDetails.tsx
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import styles from '../styles/PacienteDetailsStyles';

import { useSystem } from '~/powersync/PowerSync';

const PacienteDetails = () => {
  const { cpf } = useGlobalSearchParams();
  const { db } = useSystem();
  const [paciente, setPaciente] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (cpf) loadPaciente(Array.isArray(cpf) ? cpf[0] : cpf);
  }, [cpf]);

  const loadPaciente = async (cpf: string) => {
    const result = await db
      .selectFrom('patients')
      .selectAll()
      .where('cpf_patients', '=', Number(cpf))
      .execute();
    setPaciente(result[0]);
  };

  const deletePaciente = async () => {
    if (paciente) {
      await db.deleteFrom('patients').where('id', '=', paciente.id).execute();
      Alert.alert('Sucesso', 'Paciente deletado com sucesso');
      router.replace('../home');
    }
  };

  if (!paciente) return <Text>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes do Paciente</Text>
      <Text>Nome: {paciente.nome_patients}</Text>
      <Text>CPF: {paciente.cpf_patients}</Text>
      <TouchableOpacity onPress={deletePaciente}>
        <Text style={styles.buttonDelete}>Deletar Paciente</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PacienteDetails;
