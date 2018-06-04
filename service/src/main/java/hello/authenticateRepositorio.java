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
public class authenticateRepositorio implements authenticateInterfaceRepositorio{

    
    @PersistenceContext
    private EntityManager entityManager;
    
    public authenticate getAuthenticateByAuthenticate(int id) {
        return entityManager.find(authenticate.class, id);
    }
    
    /*********************************************
    ************      FINDS         **************
    *********************************************/
    @Override
    public authenticate FindById(int id) {
        return (authenticate) entityManager.find(authenticate.class, id);
    }

    @Override
    public List<authenticate> FindByNome(String nome) {
        String hql = "FROM authenticate as authen where authen.nome=?";
        return (List<authenticate>) entityManager.createQuery(hql).setParameter(1, nome).getResultList();
    }

    @Override
    public List<authenticate> FindByUsuario(String usuario) {
        String hql = "FROM authenticate as authen where authen.usuario=?";
        return (List<authenticate>) entityManager.createQuery(hql).setParameter(1, usuario).getResultList();
    }

    @Override
    public List<authenticate> FindBySenha(String senha) {
        String hql = "FROM authenticate as authen where authen.senha=?";
        return (List<authenticate>) entityManager.createQuery(hql).setParameter(1, senha).getResultList();
    }

    @Override
    public List<authenticate> FindByRoles(String roles) {
        String hql = "FROM authenticate as authen where authen.roles=?";
        return (List<authenticate>) entityManager.createQuery(hql).setParameter(1, roles).getResultList();
    }

    @Override
    public List<authenticate> FindBySeller(boolean seller) {
        String hql = "FROM authenticate as authen where authen.seller=?";
        return (List<authenticate>) entityManager.createQuery(hql).setParameter(1, seller).getResultList();
    }

    @Override
    public List<authenticate> FindByAdmin(boolean admin) {
        String hql = "FROM authenticate as authen where authen.admin=?";
        return (List<authenticate>) entityManager.createQuery(hql).setParameter(1, admin).getResultList();
    }

    @Override
    public List<authenticate> FindByEmail(String email) {
        String hql = "FROM authenticate as authen where authen.email=?";
        return (List<authenticate>) entityManager.createQuery(hql).setParameter(1, email).getResultList();
    }

    @Override
    public List<authenticate> FindByFoto(String foto) {
        String hql = "FROM authenticate as authen where authen.foto=?";
        return (List<authenticate>) entityManager.createQuery(hql).setParameter(1, foto).getResultList();
    }

    @Override
    public List<authenticate> FindByJWT(String jwt) {
        String hql = "FROM authenticate as authen where authen.jwt=?";
        return (List<authenticate>) entityManager.createQuery(hql).setParameter(1, jwt).getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<authenticate> findAllAuthenticate() {
        String hql = "FROM authenticate as authen ORDER BY authen.id";
        return (List<authenticate>) entityManager.createQuery(hql).getResultList();
    }

    
    /*********************************************
    ********   ALTERACOES DE DADOS      **********
    *********************************************/
    @Override
    public void addAuthenticate(authenticate authen) {
        entityManager.persist(authen);
    }

    @Override
    public void updateAuthenticate(int id, authenticate authen) {
        authenticate newauthenticate = this.FindById(id);
        
        newauthenticate.setNome(authen.getNome());
        newauthenticate.setUsuario(authen.getUsuario());
        newauthenticate.setSenha(authen.getSenha());
        newauthenticate.setFoto(authen.getFoto());
        newauthenticate.setRoles(authen.getRoles());
        newauthenticate.setAdmin(authen.getAdmin());
        newauthenticate.setSeller(authen.getSeller());
        newauthenticate.setEmail(authen.getEmail());
        newauthenticate.setJwt(authen.getJwt());
        
        entityManager.flush();
    }

    @Override
    public void deleteAuthenticate(int id) {
        entityManager.remove(getAuthenticateByAuthenticate(id));
    }

    
    /*********************************************
    *******      CHECA EXISTENCIA         ********
    *********************************************/
    @Override
    public boolean authenticateExists(String nome, String usuario) {
        String hql = "FROM authenticate as authen WHERE authen.nome = ? and authen.usuario = ?";
        int count = entityManager.createQuery(hql).setParameter(1, nome)
                .setParameter(2, usuario).getResultList().size();
        return count > 0 ? true : false;
    }
    
}
