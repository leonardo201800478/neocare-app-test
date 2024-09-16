// powersync/AppSchema.ts

import { column, Schema, Table } from '@powersync/react-native';

// Nome da tabela
export const TODOS_TABLE = 'todos';

// Definindo a tabela com a nova classe Table
const todos = new Table({
  task: column.text,
  user_id: column.text,
  is_complete: column.integer,
  id: column.text, // Adicionando id se for necessário
});

// Criando o esquema com a tabela definida
export const AppSchema = new Schema({
  todos,
});

// Definindo o tipo Database com base no esquema
export type Database = (typeof AppSchema)['types'];
export type Todo = Database['todos'];
