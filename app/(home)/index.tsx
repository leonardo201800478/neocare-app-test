// app/(home)/index.tsx
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppleStyleSwipeableRow from '~/components/SwipeableRow';
import { PATIENTS_TABLE, Database } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<Database[typeof PATIENTS_TABLE][]>([]);
  const { db } = useSystem();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    const result = await db.selectFrom(PATIENTS_TABLE).selectAll().execute();
    setPatients(result);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      (patient.nome_patients?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (patient.cpf_patients?.toString().includes(searchQuery) ?? false)
  );

  const renderRow = ({ item }: { item: Database[typeof PATIENTS_TABLE] }) => (
    <AppleStyleSwipeableRow
      onDelete={() => console.log('Deleted', item)}
      onToggle={() => console.log('Toggled', item)}
      patient={item}>
      <TouchableOpacity
        onPress={() => {
          /* Navegar para a tela de detalhes do paciente */
        }}>
        <View style={{ padding: 12, flexDirection: 'row', gap: 10, height: 44 }}>
          <Text style={{ flex: 1 }}>{item.nome_patients}</Text>
          <Text style={{ flex: 1 }}>{item.cpf_patients}</Text>
        </View>
      </TouchableOpacity>
    </AppleStyleSwipeableRow>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          placeholder="Pesquisar por nome ou CPF"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {filteredPatients.length > 0 && (
          <FlatList
            data={filteredPatients}
            renderItem={({ item }) => (
              <AppleStyleSwipeableRow
                onDelete={() => console.log('Deleted', item)}
                onToggle={() => console.log('Toggled', item)}
                patient={item}>
                <TouchableOpacity onPress={() => router.push(`/patient:${item.cpf_patients}`)}>
                  <View style={{ padding: 12, flexDirection: 'row', gap: 10, height: 44 }}>
                    <Text style={{ flex: 1 }}>{item.nome_patients}</Text>
                    <Text style={{ flex: 1 }}>{item.cpf_patients}</Text>
                  </View>
                </TouchableOpacity>
              </AppleStyleSwipeableRow>
            )}
            keyExtractor={(item) => item.cpf_patients?.toString() ?? ''}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}

        {filteredPatients.length > 0 && (
          <FlatList
            data={filteredPatients}
            renderItem={renderRow}
            keyExtractor={(item) => item.cpf_patients?.toString() ?? ''}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
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
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },
});

export default HomeScreen;
