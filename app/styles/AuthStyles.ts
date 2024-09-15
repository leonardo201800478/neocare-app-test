// app/styles/AuthStyles.ts
import { StyleSheet } from 'react-native';

const AuthStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#E0F8F7',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#005F9E',
  },
  input: {
    height: 50,
    borderColor: '#00A6FF',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#005F9E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkText: {
    color: '#005F9E',
    textAlign: 'center',
    marginTop: 10,
  },
  errorInput: {
    borderColor: '#FF5C5C',
  },
  // Novos estilos para o overlay de loading
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    gap: 10,
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default AuthStyles;