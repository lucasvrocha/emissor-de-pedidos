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
public class ProdutoRepositorio implements ProdutoInferfaceRepositorio{

    public ProdutoRepositorio() {
    }

    @PersistenceContext
    private EntityManager entityManager;
    
    public Produto getProdutoByID(int id) {
        return entityManager.find(Produto.class, id);
    }
    
    
    /*********************************************
    ************      FINDS         **************
    *********************************************/
    
    @SuppressWarnings("unchecked")
    @Override
    public Produto findByID(int id) {
        return (Produto) entityManager.find(Produto.class, id);
    }

    @Override
    public List<Produto> findByIDFornecedor(long idfornecedor) {
        String hql = "FROM Produto as prod where prod.idfornecedor=?";
        return (List<Produto>) entityManager.createQuery(hql).setParameter(1, idfornecedor).getResultList();
    }

    @Override
    public List<Produto> findByDescritivo(String descritivo) {
        String hql = "FROM Produto as prod where prod.descritivo=?";
        return (List<Produto>) entityManager.createQuery(hql).setParameter(1, descritivo).getResultList();
    }

    @Override
    public List<Produto> findByQuantidade(int quantidade) {
        String hql = "FROM Produto as prod where prod.quantidade=?";
        return (List<Produto>) entityManager.createQuery(hql).setParameter(1, quantidade).getResultList();
    }

    @Override
    public List<Produto> findByQuantMin(int quantidadeMinima) {
        String hql = "FROM Produto as prod where prod.quantidadeMinima=?";
        return (List<Produto>) entityManager.createQuery(hql).setParameter(1, quantidadeMinima).getResultList();
    }

    @Override
    public List<Produto> findByPreco(double preco) {
        String hql = "FROM Produto as prod where prod.preco=?";
        return (List<Produto>) entityManager.createQuery(hql).setParameter(1, preco).getResultList();
    }

    @Override
    public List<Produto> findAllProduto() {
        String hql = "FROM Produto as prod ORDER BY prod.id";
        return (List<Produto>) entityManager.createQuery(hql).getResultList();
    }
    
    @Override
    public List<Produto> findAllProdutoFornecedor() {
        String hql = "SELECT prod,forn.razaosocial f.nome FROM Produto prod, Fornecedor forn "
                +"WHERE prod.fornecedorid = forn.id"+
                "ORDER BY prod.fornecedorid";
        return (List<Produto>) entityManager.createQuery(hql).getResultList();
    }
    
    /*********************************************
    ********   ALTERACOES DE DADOS      **********
    *********************************************/
    @Override
    public void addProduto(Produto produto) {
        entityManager.persist(produto);
    }

    @Override
    public void updateProduto(int id, Produto produto) {
        Produto novoproduto = this.findByID(id);
                
                novoproduto.setId(produto.getId());
                novoproduto.setDescritivo(produto.getDescritivo());
                novoproduto.setPreco(produto.getPreco());
                novoproduto.setQuantidade(produto.getQuantidade());
                novoproduto.setQuantidadeMinima(produto.getQuantidadeMinima());
                novoproduto.setFornecedorId(produto.getFornecedorId());
                
        entityManager.flush();
    }

    @Override
    public void deleteProduto(int id) {
        entityManager.remove(getProdutoByID(id));
    }

    
    /*********************************************
    *******      CHECA EXISTENCIA         ********
    *********************************************/
    @Override
    public boolean produtoExists(String descritivo, int quantidade, int quantidadeMinima, double preco) {
        String hql = "FROM Produto as prod WHERE prod.descritivo = ? , prod.quantidade = ? , prod.quantidadeMinima = ? ,"
                + "prod.preco = ? ";
        int count = entityManager.createQuery(hql).setParameter(1, descritivo)
                .setParameter(2, quantidade)
                .setParameter(3, quantidadeMinima)
                .setParameter(4, preco).getResultList().size();
        return count > 0 ? true : false;
    }
    
}
