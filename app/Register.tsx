// app/Register.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View, TextInput, TouchableOpacity, Text } from 'react-native';

import styles from './styles/AuthStyles';

import { useSystem } from '~/powersync/PowerSync';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { supabaseConnector } = useSystem();
  const router = useRouter();

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Email inválido');
      return;
    }
    if (password.length < 6 || password.length > 15) {
      Alert.alert('Erro', 'A senha deve conter entre 6 a 15 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não conferem');
      return;
    }

    try {
      await supabaseConnector.client.auth.signUp({ email, password });
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
      router.replace('/'); // Volta para a tela de login
    } catch (error) {
      Alert.alert('Erro', 'Falha no cadastro, tente novamente');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Criar Conta</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={[styles.input, password !== confirmPassword ? styles.errorInput : null]}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/')}>
        <Text style={styles.linkText}>Voltar para o login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
