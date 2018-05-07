/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hello.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author 0040481422033
 */
@Controller
@EnableAutoConfiguration
public class testedeUsuario {

    @ResponseBody
    @RequestMapping("usuarios")
    public String usuario() {
        return "funcionou porra!";
    }

}
