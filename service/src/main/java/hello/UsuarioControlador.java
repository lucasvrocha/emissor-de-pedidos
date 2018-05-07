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
@RequestMapping("/usuario")
public class UsuarioControlador {
    
    @Autowired
    private UsuarioInterfaceRepositorio usuarioInterfaceRepositorio;
    
    // RETORNA UMA LISTA CONTENDO TODOS OS REGISTROS 
    @ResponseBody
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Usuario> listaUsuario() {
            return (List<Usuario>) usuarioInterfaceRepositorio.findAllUsuario();
    }
        
    // RETORNA USUARIO DE DETERMINADO ID
        @ResponseBody
        @RequestMapping(value = "/{idusuario}", method = RequestMethod.GET)
        public Usuario usuario(@PathVariable("idusuario") String idusuario) {
              Usuario usuario = usuarioInterfaceRepositorio.findByIDUsuario(Integer.parseInt(idusuario));
              
              return usuario;
        }
        
        
        // ADICIONA UM NOVO USUARIO
        @ResponseBody
        @RequestMapping( method = RequestMethod.POST)
        public String adicionaUsuarioString(@PathVariable("UsuarioNome") String UsuarioNome, Usuario usuario) {
              usuario.setUsuarioNome(UsuarioNome);
              usuarioInterfaceRepositorio.addUsuario(usuario);
              return "redirect:/{Nome}";
        }
        
        // ATUALIZA UM USUARIO
        @ResponseBody
        @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Usuario> updateArticle(@PathVariable("id") int id,@RequestBody Usuario usuario) {
            
            Usuario novousuario = usuarioInterfaceRepositorio.findByIDUsuario(id);
        
            novousuario.setNome(usuario.getNome());
            novousuario.setUsuarioNome(usuario.getUsuarioNome());
            novousuario.setSenha(usuario.getSenha());
            novousuario.setFoto(usuario.getFoto());
            novousuario.setRoles(usuario.getRoles());
                usuarioInterfaceRepositorio.updateUsuario(id,novousuario);
                
            return new ResponseEntity<Usuario>(novousuario, HttpStatus.OK);
	}
        
        // DELETE UM NOVO USUARIO
        @ResponseBody
        @RequestMapping(value = "/{IDUsuario}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteUser(@PathVariable("IDUsuario") Integer idusuario) {
		usuarioInterfaceRepositorio.deleteUsuario(idusuario);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
        
        /*************************************************************
        **************************************************************
        **************************************************************/
        
        @ResponseBody
        @RequestMapping(value = "/testeinsercao")
        public void testeInsercao(){
            
            System.out.println("\nTentando inserir\n");
            
                Usuario usuario = new Usuario("dunha","unha","1234","aaaaa","aaaaa");
                usuarioInterfaceRepositorio.addUsuario(usuario);
            
            System.out.println("\nInseriu!\n");
        }
    
}
