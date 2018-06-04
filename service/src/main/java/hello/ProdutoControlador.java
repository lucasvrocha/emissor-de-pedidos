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

   
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
   
@Controller
@RequestMapping("/produto")
public class ProdutoControlador {
    
    @Autowired
    private ProdutoInferfaceRepositorio produtoInterfaceRepositorio;
    
        // RETORNA UMA LISTA CONTENDO TODOS OS REGISTROS 
        @ResponseBody
        @RequestMapping(value = "/all", method = RequestMethod.GET)
        public List<Produto> listaProduto() {
              return (List<Produto>) produtoInterfaceRepositorio.findAllProduto();
        }
        
        // RETORNA UMA LISTA CONTENDO TODOS OS REGISTROS JUNTO COM O NOME DO FORNECEDOR 
        @ResponseBody
        @RequestMapping(value = "/q=repo:angular/material2&sort={{sort}}&order={{order}}&page={{page}}", method = RequestMethod.GET)
        public List<Produto> listaProdutoFornecedor() {
              return (List<Produto>) produtoInterfaceRepositorio.findAllProdutoFornecedor();
        }
        
        // RETORNA PRODUTO DE DETERMINADO ID
        @ResponseBody
        @RequestMapping(value = "/{id}", method = RequestMethod.GET)
        public Produto produto(@PathVariable("id") String id) {
              Produto produto = produtoInterfaceRepositorio.findByID(Integer.parseInt(id));
              
              return produto;
        };
        
        // ADICIONA UM NOVO PRODUTO
        @ResponseBody
        @RequestMapping( method = RequestMethod.POST)
        public String adicionaProduto(@PathVariable("descritivo") String descritivo, Produto produto) {
              produto.setDescritivo(descritivo);
              produtoInterfaceRepositorio.addProduto(produto);
              return "redirect:/{descritivo}";
        }
        
        // ATUALIZA UM PRODUTO
        @ResponseBody
        @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Produto> updateProduto(@PathVariable("id") String id, @RequestBody Produto produto) {
		Produto novoproduto = produtoInterfaceRepositorio.findByID(Integer.parseInt(id));
                
                novoproduto.setDescritivo(produto.getDescritivo());
                novoproduto.setPreco(produto.getPreco());
                novoproduto.setQuantidade(produto.getQuantidade());
                novoproduto.setQuantidadeMinima(produto.getQuantidadeMinima());
                novoproduto.setFornecedorId(produto.getFornecedorId());
                
                produtoInterfaceRepositorio.updateProduto(Integer.parseInt(id),novoproduto);
		return new ResponseEntity<Produto>(novoproduto, HttpStatus.OK);
	}
        
        
        // DELETE UM PRODUTO
        @ResponseBody
        @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteProduto(@PathVariable("id") int id) {
		produtoInterfaceRepositorio.deleteProduto(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
        
        
        /*************************************************************
        **************************************************************
        **************************************************************/
        @ResponseBody
        @RequestMapping(value="/testeinsercao")
        public void testeInsercao(){
            Produto produto = new Produto("alguma", 2, 4, 3, 1,"ele la");
            produtoInterfaceRepositorio.addProduto(produto);
        }
        
    
}
