// app/(home)/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppleStyleSwipeableRow from '~/components/SwipeableRow';
import { PATIENTS_TABLE, Database } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';
import { uuid } from '~/powersync/uuid';

const HomeScreen: React.FC = () => {
  const [doctorName, setDoctorName] = useState('');
  const [patients, setPatients] = useState<Database[typeof PATIENTS_TABLE][]>([]);
  const { supabaseConnector, db } = useSystem();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    const result = await db.selectFrom(PATIENTS_TABLE).selectAll().execute();
    setPatients(result);
  };

  const addDoctor = async () => {
    const { userID } = await supabaseConnector.fetchCredentials();
    const doctorId = uuid();

    await db
      .insertInto('doctors')
      .values({
        nome_user: doctorName,
        owner_id: userID,
        created_at: new Date().toISOString(),
        inserted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .execute();

    setDoctorName('');
    loadPatients();
  };

  const renderRow = ({ item }: { item: Database[typeof PATIENTS_TABLE] }) => (
    <AppleStyleSwipeableRow
      onDelete={() => console.log('Deleted', item)}
      onToggle={() => console.log('Toggled', item)}
      todo={item}>
      <View style={{ padding: 12, flexDirection: 'row', gap: 10, height: 44 }}>
        <Text style={{ flex: 1 }}>{item.nome_patients}</Text>
        <Text style={{ flex: 1 }}>{item.cpf_patients}</Text>
      </View>
    </AppleStyleSwipeableRow>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <TextInput
            placeholder="Adicionar nome do médico"
            style={styles.input}
            value={doctorName}
            onChangeText={setDoctorName}
          />
          <TouchableOpacity onPress={addDoctor} disabled={doctorName === ''}>
            <Ionicons name="add-outline" size={24} color="#A700FF" />
          </TouchableOpacity>
        </View>

        {patients.length > 0 && (
          <FlatList
            data={patients}
            renderItem={renderRow}
            keyExtractor={(item) => item.cpf_patients.toString()}
            ItemSeparatorComponent={() => (
              <View
                style={{ height: StyleSheet.hairlineWidth, width: '100%', backgroundColor: 'gray' }}
              />
            )}
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
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#151515',
    padding: 6,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#363636',
    color: '#fff',
    padding: 8,
    borderWidth: 1,
    borderColor: '#A700FF',
    borderRadius: 4,
  },
});

export default HomeScreen;
