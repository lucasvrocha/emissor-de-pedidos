/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hello;

import java.util.List;

public interface ProdutoInferfaceRepositorio {
    
    //      ENCONTRA O PRODUTO PELO ID
    Produto findByID(int id);
    
    //      ENCONTRA O PRODUTO PELO ID DO FORNECEDOR
    List<Produto> findByIDFornecedor(long idfornecedor);
    
    //      ENCONTRA O PRODUTO PELO DESCRITIVO
    List<Produto> findByDescritivo(String descritivo);
    
    //      ENCONTRA O PRODUTO PELA QUANTIDADE
    List<Produto> findByQuantidade(int quantidade);
    
    //      ENCONTRA O PRODUTO PELA QUANTIDADE MINIMA
    List<Produto> findByQuantMin(int quantidadeMinima);
    
    //      ENCONTRA O PRODUTO PELO PRECO
    List<Produto> findByPreco(double preco);
    
    List<Produto> findAllProduto();
    
    
    void addProduto(Produto produto);
    void updateProduto(int id,Produto produto);
    void deleteProduto(int id);
    boolean produtoExists(String descritivo, int quantidade, int quantidadeMinima, double preco);
    
}
