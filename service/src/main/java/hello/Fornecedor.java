/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hello;

import java.io.Serializable;
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
public class Fornecedor implements Serializable {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO) 
    private long     IDFornecedor;
    
    @Column(nullable=false)
    private String  CNPJFornecedor;
    
    @Column(nullable=false)
    private String  IE;
    
    @Column(nullable=false)
    private String  RazaoSocial;
    
    @Column(nullable=false)
    private String  fantasia;
    
    @Column(nullable=false)
    private String  email;
    
    

    public Fornecedor() {
    }

    public Fornecedor(String CNPJFornecedor, String IE, String RazaoSocial, String fantasia, String email) {
        this.CNPJFornecedor = CNPJFornecedor;
        this.IE             = IE;
        this.RazaoSocial    = RazaoSocial;
        this.fantasia       = fantasia;
        this.email          = email;
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

    public String getEmail() {
        return email;
    }

    public String getFantasia() {
        return fantasia;
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

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFantasia(String fantasia) {
        this.fantasia = fantasia;
    }
    
    
    /***************************************************************************************************************
     ***************************************************************************************************************
     ***************************************************************************************************************/
    
    String home() {
        return "Hue!";
    }
    
}
