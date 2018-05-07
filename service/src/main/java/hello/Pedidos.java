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
public class Pedidos implements Serializable{

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    
    @Column(nullable=false)
    String tipo;
    
    @Column(nullable=false)
    int idproduto;
    
    @Column(nullable=false)
    String descricao;
    
    @Column(nullable=false)
    double valor;
    
    @Column(nullable=false)
    //quantidade
    int qtd;
    
    @Column(nullable=false)
    String itens;
    
    @Column(nullable=false)
    String especie;
    
    @Column(nullable=false)
    int parcelas;
    
    @Column(nullable=false)
    String status;

    public Pedidos() {
    }

    public Pedidos(String tipo, int idproduto, String descricao, double valor, int qtd, String itens, String especie, int parcelas, String status) {
        this.tipo = tipo;
        this.idproduto = idproduto;
        this.descricao = descricao;
        this.valor = valor;
        this.qtd = qtd;
        this.itens = itens;
        this.especie = especie;
        this.parcelas = parcelas;
        this.status = status;
    }
    
    
    /*********************************************
    ************      GETTERS       **************
    *********************************************/
    public int getId() {
        return id;
    }

    public String getTipo() {
        return tipo;
    }

    public int getIdproduto() {
        return idproduto;
    }

    public String getDescricao() {
        return descricao;
    }

    public double getValor() {
        return valor;
    }

    public int getQtd() {
        return qtd;
    }

    public String getEspecie() {
        return especie;
    }

    public String getItens() {
        return itens;
    }

    public int getParcelas() {
        return parcelas;
    }

    public String getStatus() {
        return status;
    }
    
    /*********************************************
    ************      SETTERS       **************
    *********************************************/
    
    public void setId(int id) {
        this.id = id;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setIdproduto(int idproduto) {
        this.idproduto = idproduto;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public void setQtd(int qtd) {
        this.qtd = qtd;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public void setItens(String itens) {
        this.itens = itens;
    }

    public void setParcelas(int parcelas) {
        this.parcelas = parcelas;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
}
