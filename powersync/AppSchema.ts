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
    cpf_patients: column.integer,
    data_nasc_patients: column.text,
    email_patients: column.text,
    fone_patients: column.integer,
    cep_patients: column.integer,
    uf_patients: column.text,
    cidade_patients: column.text,
    bairro_patients: column.text,
    logradouro_patients: column.text,
    numero_patients: column.integer,
    inserted_at: column.text,
    updated_at: column.text,
    doctor_id: column.text, // Médico responsável pelo paciente
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
    created_by: column.text, // Médico que criou o prontuário
    doctor_id: column.text, // Médico responsável pelo paciente
    patient_id: column.text, // Paciente relacionado ao prontuário
    consultation_id: column.text, // Identificador da consulta
    hist: column.text, // Histórico do prontuário
    tipo: column.text, // Tipo da consulta
    // Dados médicos adicionais
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
export type Todo = Database & {
  [DOCTORS_TABLE]: {
    id: string;
    created_at: string;
    nome_user: string;
    email_user: string;
    owner_id: string;
    inserted_at: string;
    updated_at: string;
  };
  [PATIENTS_TABLE]: {
    id: string;
    created_at: string;
    nome_patients: string;
    cpf_patients: number;
    data_nasc_patients: string;
    email_patients: string;
    fone_patients: number;
    cep_patients: number;
    uf_patients: string;
    cidade_patients: string;
    bairro_patients: string;
    logradouro_patients: string;
    numero_patients: number;
    inserted_at: string;
    updated_at: string;
    doctor_id: string;
    modified_by: string; // Adicionada coluna modified_by para controle de modificações
  };
  [ATTENDANCES_TABLE]: {
    id: string;
    created_at: string;
    created_by: string;
    doctor_id: string;
    patient_id: string;
    consultation_id: string;
    hist: string;
    tipo: string;
    tax_mae: string;
    peso_mae: number;
    estatura_mae: number;
    pa_mae: string;
    tipo_sang_mae: string;
    tax: string;
    apgar_1: string;
    apgar_5: string;
    peso: number;
    comprimento: number;
    pc: number;
    gesta: number;
    para: string;
    cesareas: number;
    abortos: number;
    abot_espon: number;
    vacinas_mae: string;
    nasc_vivos: number;
    mort_neo: number;
    filhos: number;
    intern: number;
    cirg: number;
    quant_cirg: number;
    consul_pre: number;
    quant_consul_pre: number;
    trat_mae: number;
    descr_mae: string;
    inserted_at: string;
    updated_at: string;
  };
};
