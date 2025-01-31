export interface Produto {
  id: string; // UUID
  nome: string; // Nome do produto
  descricao: string; // Descrição do produto
  preco: number; // Preço do produto
  categoria: string; // Categoria do produto (ex: entrada, prato principal, sobremesa)
  imagem: string; // URL ou caminho da imagem do produto
}
