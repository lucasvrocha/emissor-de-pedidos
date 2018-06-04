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
public class authenticate {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    int id;
    
    @Column(nullable=false)
    String nome;
    
    @Column(nullable=false)
    String usuario;
    
    @Column(nullable=false)
    String senha;
    
    @Column(nullable=false)
    String roles;
        
    @Column(nullable=false)
    boolean seller;

    @Column(nullable=false)
    boolean admin;
    
    @Column(nullable=false)
    String email;
    
    @Column(nullable=false)
    String foto;
    
    @Column(nullable=false)
    String jwt;

    public authenticate() {
    }

    public authenticate(String nome, String usuario, String senha, String roles, boolean seller, boolean admin, String email, String foto, String jwt) {
        this.nome = nome;
        this.usuario = usuario;
        this.senha = senha;
        this.roles = roles;
        this.seller = seller;
        this.admin = admin;
        this.email = email;
        this.foto = foto;
        this.jwt = jwt;
    }

    public String getEmail() {
        return email;
    }

    public String getFoto() {
        return foto;
    }

    public int getId() {
        return id;
    }

    public String getJwt() {
        return jwt;
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
    
    public boolean getAdmin(){
        return admin;
    }
    
    public boolean getSeller(){
        return seller;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public void setSeller(boolean seller) {
        this.seller = seller;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    
    
}
