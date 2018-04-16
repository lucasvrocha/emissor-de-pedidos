/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hello;

 import java.util.List;
 

public interface FornecedorInterfaceRepositorio 
{
    
    //      ENCONTRA O FORNECEDOR PELO CNPJ
    List<Fornecedor> findByCNPJFornecedor(String CNPJFornecedor);
    
    //      ENCONTRA O FORNECEDOR PELO ID
    Fornecedor findByIDFornecedor(long IDFornecedor);
    
    //      ENCONTRA O FORNECEDOR PELO IE
    List<Fornecedor> findByIE(String IE);
    
    //      ENCONTRA O FORNECEDOR PELA RAZÃO SOCIAL
    List<Fornecedor> findByRazaoSocial(String RazaoSocial);
    
    //      ENCONTRA O FORNECEDOR PELA FANTASIA
    List<Fornecedor> findByFantasia(String fantasia);
    
    //      ENCONTRA O FORNECEDOR PELO EMAIL
    List<Fornecedor> findByEmail(String email);
    
    List<Fornecedor> findAllFornecedor();
    
    
    void addFornecedor(Fornecedor fornecedor);
    void updateFornecedor(Fornecedor Fornecedor);
    void deleteFornecedor(long IdFornecedor);
    boolean fornecedorExists(String IE, String RazaoSocial);
    
}
