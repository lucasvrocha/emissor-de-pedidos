/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hello;

  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.stereotype.Controller;
  import org.springframework.ui.Model;
  import org.springframework.web.bind.annotation.PathVariable;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RequestMethod;
  import org.springframework.boot.autoconfigure.EnableAutoConfiguration; 

import javax.persistence.Entity;
        
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import org.hibernate.annotations.*;
   
@Controller
@RequestMapping("/pedidos")
public class PedidosControlador {
    
    @Autowired
    PedidosInterfaceRepositorio pedidosInterfaceRepositorio;
    
    // RETORNA UMA LISTA CONTENDO TODOS OS REGISTROS 
    @ResponseBody
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Pedidos> listaPedidos() {
            return (List<Pedidos>) pedidosInterfaceRepositorio.findAllPedidos();
    }
    
    // RETORNA PEDIDO DE DETERMINADO ID
    @ResponseBody
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Pedidos pedidos(@PathVariable("id") String id) {
        Pedidos pedidos = pedidosInterfaceRepositorio.findByIdPedidos(Integer.parseInt(id));
              
        return pedidos;
    }
    
    //RETORNA O PAGAMENTO// especie, parcelas, valor
    @ResponseBody
    @RequestMapping(value = "/pagamentos", method = RequestMethod.GET)
    public List<Pedidos> Pagamentos() {
            return (List<Pedidos>) pedidosInterfaceRepositorio.Pagamentos();
    }
    
    //RETORNA AS PARCELAS// value, viewValue
    @ResponseBody
    @RequestMapping(value = "/parcelas", method = RequestMethod.GET)
    public List<Pedidos> Parcelas() {
            return (List<Pedidos>) pedidosInterfaceRepositorio.Parcelas();
    }
    
    // ADICIONA UM NOVO PEDIDO
        @ResponseBody
        @RequestMapping( method = RequestMethod.POST)
        public String adicionaPedidoString(@PathVariable("Tipo") String descricao, Pedidos pedidos) {
              pedidos.setTipo(descricao);
              pedidosInterfaceRepositorio.addPedidos(pedidos);
              return "redirect:/{descricao}";
        }
        
        // ATUALIZA UM PEDIDO
        @ResponseBody
        @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Pedidos> updatePedido(@PathVariable("id") int id, @RequestBody Pedidos pedidos) {
            Pedidos novoPedido = pedidosInterfaceRepositorio.findByIdPedidos(id);
        
            novoPedido.setDescricao(pedidos.getDescricao());
            novoPedido.setQtd(pedidos.getQtd());
            novoPedido.setTipo(pedidos.getTipo());
            novoPedido.setValor(pedidos.getValor());
            novoPedido.setFornecedorId(pedidos.getFornecedorId());
            novoPedido.setItens(pedidos.getItens());
            novoPedido.setEspecie(pedidos.getEspecie());
            novoPedido.setParcelas(pedidos.getParcelas());
            novoPedido.setStatus(pedidos.getStatus());
            
            
            pedidosInterfaceRepositorio.updatePedidos(id,novoPedido);
            return new ResponseEntity<Pedidos>(novoPedido, HttpStatus.OK);
        }
        
        // DELETA UM PEDIDO
        @ResponseBody
        @RequestMapping(value = "/cancelar/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Pedidos> deletaPedido(@PathVariable("id") int id, @RequestBody Pedidos pedidos) {
            Pedidos novoPedido = pedidosInterfaceRepositorio.findByIdPedidos(id);
            if(pedidos.getStatus() == "cancelado"){
                novoPedido.setParcelas(0);
                novoPedido.setStatus("cancelado");
            }
            else if(pedidos.getStatus() == "finalizado"){
                novoPedido.setParcelas(0);
                novoPedido.setStatus("finalizado");
            }
            
            
            pedidosInterfaceRepositorio.updatePedidos(id,novoPedido);
            return new ResponseEntity<Pedidos>(novoPedido, HttpStatus.OK);
        }
        
        // DELETE UM PEDIDO
        @ResponseBody
        @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteArticle(@PathVariable("id") int id) {
		pedidosInterfaceRepositorio.deletePedidos(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
    
        
        /*************************************************************
        **************************************************************
        **************************************************************/
        @ResponseBody
        @RequestMapping(value="/testeinsercao")
        public void testeInsercao(){
            Pedidos pedidos = new Pedidos("compra", 5, "Varias coisa", 7.50, 5,"varios","Money",5,"Tenta");
            pedidosInterfaceRepositorio.addPedidos(pedidos);
        }
}
