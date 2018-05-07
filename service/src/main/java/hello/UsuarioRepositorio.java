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
    
    public Usuario getUsuarioByIDUsuario(int IDUsuario) {
        return entityManager.find(Usuario.class, IDUsuario);
    }
    
    /*********************************************
    ************      FINDS         **************
    *********************************************/
    
    @Override
    public Usuario findByIDUsuario(int IDUsuario) {
        return (Usuario) entityManager.find(Usuario.class, IDUsuario);
    }

    @Override
    public List<Usuario> findByNome(String Nome) {
        String hql = "FROM Usuario as user where user.Nome=?";
        return (List<Usuario>) entityManager.createQuery(hql).setParameter(1, Nome).getResultList();
    }

    @Override
    public List<Usuario> findByUsuarioNome(String UsuarioNome) {
        String hql = "FROM Usuario as user where user.UsuarioNome=?";
        return (List<Usuario>) entityManager.createQuery(hql).setParameter(1, UsuarioNome).getResultList();
    }

    @Override
    public List<Usuario> findBySenha(String Senha) {
        String hql = "FROM Usuario as user where user.Senha=?";
        return (List<Usuario>) entityManager.createQuery(hql).setParameter(1, Senha).getResultList();
    }

    @Override
    public List<Usuario> findByEmail(String email) {
        String hql = "FROM Usuario as user where user.email=?";
        return (List<Usuario>) entityManager.createQuery(hql).setParameter(1, email).getResultList();
    }

    @Override
    public List<Usuario> findByFoto(String Foto) {
        String hql = "FROM Usuario as user where user.Foto=?";
        return (List<Usuario>) entityManager.createQuery(hql).setParameter(1, Foto).getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Usuario> findAllUsuario() {
        String hql = "FROM Usuario as user ORDER BY user.IDUsuario";
        return (List<Usuario>) entityManager.createQuery(hql).getResultList();
    }

    /*********************************************
    ********   ALTERACOES DE DADOS      **********
    *********************************************/
    
    //Erro desconhecido aqui
    @Override
    public void addUsuario(Usuario usuario){
        entityManager.persist(usuario);
    }

    @Override
    public void updateUsuario(int id,Usuario usuario) {
        Usuario novousuario = this.findByIDUsuario(id);
        
        novousuario.setNome(usuario.getNome());
        novousuario.setUsuarioNome(usuario.getUsuarioNome());
        novousuario.setSenha(usuario.getSenha());
        novousuario.setFoto(usuario.getFoto());
        novousuario.setRoles(usuario.getRoles());
        
        entityManager.flush();
    }

    @Override
    public void deleteUsuario(int IdUsuario) {
        entityManager.remove(getUsuarioByIDUsuario((int) IdUsuario));
    }

    
    /*********************************************
    *******      CHECA EXISTENCIA         ********
    *********************************************/
    
    @Override
    public boolean UsuarioExists(String Nome, String UsuarioNome) {
        String hql = "FROM Usuario as user WHERE user.Nome = ? and user.UsuarioNome = ?";
        int count = entityManager.createQuery(hql).setParameter(1, Nome)
                .setParameter(2, UsuarioNome).getResultList().size();
        return count > 0 ? true : false;
    }
    
}
