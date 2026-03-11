export interface FindCustomersParams {
  skip?: number;                  // para paginação
  take?: number;                  // para paginação
  name?: string;                  // filtra pelo nome do cliente
  email?: string;                 // filtra pelo email
  phone?: string;                 // filtra pelo telefone
  userId?: number;                // filtra pelo usuário dono do cliente
  search?: string;                // busca geral (nome, email, telefone)
  sortBy?: string;                // coluna para ordenar
  sortOrder?: 'ASC' | 'DESC';     // ordem da ordenação
  filters?: Record<string, any>;  // filtros adicionais flexíveis
}