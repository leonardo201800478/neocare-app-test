import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import styles from '../styles/CadastroPacienteStyles'; // Importando os novos estilos

import { useSystem } from '~/powersync/PowerSync';
import { uuid } from '~/powersync/uuid'; // Importando a função uuid

const CadastroPaciente = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [endereco, setEndereco] = useState('');
  const router = useRouter();
  const { db, supabaseConnector } = useSystem();

  const handleCadastro = async () => {
    if (!nome || !cpf || !dataNasc) {
      Alert.alert('Erro', 'Nome, CPF e Data de Nascimento são obrigatórios');
      return;
    }

    try {
      const { userID } = await supabaseConnector.fetchCredentials();
      const doctorId = userID; // Id do médico logado

      await db
        .insertInto('patients')
        .values({
          id: uuid(), // Usando a função uuid para gerar o ID
          nome_patients: nome,
          cpf_patients: Number(cpf),
          data_nasc_patients: dataNasc,
          email_patients: email,
          fone_patients: Number(telefone),
          cep_patients: Number(cep),
          uf_patients: uf,
          cidade_patients: cidade,
          bairro_patients: bairro,
          numero_patients: Number(numero),
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
      <Text style={styles.header}>Dados do Paciente</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput
        placeholder="CPF da criança ou do responsável"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Data de Nascimento"
        value={dataNasc}
        onChangeText={setDataNasc}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <View style={styles.row}>
        <TextInput
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          style={styles.inputSmall}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="CEP"
          value={cep}
          onChangeText={setCep}
          style={styles.inputSmall}
          keyboardType="numeric"
        />
      </View>

      <TextInput
        placeholder="Logradouro"
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
      />

      <View style={styles.row}>
        <TextInput
          placeholder="Número"
          value={numero}
          onChangeText={setNumero}
          style={styles.inputSmall}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Bairro"
          value={bairro}
          onChangeText={setBairro}
          style={styles.inputSmall}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          placeholder="Cidade"
          value={cidade}
          onChangeText={setCidade}
          style={styles.inputSmall}
        />
        <TextInput placeholder="UF" value={uf} onChangeText={setUf} style={styles.inputSmall} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroPaciente;
