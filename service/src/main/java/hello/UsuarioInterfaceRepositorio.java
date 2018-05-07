/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hello;

import java.util.List;


public interface UsuarioInterfaceRepositorio {
    
    
    //      ENCONTRA O USUARIO PELO ID
    Usuario findByIDUsuario(int id);
    
    //      ENCONTRA O USUARIO PELO NOME
    List<Usuario> findByNome(String nome);
    
    //      ENCONTRA O USUARIO PELA USUARIO
    List<Usuario> findByUsuarioNome(String usuario);
    
    //      ENCONTRA O USUARIO PELA SENHA
    List<Usuario> findBySenha(String senha);
    
    //      ENCONTRA O USUARIO PELO EMAIL
    List<Usuario> findByEmail(String email);
    
    //      ENCONTRA O USUARIO PELA FOTO
    List<Usuario> findByFoto(String foto);
    
    List<Usuario> findAllUsuario();
    
    
    void addUsuario(Usuario usuario);
    void updateUsuario(int id,Usuario usuario);
    void deleteUsuario(int id);
    boolean UsuarioExists(String nome, String usuario);
    
}
