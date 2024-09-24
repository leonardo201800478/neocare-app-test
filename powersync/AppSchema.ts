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
<<<<<<< HEAD
    cpf_patients: column.text, // CPF como texto devido ao seu tamanho
    data_nasc_patients: column.text,
    email_patients: column.text,
    fone_patients: column.text, // Telefone como texto para evitar problemas com formatação
    cep_patients: column.text, // CEP como texto para evitar problemas com formatação
=======
    cpf_patients: column.text,  // CPF como inteiro
    data_nasc_patients: column.text,
    email_patients: column.text,
    fone_patients: column.text, // Telefone como inteiro
    cep_patients: column.text,  // CEP como inteiro
>>>>>>> 401e244fd19b38e8c1d0d6d3e0464982c47726d3
    uf_patients: column.text,
    cidade_patients: column.text,
    bairro_patients: column.text,
    logradouro_patients: column.text,
<<<<<<< HEAD
    numero_patients: column.text, // Número como texto para cobrir casos de sufixos
=======
    numero_patients: column.text,
>>>>>>> 401e244fd19b38e8c1d0d6d3e0464982c47726d3
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
    consultation_id: column.text,
    hist: column.text,
    tipo: column.text,
    tax_mae: column.text,
<<<<<<< HEAD
    peso_mae: column.text, // Peso como texto para cobrir diferentes formatos
    estatura_mae: column.text, // Altura como texto para cobrir diferentes formatos
=======
    peso_mae: column.text,
    estatura_mae: column.text,
>>>>>>> 401e244fd19b38e8c1d0d6d3e0464982c47726d3
    pa_mae: column.text,
    tipo_sang_mae: column.text,
    tax: column.text,
    apgar_1: column.text,
    apgar_5: column.text,
<<<<<<< HEAD
    peso: column.text, // Peso do bebê como texto
    comprimento: column.text, // Comprimento do bebê como texto
    pc: column.text, // Perímetro cefálico como texto
=======
    peso: column.text,
    comprimento: column.text,
    pc: column.text,
>>>>>>> 401e244fd19b38e8c1d0d6d3e0464982c47726d3
    gesta: column.text,
    para: column.text,
    cesareas: column.text,
    abortos: column.text,
    abot_espon: column.text,
    vacinas_mae: column.text,
    nasc_vivos: column.text,
    mort_neo: column.text,
    filhos: column.text,
    intern: column.text,
    cirg: column.text,
    quant_cirg: column.text,
    consul_pre: column.text,
    quant_consul_pre: column.text,
    trat_mae: column.text,
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
