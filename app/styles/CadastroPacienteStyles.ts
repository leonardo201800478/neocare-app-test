import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#B8E6DD', // Cor de fundo conforme a imagem
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#4CAF50', // Verde do campo de texto
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#000', // Adicionando borda para os campos
  },
  inputSmall: {
    width: '48%', // Para campos pequenos como número e bairro
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#000', // Botão preto
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
