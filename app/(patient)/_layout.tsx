// app/(patient)/index.tsx
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import { useSystem } from '~/powersync/PowerSync';

const PacienteDetails = () => {
  const { db } = useSystem();
  const router = useRouter();
  const { cpf } = useGlobalSearchParams();
  const [paciente, setPaciente] = useState<any>(null);

  useEffect(() => {
    if (cpf) {
      const cpfString = Array.isArray(cpf) ? cpf[0] : cpf;
      loadPaciente(cpfString);
    }
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
      router.replace('/(home)');
    }
  };

  if (!paciente) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dados do Paciente</Text>
      <Text>Nome: {paciente.nome_patients}</Text>
      <Text>CPF: {paciente.cpf_patients}</Text>
      <Text>Data de Nascimento: {paciente.data_nasc_patients}</Text>
      <Text>Email: {paciente.email_patients}</Text>
      <Text>CEP: {paciente.cep_patients}</Text>
      <Text>UF: {paciente.uf_patients}</Text>
      <Text>Cidade: {paciente.cidade_patients}</Text>
      <Text>Bairro: {paciente.bairro_patients}</Text>
      <Text>Número: {paciente.numero_patients}</Text>
      <Text>Endereço: {paciente.logradouro_patients}</Text>
      <Text>Telefone: {paciente.fone_patients}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonDelete} onPress={deletePaciente}>
          <Text style={styles.buttonText}>Deletar Paciente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBack} onPress={() => router.replace('/(home)')}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonDelete: {
    backgroundColor: '#FF5C5C',
    padding: 16,
    borderRadius: 8,
  },
  buttonBack: {
    backgroundColor: '#005F9E',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PacienteDetails;
