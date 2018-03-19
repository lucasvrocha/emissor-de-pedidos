/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hello;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;


 import javax.persistence.Column;
 import javax.persistence.Entity;
 import javax.persistence.GeneratedValue;
 import javax.persistence.GenerationType;
 import javax.persistence.Id;

@Entity
public class Fornecedor {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO) 
    private String  CNPJFornecedor;
    
    @Column(nullable=false)
    private String  IE;
    
    @Column(nullable=false)
    private String  RazaoSocial;
    
    @Column(nullable=false)
    private long     IDFornecedor;

    public Fornecedor() {
    }

    public Fornecedor(String CNPJFornecedor, String IE, String RazaoSocial, long IDFornecedor) {
        this.CNPJFornecedor = CNPJFornecedor;
        this.IE = IE;
        this.RazaoSocial = RazaoSocial;
        this.IDFornecedor = IDFornecedor;
    }

    
    /***************************************************************************************************************
     *******************************               GETTERS                 *****************************************
     ***************************************************************************************************************/
    
    
    public String getCNPJFornecedor() {
        return CNPJFornecedor;
    }

    public String getIE() {
        return IE;
    }

    public String getRazaoSocial() {
        return RazaoSocial;
    }

    public long getIDFornecedor() {
        return IDFornecedor;
    }

    
    /***************************************************************************************************************
     *******************************               SETTERS                 *****************************************
     ***************************************************************************************************************/
    
    public void setCNPJFornecedor(String CNPJFornecedor) {
        this.CNPJFornecedor = CNPJFornecedor;
    }

    public void setIE(String IE) {
        this.IE = IE;
    }

    public void setRazaoSocial(String RazaoSocial) {
        this.RazaoSocial = RazaoSocial;
    }

    public void setIDFornecedor(long IDFornecedor) {
        this.IDFornecedor = IDFornecedor;
    }
    
    
    /***************************************************************************************************************
     ***************************************************************************************************************
     ***************************************************************************************************************/
        
    //(SELECT * FROM FORNECEDOR);
            
    /*private String  CNPJFornecedor;
    private String  IE;
    private String  RazaoSocial;
    private long     IDFornecedor;
    
    
    private void Salvar(){}
    private void Alterar(){}
    private void Excluir(){}*/
    
    @RequestMapping("/fornecedor")
    @ResponseBody
    String home() {
        return "Hue!";
    }
    
}
