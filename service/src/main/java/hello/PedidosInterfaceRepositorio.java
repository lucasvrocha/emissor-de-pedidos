/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hello;

import java.util.List;

public interface PedidosInterfaceRepositorio {
    
    Pedidos findByIdPedidos(int id);
    List<Pedidos> findByIdTipo(String tipo);
    List<Pedidos> findByIdProduto(int idproduto);
    List<Pedidos> findByDescricao(String descricao);
    List<Pedidos> findByValor(double valor);
    List<Pedidos> findByQTD(int qtd);
    List<Pedidos> Pagamentos();
    List<Pedidos> Parcelas();
    List<Pedidos> findAllPedidos();
    
    
    void addPedidos(Pedidos Pedidos);
    void updatePedidos(int id,Pedidos pedidos);
    void deletePedidos(int id);
    boolean pedidosExists(String tipo, String descricao);
    
}
