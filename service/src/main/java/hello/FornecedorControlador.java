package hello;

  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.stereotype.Controller;
  import org.springframework.ui.Model;
  import org.springframework.web.bind.annotation.PathVariable;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RequestMethod;
   

   
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
   
@Controller
@RequestMapping("/fornecedor")
public class FornecedorControlador {
    private FornecedorInterfaceRepositorio FornecedorRepositorio;
    
        @Autowired
        public FornecedorControlador( FornecedorInterfaceRepositorio fornecedorRepositorio) {
              this.FornecedorRepositorio = fornecedorRepositorio;
        }
   
        // RETORNA UMA LISTA CONTENDO TODOS OS REGISTROS 
        @RequestMapping(value = "/all", method = RequestMethod.GET)
        public List<Fornecedor> listaFornecedor() {
              return (List<Fornecedor>) FornecedorRepositorio.findAllFornecedor();
        }
        
        // RETORNA FORNECEDOR DE DETERMINADO CNPJ
//        @RequestMapping(value = "/{CNPJFornecedor}", method = RequestMethod.GET)
//        public String listaFornecedor(@PathVariable("CNPJ") String CNPJFornecedor, Model model) {
//              List<Fornecedor> listaFornecedor = FornecedorRepositorio.findByCNPJFornecedor(CNPJFornecedor);
//              if (listaFornecedor != null) {
//                    model.addAttribute("Fornecedores", listaFornecedor);
//              }
//              return "listaLivros";
//        };
   
        // ADICIONA UM NOVO FORNECEDOR
        @RequestMapping(value = "/{CNPJFornecedor}", method = RequestMethod.POST)
        public String adicionaFornecedorCNPJ(@PathVariable("CNPJFornecedor") String CNPJFornecedor, Fornecedor fornecedor) {
              fornecedor.setCNPJFornecedor(CNPJFornecedor);
              FornecedorRepositorio.addFornecedor(fornecedor);
              return "redirect:/{CNPJFornecedor}";
        }
        
        // ATUALIZA UM FORNECEDOR
        @RequestMapping(value = "/{CNPJFornecedor}", method = RequestMethod.PUT)
	public ResponseEntity<Fornecedor> updateArticle(@RequestBody Fornecedor fornecedor) {
		FornecedorRepositorio.updateFornecedor(fornecedor);
		return new ResponseEntity<Fornecedor>(fornecedor, HttpStatus.OK);
	}
        
        // DELETE UM NOVO FORNECEDOR
        @RequestMapping(value = "/{CNPJFornecedor}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteArticle(@PathVariable("IDFornecedor") Integer idfornecedor) {
		FornecedorRepositorio.deleteFornecedor(idfornecedor);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}	
}
