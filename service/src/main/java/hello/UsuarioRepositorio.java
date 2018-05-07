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
public class UsuarioRepositorio implements UsuarioInterfaceRepositorio{

    @PersistenceContext
    private EntityManager entityManager;
    
    public Usuario getUsuarioByIDUsuario(int id) {
        return entityManager.find(Usuario.class, id);
    }
    
    /*********************************************
    ************      FINDS         **************
    *********************************************/
    
    @Override
    public Usuario findByIDUsuario(int id) {
        return (Usuario) entityManager.find(Usuario.class, id);
    }

    @Override
    public List<Usuario> findByNome(String nome) {
        String hql = "FROM Usuario as user where user.nome=?";
        return (List<Usuario>) entityManager.createQuery(hql).setParameter(1, nome).getResultList();
    }

    @Override
    public List<Usuario> findByUsuarioNome(String usuario) {
        String hql = "FROM Usuario as user where user.usuario=?";
        return (List<Usuario>) entityManager.createQuery(hql).setParameter(1, usuario).getResultList();
    }

    @Override
    public List<Usuario> findBySenha(String senha) {
        String hql = "FROM Usuario as user where user.senha=?";
        return (List<Usuario>) entityManager.createQuery(hql).setParameter(1, senha).getResultList();
    }

    @Override
    public List<Usuario> findByEmail(String email) {
        String hql = "FROM Usuario as user where user.email=?";
        return (List<Usuario>) entityManager.createQuery(hql).setParameter(1, email).getResultList();
    }

    @Override
    public List<Usuario> findByFoto(String foto) {
        String hql = "FROM Usuario as user where user.foto=?";
        return (List<Usuario>) entityManager.createQuery(hql).setParameter(1, foto).getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Usuario> findAllUsuario() {
        String hql = "FROM Usuario as user ORDER BY user.id";
        return (List<Usuario>) entityManager.createQuery(hql).getResultList();
    }

    /*********************************************
    ********   ALTERACOES DE DADOS      **********
    *********************************************/
    
    @Override
    public void addUsuario(Usuario usuario){
        entityManager.persist(usuario);
    }

    @Override
    public void updateUsuario(int id,Usuario usuario) {
        Usuario novousuario = this.findByIDUsuario(id);
        
        novousuario.setNome(usuario.getNome());
        novousuario.setUsuario(usuario.getUsuario());
        novousuario.setSenha(usuario.getSenha());
        novousuario.setFoto(usuario.getFoto());
        novousuario.setRoles(usuario.getRoles());
        
        entityManager.flush();
    }

    @Override
    public void deleteUsuario(int id) {
        entityManager.remove(getUsuarioByIDUsuario((int) id));
    }

    
    /*********************************************
    *******      CHECA EXISTENCIA         ********
    *********************************************/
    
    @Override
    public boolean UsuarioExists(String nome, String usuario) {
        String hql = "FROM Usuario as user WHERE user.nome = ? and user.usuario = ?";
        int count = entityManager.createQuery(hql).setParameter(1, nome)
                .setParameter(2, usuario).getResultList().size();
        return count > 0 ? true : false;
    }
    
}
