package com.viagens.adamtur.controller;

import com.viagens.adamtur.data.ClienteData;
import com.viagens.adamtur.data.SuporteData;
import com.viagens.adamtur.data.PassagensData;
import com.viagens.adamtur.service.AdamTurService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.validation.BindingResult;
import org.springframework.web.servlet.ModelAndView;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

@Controller

public class AdamTurController {
    @Autowired
    AdamTurService adamservice;
    
    @GetMapping("/")
    public String Home(Model model) {
    ClienteData clientedata = new ClienteData();
    model.addAttribute("cliente", clientedata);
    return "Home";
    }
    
    @GetMapping("/cadastro")
    public String cadastro(Model model) {
    ClienteData clientedata = new ClienteData();
    model.addAttribute("cliente", clientedata);
    return "Cadastro";
    }
    
    @PostMapping("/clientecadastrado")
    public String clientecadastro(@Valid @ModelAttribute("cliente") ClienteData clientedata) {
         adamservice.cadastrarcliente(clientedata);
         return "redirect:/tabelaclientes";    
    }
    
    @GetMapping("/tabelaclientes")
    public String Listaclientes(Model model) {
    List<ClienteData> clientedata = adamservice.ListaClientes();
    model.addAttribute("cliente", clientedata);
    return "ListaClientes";
    }
    
    @GetMapping("/atualizardados")
    public String editardados(@RequestParam("id") Integer id,Model model) {
    ClienteData clientedata = adamservice.getclienteId(id);
    model.addAttribute("cliente", clientedata);
    return "EditarDados";
    }

    @PostMapping("/editardado") 
    public String salvardado(@Valid @ModelAttribute("cliente") ClienteData clientedata, BindingResult result) { 
        
    if (result.hasErrors()) { 

         return "EditarDado";

    } 

    if (clientedata.getId()==null) { 

        adamservice.cadastrarcliente(clientedata); 

    } else { 

        adamservice.clienteupdate(clientedata.getId(), clientedata); 

    } 

    return "redirect:/tabelaclientes"; 

    }
    
   @GetMapping("/deletar/{id}") 
    public String deletarfilme(@PathVariable(value = "id") Integer id) { 
        adamservice.deletarclientes(id); 
        return "redirect:/tabelaclientes"; 
    }  
    
    @GetMapping("/tabelaviagens")
    public String ListaPassagens(
            @RequestParam(value = "origem", required = false) String origem,
            @RequestParam(value = "destino", required = false) String destino,
            @RequestParam(value = "dataIda", required = false) LocalDate dataIda, // Novo parâmetro
            @RequestParam(value = "dataVolta", required = false) LocalDate dataVolta, // Novo parâmetro
            Model model) {

        List<PassagensData> passagens;

        if (origem != null || destino != null || dataIda != null || dataVolta != null) {
            passagens = adamservice.buscarPassagens(origem, destino, dataIda, dataVolta);
        } else {
            // Caso contrário, liste todas as passagens
            passagens = adamservice.ListaPassagens();
        }

        model.addAttribute("passagem", passagens);
        return "ListaPassagens";
    }
    
    @GetMapping("/suporteadam")
    public String Suporte(Model model) {
    ClienteData clientedata = new ClienteData();
    model.addAttribute("adamdata", clientedata);
    return "Suporte";
    } 
    
    @PostMapping("/enviarmensagem")
    public String EnviarMensagem (@Valid @ModelAttribute("clientes") SuporteData suporte) 
    {
         adamservice.reportar(suporte);
         return "redirect:/suporteadam";
    } 
}
