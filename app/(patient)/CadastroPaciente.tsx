// app/(patient)/CadastroPaciente.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import styles from '../styles/AuthStyles'; // Usando estilos da tela de Login

import { useSystem } from '~/powersync/PowerSync';

const CadastroPaciente = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const router = useRouter();
  const { db, supabaseConnector } = useSystem();

  const handleCadastro = async () => {
    if (!nome || !cpf) {
      Alert.alert('Erro', 'Nome e CPF são obrigatórios');
      return;
    }

    try {
      const { userID } = await supabaseConnector.fetchCredentials();
      const doctorId = userID; // Id do médico logado

      await db
        .insertInto('patients')
        .values({
          id: db.generateId(), // Assuming you have a method to generate IDs
          nome_patients: nome,
          cpf_patients: Number(cpf),
          email_patients: email,
          fone_patients: Number(telefone),
          logradouro_patients: endereco,
          doctor_id: doctorId,
          created_at: new Date().toISOString(),
          inserted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .execute();

      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso');
      router.replace(`../patient?cpf=${cpf}`); // Navegar para a tela do paciente com os dados
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o paciente');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro de Paciente</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar Paciente</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroPaciente;
