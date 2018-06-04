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
@RequestMapping("/authenticate")
public class authenticateControlador {
    
    @Autowired
    private authenticateInterfaceRepositorio authenInterface;
    
    // RETORNA UMA LISTA CONTENDO TODOS OS REGISTROS 
    @ResponseBody
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<authenticate> listaAuthenticate() {
            return (List<authenticate>) authenInterface.findAllAuthenticate();
    }
        
    // RETORNA USUARIO DE DETERMINADO ID
        @ResponseBody
        @RequestMapping(value = "/{id}", method = RequestMethod.GET)
        public authenticate authen(@PathVariable("id") String id) {
              authenticate aut = authenInterface.FindById(Integer.parseInt(id));
              
              return aut;
        }
        
        
        // ADICIONA UM NOVO
        @ResponseBody
        @RequestMapping( method = RequestMethod.POST)
        public String adicionaAuthenticate(@PathVariable("usuario") String usuario, authenticate aut) {
              aut.setUsuario(usuario);
              authenInterface.addAuthenticate(aut);
              return "redirect:/{usuario}";
        }
        
        // ATUALIZA
        @ResponseBody
        @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<authenticate> update(@PathVariable("id") int id,@RequestBody authenticate authen) {
            authenticate newauthenticate = authenInterface.FindById(id);
        
            newauthenticate.setNome(authen.getNome());
            newauthenticate.setUsuario(authen.getUsuario());
            newauthenticate.setSenha(authen.getSenha());
            newauthenticate.setFoto(authen.getFoto());
            newauthenticate.setRoles(authen.getRoles());
            newauthenticate.setAdmin(authen.getAdmin());
            newauthenticate.setSeller(authen.getSeller());
            newauthenticate.setEmail(authen.getEmail());
            newauthenticate.setJwt(authen.getJwt());
                
            return new ResponseEntity<authenticate>(newauthenticate, HttpStatus.OK);
	}
        
        // DELETE
        @ResponseBody
        @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
		authenInterface.deleteAuthenticate(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
        
        
        
        /*************************************************************
        **************************************************************
        **************************************************************/
        @ResponseBody
        @RequestMapping(value="/testeinsercao")
        public void testeInsercao(){
            authenticate autTeste = new authenticate("aaa", "aaa", "aaas116", "uiui", true, true, "akela la", "ooooo", "iiiii");
            authenInterface.addAuthenticate(autTeste);
        }
    
}
