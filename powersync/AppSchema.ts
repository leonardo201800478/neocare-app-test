// powersync/AppSchema.ts

import { column, Schema, Table } from '@powersync/react-native';

// Nome das tabelas
export const DOCTORS_TABLE = 'doctors';
export const PATIENTS_TABLE = 'patients';
export const ATTENDANCES_TABLE = 'attendances';

// Tabela doctors
const doctors = new Table(
  {
    id: column.text,
    created_at: column.text,
    nome_user: column.text,
    email_user: column.text,
    owner_id: column.text, // Dono do registro (usuário)
    inserted_at: column.text,
    updated_at: column.text,
  },
  {
    indexes: {
      owner_id_index: ['owner_id'],
    },
  }
);

// Tabela patients
const patients = new Table(
  {
    id: column.text,
    created_at: column.text,
    nome_patients: column.text,
    cpf_patients: column.integer,  // CPF como inteiro
    data_nasc_patients: column.text,
    email_patients: column.text,
    fone_patients: column.integer, // Telefone como inteiro
    cep_patients: column.integer,  // CEP como inteiro
    uf_patients: column.text,
    cidade_patients: column.text,
    bairro_patients: column.text,
    logradouro_patients: column.text,
    numero_patients: column.integer,
    inserted_at: column.text,
    updated_at: column.text,
    doctor_id: column.text,  // Médico responsável pelo paciente
    modified_by: column.text, // Último médico que modificou o registro
  },
  {
    indexes: {
      doctor_id_index: ['doctor_id'],
      modified_by_index: ['modified_by'], // Índice para rastrear quem modificou
    },
  }
);

// Tabela attendances (prontuários)
const attendances = new Table(
  {
    id: column.text,
    created_at: column.text,
    created_by: column.text,  // Médico que criou o prontuário
    doctor_id: column.text,   // Médico responsável pelo paciente
    patient_id: column.text,  // Paciente relacionado ao prontuário
    consultation_id: column.text,
    hist: column.text,
    tipo: column.text,
    tax_mae: column.text,
    peso_mae: column.real,
    estatura_mae: column.real,
    pa_mae: column.text,
    tipo_sang_mae: column.text,
    tax: column.text,
    apgar_1: column.text,
    apgar_5: column.text,
    peso: column.real,
    comprimento: column.real,
    pc: column.real,
    gesta: column.integer,
    para: column.text,
    cesareas: column.integer,
    abortos: column.integer,
    abot_espon: column.integer,
    vacinas_mae: column.text,
    nasc_vivos: column.integer,
    mort_neo: column.integer,
    filhos: column.integer,
    intern: column.integer,
    cirg: column.integer,
    quant_cirg: column.integer,
    consul_pre: column.integer,
    quant_consul_pre: column.integer,
    trat_mae: column.integer,
    descr_mae: column.text,
    inserted_at: column.text,
    updated_at: column.text,
  },
  {
    indexes: {
      doctor_patient_index: ['doctor_id', 'patient_id'], // Índice para interligar médico e paciente
    },
  }
);

// Definindo o schema para o App
export const AppSchema = new Schema({
  doctors,
  patients,
  attendances,
});

// Definição de tipos para as tabelas
export type Database = (typeof AppSchema)['types'];
