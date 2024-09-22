// app/styles/PacienteDetailsStyles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  buttonDelete: {
    backgroundColor: '#FF5C5C',
    padding: 16,
    borderRadius: 8,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonBack: {
    backgroundColor: '#005F9E',
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
