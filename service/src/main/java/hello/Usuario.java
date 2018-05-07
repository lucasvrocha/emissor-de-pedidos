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
    private int     id;
    
    @Column(nullable=false)
    private String  nome;
    
    @Column(nullable=false)
    private String  usuario;
    
    @Column(nullable=false)
    private String  senha;
    
    @Column(nullable=false)
    private String  roles;
    
    @Column(nullable=false)
    private String  foto;

    public Usuario() {
    }

    public Usuario(String Nome, String usuario, String Senha, String Roles,String Foto) {
        this.nome           = Nome;
        this.usuario        = usuario;
        this.senha          = Senha;
        this.roles          = Roles;
        this.foto           = Foto;
    }
    
    /*********************************************
    ************      GETTERS       **************
    *********************************************/
    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getRoles() {
        return roles;
    }

    public String getSenha() {
        return senha;
    }

    public String getUsuario() {
        return usuario;
    }

    public String getFoto() {
        return foto;
    }
    
    /*********************************************
    ************      SETTERS       **************
    *********************************************/
    public void setId(int id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }
    
}
