-- Tabela doctors
CREATE TABLE
 public.doctors (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
<<<<<<< HEAD
  nome_user TEXT NOT NULL,
  email_user TEXT,
=======
  nome_user TEX NOT NULL,
  email_user TEX,
>>>>>>> 401e244fd19b38e8c1d0d6d3e0464982c47726d3
  owner_id uuid NOT NULL, -- O ID do usuário registrado (auth.users)
  CONSTRAINT doctors_pkey PRIMARY KEY (id),
  CONSTRAINT doctors_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;


-- Tabela patients
CREATE TABLE
 public.patients (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
<<<<<<< HEAD
  nome_patients TEXT NOT NULL,
  cpf_patients TEXT UNIQUE NOT NULL,
  data_nasc_patients DATE NOT NULL, -- Alterado para DATE
  email_patients TEXT, 
=======
  nome_patients TEX NOT NULL,
  cpf_patients TEX UNIQUE NOT NULL,
  data_nasc_patients TEXT NOT NULL,
  email_patients TEXT), 
>>>>>>> 401e244fd19b38e8c1d0d6d3e0464982c47726d3
  fone_patients TEXT,
  cep_patients TEXT,
  uf_patients TEXT,
  cidade_patients TEXT,
  bairro_patients TEXT,
<<<<<<< HEAD
  logradouro_patients TEXT,
=======
  logradouro_patients TEX,
>>>>>>> 401e244fd19b38e8c1d0d6d3e0464982c47726d3
  numero_patients TEXT,
  inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  doctor_id uuid NOT NULL, -- Relacionado ao médico responsável
  modified_by uuid NOT NULL, -- ID do médico que fez a última modificação
  created_by uuid, -- Coluna criada para identificar quem criou o registro
  CONSTRAINT patients_pkey PRIMARY KEY (id),
<<<<<<< HEAD
  CONSTRAINT patients_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users (id) ON DELETE SET NULL, -- Relacionamento com a tabela users para o usuário que criou
  CONSTRAINT patients_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE, -- Relacionamento com a tabela doctors para o médico responsável
  CONSTRAINT patients_modified_by_fkey FOREIGN KEY (modified_by) REFERENCES doctors (id) ON DELETE CASCADE -- Relacionamento com a tabela doctors para o médico que modificou
=======
  CONSTRAINT patients_created_by_fkey FOREIGN KEY (created_by) references auth.users (id) on delete set null,
  CONSTRAINT patients_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES auth.users (id) ON DELETE CASCADE,
  CONSTRAINT patients_modified_by_fkey FOREIGN KEY (modified_by) REFERENCES auth.users (id) ON DELETE CASCADE SET NULL
>>>>>>> 401e244fd19b38e8c1d0d6d3e0464982c47726d3
) TABLESPACE pg_default;


-- Tabela attendances (prontuários)
CREATE TABLE
 public.attendances (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_by uuid NOT NULL, -- Quem criou o prontuário (doctor_id)
  patient_id uuid NOT NULL, -- Relacionado ao paciente
<<<<<<< HEAD
  tipo TEXT NOT NULL, -- Tipo da consulta
  tax_mae TEXT,
  peso_mae TEXT,
  estatura_mae TEXT,
  pa_mae TEXT, -- Corrigido nome para pa_mae
=======
  tipo TEXT) NOT NULL, -- Tipo da consulta
  tax_mae TEXT,
  peso_mae TEXT,
  estatura_mae TEXT,
  paMae TEXT,
>>>>>>> 401e244fd19b38e8c1d0d6d3e0464982c47726d3
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
  intern TEXT,
  cirg TEXT,
  quant_cirg TEXT,
  consul_pre TEXT,
  quant_consul_pre TEXT,
  trat_mae TEXT,
  descr_mae TEXT,
  inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT attendances_pkey PRIMARY KEY (id),
  CONSTRAINT attendances_created_by_fkey FOREIGN KEY (created_by) REFERENCES doctors (id) ON DELETE CASCADE, -- Relacionamento com a tabela doctors para o médico que criou o prontuário
  CONSTRAINT attendances_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE -- Relacionamento com a tabela patients
) TABLESPACE pg_default;

<<<<<<< HEAD
=======
-- Publicação powersync para sincronizar as tabelas
CREATE PUBLICATION powersync FOR TABLE doctors, patients, attendances;

>>>>>>> 401e244fd19b38e8c1d0d6d3e0464982c47726d3
-- Habilitar RLS (Row Level Security) nas tabelas
ALTER TABLE public.doctors
 ENABLE ROW LEVEL SECURITY;
 
ALTER TABLE public.patients
 ENABLE ROW LEVEL SECURITY;
 
ALTER TABLE public.attendances
 ENABLE ROW LEVEL SECURITY;

<<<<<<< HEAD

-- trigger
CREATE FUNCTION public.handle_new_user_sample_data()
RETURNS TRIGGER AS $$
DECLARE
  new_doctors_id uuid;
BEGIN
  -- Inserir novo médico na tabela doctors, utilizando o campo correto nome_user
  INSERT INTO public.doctors (nome_user, owner_id)
    VALUES ('João', NEW.id) -- NEW.id refere-se ao novo usuário inserido
    RETURNING id INTO new_doctors_id;

  -- Não insere pacientes automaticamente, pois CPF não é relevante nesse ponto
  -- Se necessário, essa inserção será feita manualmente depois com CPF

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
=======
-- Políticas de segurança para acesso e manipulação de dados


-- This trigger automatically creates some sample data when a user registers.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user_sample_data()
returns trigger as $$
declare
  new_doctors_id uuid;
begin
  insert into public.doctors (nome, owner_id)
    values ('João', new.id)
    returning id into new_doctors_id;
  
  insert into public.patients(description, doctors_id, created_by)
    values ('Pedro', new_doctors_id, new.id);

  insert into public.patients(description, doctors_id, created_by)
    values ('Carlos', new_doctors_id, new.id);

  return new;
end;
$$ language plpgsql security definer;

create trigger new_user_sample_data after insert on auth.users for each row execute procedure public.handle_new_user_sample_data();




>>>>>>> 401e244fd19b38e8c1d0d6d3e0464982c47726d3


-- Publicação powersync para sincronizar as tabelas
CREATE PUBLICATION powersync FOR TABLE doctors, patients, attendances;