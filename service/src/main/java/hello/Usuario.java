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
public class Usuario implements Serializable{
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO) 
    private int     IDUsuario;
    
    @Column(nullable=false)
    private String  Nome;
    
    @Column(nullable=false)
    private String  UsuarioNome;
    
    @Column(nullable=false)
    private String  Senha;
    
    @Column(nullable=false)
    private String  Roles;
    
    @Column(nullable=false)
    private String  Foto;

    public Usuario() {
    }

    public Usuario(String Nome, String UsuarioNome, String Senha, String Roles,String Foto) {
        this.Nome           = Nome;
        this.UsuarioNome    = UsuarioNome;
        this.Senha          = Senha;
        this.Roles          = Roles;
        this.Foto           = Foto;
    }
    
    /*********************************************
    ************      GETTERS       **************
    *********************************************/
    public int getIDUsuario() {
        return IDUsuario;
    }

    public String getNome() {
        return Nome;
    }

    public String getRoles() {
        return Roles;
    }

    public String getSenha() {
        return Senha;
    }

    public String getUsuarioNome() {
        return UsuarioNome;
    }

    public String getFoto() {
        return Foto;
    }
    
    /*********************************************
    ************      SETTERS       **************
    *********************************************/
    public void setIDUsuario(int IDUsuario) {
        this.IDUsuario = IDUsuario;
    }

    public void setNome(String Nome) {
        this.Nome = Nome;
    }

    public void setRoles(String Roles) {
        this.Roles = Roles;
    }

    public void setSenha(String Senha) {
        this.Senha = Senha;
    }

    public void setUsuarioNome(String UsuarioNome) {
        this.UsuarioNome = UsuarioNome;
    }

    public void setFoto(String Foto) {
        this.Foto = Foto;
    }
    
}
