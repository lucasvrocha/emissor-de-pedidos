/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hello;

import java.util.List;


public interface UsuarioInterfaceRepositorio {
    
    
    //      ENCONTRA O USUARIO PELO ID
    Usuario findByIDUsuario(int IDUsuario);
    
    //      ENCONTRA O USUARIO PELO NOME
    List<Usuario> findByNome(String Nome);
    
    //      ENCONTRA O USUARIO PELA USUARIO
    List<Usuario> findByUsuarioNome(String UsuarioNome);
    
    //      ENCONTRA O USUARIO PELA SENHA
    List<Usuario> findBySenha(String Senha);
    
    //      ENCONTRA O USUARIO PELO EMAIL
    List<Usuario> findByEmail(String email);
    
    //      ENCONTRA O USUARIO PELA FOTO
    List<Usuario> findByFoto(String Foto);
    
    List<Usuario> findAllUsuario();
    
    
    void addUsuario(Usuario usuario);
    void updateUsuario(Usuario usuario);
    void deleteUsuario(int IdUsuario);
    boolean UsuarioExists(String Nome, String UsuarioNome);
    
}
