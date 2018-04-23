/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author 0040481422033
 */
package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

@Controller
@SpringBootApplication
public class Hello {

    @ResponseBody
    @RequestMapping("/")
    String home() {
        return "Hooooo!";
    }
    
    

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Hello.class, args);
        
    }
}