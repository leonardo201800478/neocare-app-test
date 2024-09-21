-- Criação das tabelas principais

-- Tabela doctors
CREATE TABLE public.doctors (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  nome_user VARCHAR(50) NOT NULL,
  email_user VARCHAR(50),
  owner_id uuid NOT NULL,
  inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT doctors_pkey PRIMARY KEY (id),
  CONSTRAINT doctors_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Tabela patients
CREATE TABLE public.patients (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  nome_patients VARCHAR(50) NOT NULL,
  cpf_patients BIGINT UNIQUE NOT NULL,
  data_nasc_patients DATE NOT NULL,
  email_patients VARCHAR(50), 
  fone_patients BIGINT,
  cep_patients BIGINT,
  uf_patients VARCHAR(2),
  cidade_patients VARCHAR(30),
  bairro_patients VARCHAR(30),
  logradouro_patients VARCHAR(50),
  numero_patients INTEGER,
  inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  doctor_id uuid NOT NULL,
  CONSTRAINT patients_pkey PRIMARY KEY (id),
  CONSTRAINT patients_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Tabela attendances
CREATE TABLE public.attendances (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_by uuid NULL,
  doctor_id uuid NOT NULL,
  patient_id uuid NOT NULL,
  consultation_id uuid NOT NULL,
  hist VARCHAR(2000),
  tipo VARCHAR(50) NOT NULL,
  tax_mae VARCHAR(30),
  peso_mae REAL,
  estatura_mae REAL,
  paMae VARCHAR(20),
  tipo_sang_mae VARCHAR(3),
  tax VARCHAR(30),
  apgar_1 VARCHAR(50),
  apgar_5 VARCHAR(50),
  peso REAL,
  comprimento REAL,
  pc REAL,
  gesta INTEGER,
  para VARCHAR(20),
  cesareas INTEGER,
  abortos INTEGER,
  abot_espon INTEGER,
  vacinas_mae VARCHAR(500),
  nasc_vivos INTEGER,
  mort_neo INTEGER,
  filhos INTEGER,
  intern BOOLEAN,
  cirg BOOLEAN,
  quant_cirg INTEGER,
  consul_pre BOOLEAN,
  quant_consul_pre INTEGER,
  trat_mae BOOLEAN,
  descr_mae VARCHAR(300),
  inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT attendances_pkey PRIMARY KEY (id),
  CONSTRAINT attendances_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE,
  CONSTRAINT attendances_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE,
  CONSTRAINT attendances_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users (id) ON DELETE SET NULL
) TABLESPACE pg_default;

-- Publicação powersync para sincronizar as tabelas
CREATE PUBLICATION powersync FOR TABLE public.doctors, public.patients, public.attendances;

-- Habilitar RLS (Row Level Security) nas tabelas
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendances ENABLE ROW LEVEL SECURITY;

-- Criar políticas para as tabelas
CREATE POLICY "owned doctors" ON public.doctors FOR ALL USING (auth.uid() = owner_id);
CREATE POLICY "patients in owned doctors" ON public.patients FOR ALL USING (
  auth.uid() IN (
    SELECT doctors.owner_id FROM doctors WHERE doctors.id = patients.doctor_id
  )
);
CREATE POLICY "attendance_access" ON public.attendances FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.patients WHERE public.patients.id = public.attendances.patient_id
  )
);

-- Função de Trigger para atualização de timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualização de timestamp
CREATE TRIGGER update_doctors_timestamp
BEFORE UPDATE ON public.doctors
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_patients_timestamp
BEFORE UPDATE ON public.patients
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_attendances_timestamp
BEFORE UPDATE ON public.attendances
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
