/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hello;

 import java.util.List;
 import org.springframework.data.jpa.repository.JpaRepository;

public interface FornecedorRepositorio extends JpaRepository<Fornecedor, String>{
    
    //      ENCONTRA O FORNECEDOR PELO CNPJ
    List<Fornecedor> findByCNPJFornecedor(String CNPJFornecedor);
    
    //      ENCONTRA O FORNECEDOR PELO ID
    List<Fornecedor> findByIDFornecedor(long IDFornecedor);
    
    //      ENCONTRA O FORNECEDOR PELO IE
    List<Fornecedor> findByIE(String IE);
    
    //      ENCONTRA O FORNECEDOR PELA RAZÃO SOCIAL
    List<Fornecedor> findByRazaoSocial(String RazaoSocial);
    
}
