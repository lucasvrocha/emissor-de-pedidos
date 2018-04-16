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
@RequestMapping("/fornecedor")
public class FornecedorControlador {
    @Autowired
    private FornecedorInterfaceRepositorio FornecedorRepositorio;
    
        /*public FornecedorControlador( FornecedorInterfaceRepositorio fornecedorRepositorio) {
              this.FornecedorRepositorio = fornecedorRepositorio;
        }
   */
        // RETORNA UMA LISTA CONTENDO TODOS OS REGISTROS 
        @ResponseBody
        @RequestMapping(value = "/all", method = RequestMethod.GET)
        public List<Fornecedor> listaFornecedor() {
              return (List<Fornecedor>) FornecedorRepositorio.findAllFornecedor();
        }
        
        // RETORNA FORNECEDOR DE DETERMINADO CNPJ
        @ResponseBody
        @RequestMapping(value = "/{id}", method = RequestMethod.GET)
        public Fornecedor fornecedor(@PathVariable("id") String id) {
              Fornecedor fornecedor = FornecedorRepositorio.findByIDFornecedor(Integer.parseInt(id));
              
              return fornecedor;
        };
   
        // ADICIONA UM NOVO FORNECEDOR
        @ResponseBody
        @RequestMapping( method = RequestMethod.POST)
        public String adicionaFornecedorCNPJ(@PathVariable("CNPJFornecedor") String CNPJFornecedor, Fornecedor fornecedor) {
              fornecedor.setCNPJFornecedor(CNPJFornecedor);
              FornecedorRepositorio.addFornecedor(fornecedor);
              return "redirect:/{CNPJFornecedor}";
        }
        
        // ATUALIZA UM FORNECEDOR
        @ResponseBody
        @RequestMapping(value = "/{CNPJFornecedor}", method = RequestMethod.PUT)
	public ResponseEntity<Fornecedor> updateArticle(@RequestBody Fornecedor fornecedor) {
		FornecedorRepositorio.updateFornecedor(fornecedor);
		return new ResponseEntity<Fornecedor>(fornecedor, HttpStatus.OK);
	}
        
        // DELETE UM NOVO FORNECEDOR
        @ResponseBody
        @RequestMapping(value = "/{CNPJFornecedor}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteArticle(@PathVariable("IDFornecedor") Integer idfornecedor) {
		FornecedorRepositorio.deleteFornecedor(idfornecedor);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
    
        /*@ResponseBody
        @RequestMapping(value = "/all", method = RequestMethod.GET)
        public String listaFornecedor() {
              return "Foi";
        }*/
    
}
