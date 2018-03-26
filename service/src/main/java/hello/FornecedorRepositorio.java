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

    public Fornecedor getFornecedorByIDFornecedor(int IDFornecedor) {
        return entityManager.find(Fornecedor.class, IDFornecedor);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Fornecedor> findAllFornecedor() {
        String hql = "FROM Fornecedor as forn ORDER BY forn.IDFornecedor";
        return (List<Fornecedor>) entityManager.createQuery(hql).getResultList();
    }

    @Override
    public void addFornecedor(Fornecedor fornecedor) {
        entityManager.persist(fornecedor);
    }

    @Override
    public void updateFornecedor(Fornecedor fornecedor) {
        Fornecedor forn = getFornecedorByIDFornecedor((int) fornecedor.getIDFornecedor());
        forn.setRazaoSocial(fornecedor.getRazaoSocial());
        forn.setIE(fornecedor.getIE());
        entityManager.flush();
    }

    @Override
    public void deleteFornecedor(long IDFornecedor) {
        entityManager.remove(getFornecedorByIDFornecedor((int) IDFornecedor));
    }

    @Override
    public boolean fornecedorExists(String IE, String RazaoSocial) {
        String hql = "FROM Fornecedor as forn WHERE forn.IE = ? and forn.RazaoSocial = ?";
        int count = entityManager.createQuery(hql).setParameter(1, IE)
                .setParameter(2, RazaoSocial).getResultList().size();
        return count > 0 ? true : false;
    }

    @Override
    public List<Fornecedor> findByCNPJFornecedor(String CNPJFornecedor) {
        String hql = "FROM Fornecedor as forn where forn.CNPJFornecedor=?";
        return (List<Fornecedor>) entityManager.createQuery(hql).setParameter(1, CNPJFornecedor).getResultList();
    }

    //      ENCONTRA O FORNECEDOR PELO ID
    @Override
    public Fornecedor findByIDFornecedor(long IDFornecedor) {
        return (Fornecedor) entityManager.find(Fornecedor.class, IDFornecedor);
    }

    //      ENCONTRA O FORNECEDOR PELO IE
    @Override
    public List<Fornecedor> findByIE(String IE) {
        String hql = "FROM Fornecedor as forn where forn.IE=?";
        return (List<Fornecedor>) entityManager.createQuery(hql).setParameter(1, IE).getResultList();
    }

    //      ENCONTRA O FORNECEDOR PELA RAZÃO SOCIAL
    @Override
    public List<Fornecedor> findByRazaoSocial(String RazaoSocial) {
        String hql = "FROM Fornecedor as forn where forn.RazaoSocial=?";
        return (List<Fornecedor>) entityManager.createQuery(hql).setParameter(1, RazaoSocial).getResultList();
    }

}
