export interface ListCustomersParams {
  page: number;                     // página atual para paginação
  limit: number;                    // quantidade de itens por página
  search?: string;                  // busca geral (nome, email, telefone)
  sortBy?: string;                  // coluna para ordenar
  sortOrder?: 'ASC' | 'DESC';       // ordem da ordenação
  filters?: Record<string, any>;    // filtros adicionais flexíveis
}