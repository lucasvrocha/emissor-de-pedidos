/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hello;

import java.util.List;

public interface authenticateInterfaceRepositorio {
    
    //ENCONTRA PELO ID
    authenticate FindById(int id);
    List<authenticate> FindByNome(String nome);
    List<authenticate> FindByUsuario(String usuario);
    List<authenticate> FindBySenha(String senha);
    List<authenticate> FindByRoles(String roles);
    List<authenticate> FindBySeller(boolean seller);
    List<authenticate> FindByAdmin(boolean admin);
    List<authenticate> FindByEmail(String email);
    List<authenticate> FindByFoto(String foto);
    List<authenticate> FindByJWT(String jwt);
            
            
            
    List<authenticate> findAllAuthenticate();
            
    void addAuthenticate(authenticate authen);
    void updateAuthenticate(int id,authenticate authen);
    void deleteAuthenticate(int id);
    boolean authenticateExists(String nome, String usuario);
}
