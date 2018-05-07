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
    private FornecedorInterfaceRepositorio fornecedorInterfaceRepositorio;
    
        
        // RETORNA UMA LISTA CONTENDO TODOS OS REGISTROS 
        @ResponseBody
        @RequestMapping(value = "/all", method = RequestMethod.GET)
        public List<Fornecedor> listaFornecedor() {
              return (List<Fornecedor>) fornecedorInterfaceRepositorio.findAllFornecedor();
        }
        
        // RETORNA FORNECEDOR DE DETERMINADO ID
        @ResponseBody
        @RequestMapping(value = "/{idfornecedor}", method = RequestMethod.GET)
        public Fornecedor fornecedor(@PathVariable("idfornecedor") String idfornecedor) {
              Fornecedor fornecedor = fornecedorInterfaceRepositorio.findByIDFornecedor(Integer.parseInt(idfornecedor));
              
              return fornecedor;
        };
   
        // ADICIONA UM NOVO FORNECEDOR
        @ResponseBody
        @RequestMapping( method = RequestMethod.POST)
        public String adicionaFornecedorCNPJ(@PathVariable("CNPJFornecedor") String CNPJFornecedor, Fornecedor fornecedor) {
              fornecedor.setCNPJFornecedor(CNPJFornecedor);
              fornecedorInterfaceRepositorio.addFornecedor(fornecedor);
              return "redirect:/{CNPJFornecedor}";
        }
        
        // ATUALIZA UM FORNECEDOR
        @ResponseBody
        @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Fornecedor> updateFornecedor(@PathVariable("id") String id, @RequestBody Fornecedor fornecedor) {
		Fornecedor novofornecedor = fornecedorInterfaceRepositorio.findByIDFornecedor(Integer.parseInt(id));
                
                novofornecedor.setCNPJFornecedor(fornecedor.getCNPJFornecedor());
                novofornecedor.setEmail(fornecedor.getEmail());
                novofornecedor.setFantasia(fornecedor.getFantasia());
                novofornecedor.setIE(fornecedor.getIE());
                novofornecedor.setRazaoSocial(fornecedor.getRazaoSocial());
                
                fornecedorInterfaceRepositorio.updateFornecedor(Integer.parseInt(id),novofornecedor);
		return new ResponseEntity<Fornecedor>(novofornecedor, HttpStatus.OK);
	}
        
        // DELETE UM NOVO FORNECEDOR
        @ResponseBody
        @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteArticle(@PathVariable("id") String idfornecedor) {
		fornecedorInterfaceRepositorio.deleteFornecedor(Long.parseLong(idfornecedor));
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
        
        
        /*************************************************************
        **************************************************************
        **************************************************************/
        @ResponseBody
        @RequestMapping(value="/testeinsercao")
        public void testeInsercao(){
            Fornecedor fornecedor = new Fornecedor("1231132123123","111111111111111110000","razao","fantasia","email@email.com");
            fornecedorInterfaceRepositorio.addFornecedor(fornecedor);
        }
}
