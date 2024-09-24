-- Create doctors table
CREATE TABLE
 public.doctors (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  nome_user TEXT NOT NULL,
  email_user TEXT,
  owner_id uuid NOT NULL, -- The registered user's ID from auth.users
  inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT doctors_pkey PRIMARY KEY (id),
  CONSTRAINT doctors_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES auth.users (id) ON DELETE CASCADE
) tablespace pg_default;

-- Create patients table
CREATE TABLE
 public.patients (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  nome_patients TEXT NOT NULL,
  cpf_patients TEXT UNIQUE NOT NULL,
  data_nasc_patients DATE NOT NULL,
  email_patients TEXT, 
  fone_patients TEXT,
  cep_patients TEXT,
  uf_patients TEXT,
  cidade_patients TEXT,
  bairro_patients TEXT,
  logradouro_patients TEXT,
  numero_patients TEXT,
  doctor_id uuid NOT NULL, -- Foreign key to the doctor who registered this patient
  modified_by uuid NOT NULL, -- The doctor who last modified this patient's record
  inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT patients_pkey PRIMARY KEY (id),
  CONSTRAINT patients_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE,
  CONSTRAINT patients_modified_by_fkey FOREIGN KEY (modified_by) REFERENCES doctors (id) ON DELETE SET NULL
);


-- Tabela attendances (prontuários)
-- Create attendances (consultation records) table
CREATE TABLE 
public.attendances (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_by uuid NOT NULL, -- Doctor who created the attendance record
  patient_id uuid NOT NULL, -- Linked to a patient
  hist TEXT, -- Medical history
  tipo TEXT NOT NULL, -- Consultation type
  -- Additional medical data
  tax_mae TEXT,
  peso_mae TEXT,
  estatura_mae TEXT,
  paMae TEXT,
  tipo_sang_mae TEXT,
  tax TEXT,
  apgar_1 TEXT,
  apgar_5 TEXT,
  peso TEXT,
  comprimento TEXT,
  pc TEXT,
  gesta TEXT,
  para TEXT,
  cesareas TEXT,
  abortos TEXT,
  abot_espon TEXT,
  vacinas_mae TEXT,
  nasc_vivos TEXT,
  mort_neo TEXT,
  filhos TEXT,
  intern BOOLEAN,
  cirg BOOLEAN,
  quant_cirg TEXT,
  consul_pre BOOLEAN,
  quant_consul_pre TEXT,
  trat_mae BOOLEAN,
  descr_mae TEXT,
  inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  doctor_id uuid NOT NULL, -- Doctor who made the record
  CONSTRAINT attendances_pkey PRIMARY KEY (id),
  CONSTRAINT attendances_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE,
  CONSTRAINT attendances_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE
);


-- TRIGGERS;
CREATE FUNCTION public.handle_new_doctor_sample_data()
RETURNS trigger AS $$
DECLARE
    new_patient_id uuid;
BEGIN
    -- Insert a sample patient for the new doctor
    INSERT INTO public.patients (nome_patients, cpf_patients, data_nasc_patients, email_patients, doctor_id)
    VALUES ('Sample Patient', 12345678900, '1990-01-01', 'sample@patient.com', NEW.id)
    RETURNING id INTO new_patient_id;
  
    -- Insert a sample attendance (medical record) for the sample patient
    INSERT INTO public.attendances (patient_id, doctor_id, hist, tipo, created_by)
    VALUES (new_patient_id, NEW.id, 'Sample medical history entry', 'General Checkup', NEW.id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER new_doctor_sample_data
AFTER INSERT ON auth.users
FOR EACH ROW
WHEN (NEW.role = 'doctor')  -- Ensure the trigger only runs when a doctor is created
EXECUTE FUNCTION public.handle_new_doctor_sample_data();


-- Enable RLS for each table
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendances ENABLE ROW LEVEL SECURITY;

-- Policy to ensure doctors only access their own records
CREATE POLICY "owned_doctors" ON public.doctors FOR ALL USING (auth.uid() = owner_id);

-- Policy to ensure doctors can only access and modify their own patients
CREATE POLICY "patients_in_owned_doctors" ON public.patients FOR ALL USING (
  auth.uid() IN (
    SELECT doctors.owner_id FROM doctors WHERE doctors.id = patients.doctor_id
  )
);

-- Policy to ensure doctors can only access attendances related to their patients
CREATE POLICY "attendance_access" ON public.attendances FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.patients WHERE public.patients.id = public.attendances.patient_id
    AND public.patients.doctor_id = auth.uid()
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


-- Publicação powersync para sincronizar as tabelas
CREATE PUBLICATION powersync FOR TABLE doctors, patients, attendances;