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
   

   
import java.util.List;
   
@Controller
@RequestMapping("/")
public class FornecedorControlador {
    private FornecedorRepositorio FornecedorRepositorio;
   
        @Autowired
        public FornecedorControlador( FornecedorRepositorio fornecedorRepositorio) {
              this.FornecedorRepositorio = fornecedorRepositorio;
        }
   
        //RETORNA FORNECEDOR DE DETERMINADO CNPJ
        @RequestMapping(value = "/{CNPJFornecedor}", method = RequestMethod.GET)
        public String listaLivros(@PathVariable("CNPJ") String CNPJFornecedor, Model model) {
              List<Fornecedor> listaFornecedor = FornecedorRepositorio.findByCNPJFornecedor(CNPJFornecedor);
              if (listaFornecedor != null) {
                    model.addAttribute("Fonrecedores", listaFornecedor);
              }
              return "listaLivros";
        }
   
        // ADICIONA UM NOVO FORNECEDOR
        @RequestMapping(value = "/{CNPJFornecedor}", method = RequestMethod.POST)
        public String adicionaFornecedorCNPJ(@PathVariable("CNPJFornecedor") String CNPJFornecedor, Fornecedor fornecedor) {
              fornecedor.setCNPJFornecedor(CNPJFornecedor);
              FornecedorRepositorio.save(fornecedor);
              return "redirect:/{CNPJFornecedor}";
        }
}
