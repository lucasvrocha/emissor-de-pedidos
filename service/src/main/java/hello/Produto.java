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
public class Produto implements Serializable{
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    
    @Column(nullable=false)
    String descritivo;
    
    @Column(nullable=false)
    int quantidade;
    
    @Column(nullable=false)
    int quantidadeMinima;
    
    @Column(nullable=false)
    long fornecedorId;
    
    @Column(nullable=false)
    double preco;
    
    @Column(nullable=false)
    String fornecedor;

    public Produto() {
    }

    public Produto(String descritivo, int quantidade, int quantidadeMinima, long fornecedorId, double preco,String fornecedor) {
        this.descritivo         = descritivo;
        this.quantidade         = quantidade;
        this.quantidadeMinima   = quantidadeMinima;
        this.fornecedorId       = fornecedorId;
        this.preco              = preco;
        this.fornecedor         = fornecedor;
    }
    
    
    /*********************************************
    ************      SETTERS       **************
    *********************************************/
    public void setId(int id) {
        this.id = id;
    }

    public void setFornecedorId(long fornecedorId) {
        this.fornecedorId = fornecedorId;
    }

    public void setDescritivo(String descritivo) {
        this.descritivo = descritivo;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public void setQuantidadeMinima(int quantidadeMinima) {
        this.quantidadeMinima = quantidadeMinima;
    }

    public void setFornecedor(String fornecedor) {
        this.fornecedor = fornecedor;
    }
    
    
    /*********************************************
    ************      GETTERS       **************
    *********************************************/
    public int getId() {
        return id;
    }

    public String getDescritivo() {
        return descritivo;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public int getQuantidadeMinima() {
        return quantidadeMinima;
    }

    public long getFornecedorId() {
        return fornecedorId;
    }

    public double getPreco() {
        return preco;
    }

    public String getFornecedor() {
        return fornecedor;
    }
    
    
    
}
