/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hello;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public class PedidosRepositorio implements PedidosInterfaceRepositorio{

    public PedidosRepositorio() {
    }
    
    @PersistenceContext
    private EntityManager entityManager;
    
    public Pedidos getPedidosByIDPedidos(int id) {
        return entityManager.find(Pedidos.class, id);
    }
    
    /*********************************************
    ********   ALTERACOES DE DADOS      **********
    *********************************************/
    
    @Override
    public void addPedidos(Pedidos pedidos) {
        entityManager.persist(pedidos);
    }
    
    @Override
    public void updatePedidos(int id, Pedidos pedidos) {
        
        Pedidos novoPedido = (Pedidos) this.findByIdPedidos(id);
        
            novoPedido.setDescricao(pedidos.getDescricao());
            novoPedido.setQtd(pedidos.getQtd());
            novoPedido.setTipo(pedidos.getTipo());
            novoPedido.setValor(pedidos.getValor());
            novoPedido.setFornecedorId(pedidos.getFornecedorId());
            novoPedido.setItens(pedidos.getItens());
            novoPedido.setEspecie(pedidos.getEspecie());
            novoPedido.setParcelas(pedidos.getParcelas());
            novoPedido.setStatus(pedidos.getStatus());
            
        entityManager.flush();
    }
    
    @Override
    public void cancelaPedido(int id, String status, Pedidos pedidos) {
        
        Pedidos novoPedido = (Pedidos) this.findByIdPedidos(id);
        
            
            novoPedido.setStatus(pedidos.getStatus());
            
        entityManager.flush();
    }

    @Override
    public void deletePedidos(int id) {
        entityManager.remove(getPedidosByIDPedidos((int) id));
    }

    /*********************************************
    *******      CHECA EXISTENCIA         ********
    *********************************************/
    
    @Override
    public boolean pedidosExists(String tipo, String descricao) {
        String hql = "FROM Pedidos as ped WHERE ped.tipo = ? and ped.descricao = ?";
        int count = entityManager.createQuery(hql).setParameter(1, tipo)
                .setParameter(2, descricao).getResultList().size();
        return count > 0 ? true : false;
    }
    
    /*********************************************
    ************      FINDS         **************
    *********************************************/
    
    @SuppressWarnings("unchecked")
    @Override
    public List<Pedidos> findAllPedidos(){
        String hql = "FROM Pedidos as ped ORDER BY ped.id";
        return (List<Pedidos>) entityManager.createQuery(hql).getResultList();
    }
    
    @Override
    public Pedidos findByIdPedidos(int id) {
        return (Pedidos) entityManager.find(Pedidos.class, id);
    }

    @Override
    public List<Pedidos> findByIdTipo(String tipo) {
        String hql = "FROM Pedidos as ped where ped.tipo=?";
        return (List<Pedidos>) entityManager.createQuery(hql).setParameter(1, tipo).getResultList();
    }

    @Override
    public List<Pedidos> findByIdProduto(int idproduto) {
        String hql = "FROM Pedidos as ped where ped.idproduto=?";
        return (List<Pedidos>) entityManager.createQuery(hql).setParameter(1, idproduto).getResultList();
    }

    @Override
    public List<Pedidos> findByDescricao(String descricao) {
        String hql = "FROM Pedidos as ped where ped.descricao=?";
        return (List<Pedidos>) entityManager.createQuery(hql).setParameter(1, descricao).getResultList();
    }

    @Override
    public List<Pedidos> findByValor(double valor) {
        String hql = "FROM Pedidos as ped where ped.valor=?";
        return (List<Pedidos>) entityManager.createQuery(hql).setParameter(1, valor).getResultList();
    }

    @Override
    public List<Pedidos> findByQTD(int qtd) {
        String hql = "FROM Pedidos as ped where ped.qtd=?";
        return (List<Pedidos>) entityManager.createQuery(hql).setParameter(1, qtd).getResultList();
    }
    
    @Override
    public List<Pedidos> Pagamentos(){
        String hql = "SELECT ped.especie,ped.parcelas,ped.valor FROM Pedidos as ped ORDER BY ped.id";
        return (List<Pedidos>) entityManager.createQuery(hql).getResultList();
    }
    
    @Override
    public List<Pedidos> Parcelas(){
        String hql = "SELECT ped.value,ped.viewValue FROM Pedidos as ped ORDER BY ped.id";
        return (List<Pedidos>) entityManager.createQuery(hql).getResultList();
    }
    
}
