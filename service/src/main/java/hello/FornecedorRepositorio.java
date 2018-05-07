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
public class FornecedorRepositorio implements FornecedorInterfaceRepositorio {

    public FornecedorRepositorio() {
    }

    @PersistenceContext
    private EntityManager entityManager;

    public Fornecedor getFornecedorByIDFornecedor(long id) {
        return entityManager.find(Fornecedor.class, id);
    }
    
    /*********************************************
    ********   ALTERACOES DE DADOS      **********
    *********************************************/

    @Override
    public void addFornecedor(Fornecedor fornecedor) {
        entityManager.persist(fornecedor);
    }

    @Override
    public void updateFornecedor(long id,Fornecedor fornecedor) {
        Fornecedor novofornecedor = this.findByIDFornecedor(id);
                
                novofornecedor.setCnpj(fornecedor.getCnpj());
                novofornecedor.setEmail(fornecedor.getEmail());
                novofornecedor.setFantasia(fornecedor.getFantasia());
                novofornecedor.setIe(fornecedor.getIe());
                novofornecedor.setRazao(fornecedor.getRazao());
        entityManager.flush();
    }

    @Override
    public void deleteFornecedor(long id) {
        entityManager.remove(getFornecedorByIDFornecedor((int) id));
    }

    /*********************************************
    *******      CHECA EXISTENCIA         ********
    *********************************************/
    @Override
    public boolean fornecedorExists(String ie, String razao) {
        String hql = "FROM Fornecedor as forn WHERE forn.ie = ? and forn.razao = ?";
        int count = entityManager.createQuery(hql).setParameter(1, ie)
                .setParameter(2, razao).getResultList().size();
        return count > 0 ? true : false;
    }
    
    
    /*********************************************
    ************      FINDS         **************
    *********************************************/

    @SuppressWarnings("unchecked")
    @Override
    public List<Fornecedor> findAllFornecedor() {
        String hql = "FROM Fornecedor as forn ORDER BY forn.id";
        return (List<Fornecedor>) entityManager.createQuery(hql).getResultList();
    }
    
    @Override
    public List<Fornecedor> findByCNPJFornecedor(String cnpj) {
        String hql = "FROM Fornecedor as forn where forn.cnpj=?";
        return (List<Fornecedor>) entityManager.createQuery(hql).setParameter(1, cnpj).getResultList();
    }
    
    
    //      ENCONTRA O FORNECEDOR PELO ID
    @Override
    public Fornecedor findByIDFornecedor(long id) {
        return (Fornecedor) entityManager.find(Fornecedor.class, id);
    }

    //      ENCONTRA O FORNECEDOR PELO IE
    @Override
    public List<Fornecedor> findByIE(String IE) {
        String hql = "FROM Fornecedor as forn where forn.IE=?";
        return (List<Fornecedor>) entityManager.createQuery(hql).setParameter(1, IE).getResultList();
    }

    //      ENCONTRA O FORNECEDOR PELA RAZÃO SOCIAL
    @Override
    public List<Fornecedor> findByRazaoSocial(String razao) {
        String hql = "FROM Fornecedor as forn where forn.razao=?";
        return (List<Fornecedor>) entityManager.createQuery(hql).setParameter(1, razao).getResultList();
    }
    
    //      ENCONTRA O FORNECEDOR PELA FANTASIA
    public List<Fornecedor> findByFantasia(String fantasia){
        String hql = "FROM Fornecedor as forn where forn.fantasia=?";
        return (List<Fornecedor>) entityManager.createQuery(hql).setParameter(1, fantasia).getResultList();
    }
    
    //      ENCONTRA O FORNECEDOR PELO EMAIL
    public List<Fornecedor> findByEmail(String email){
        String hql = "FROM Fornecedor as forn where forn.email=?";
        return (List<Fornecedor>) entityManager.createQuery(hql).setParameter(1, email).getResultList();
    }

}
