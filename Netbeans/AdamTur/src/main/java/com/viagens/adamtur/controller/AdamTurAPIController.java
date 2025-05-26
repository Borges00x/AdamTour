package com.viagens.adamtur.controller;

import com.viagens.adamtur.data.ClienteData;
import com.viagens.adamtur.data.SuporteData;
import com.viagens.adamtur.data.PassagensData;
import com.viagens.adamtur.service.AdamTurService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import jakarta.servlet.http.Cookie;
import com.viagens.adamtur.model.ClienteRepository;

@RestController
@RequestMapping("/cliente")
public class AdamTurAPIController {

    @Autowired
    AdamTurService adamservice;

    @GetMapping("/Listacliente")
    public ResponseEntity<List> getcliente() {
        List<ClienteData> filme = adamservice.ListaClientes();
        return new ResponseEntity<>(filme, HttpStatus.OK);
    }

    @GetMapping("/Listapassagens")
    public ResponseEntity<List> getpassagens() {
        List<PassagensData> passagem = adamservice.ListaPassagens();
        return new ResponseEntity<>(passagem, HttpStatus.OK);
    }

    @PostMapping("/adicionarcliente")
    public ResponseEntity<ClienteData> adicionarcliente(@Valid @RequestBody ClienteData cliente) {
        var clienteadd = adamservice.cadastrarcliente(cliente);
        return new ResponseEntity<>(clienteadd, HttpStatus.CREATED);
    }

    @PutMapping("/editarcliente/{id}")
    public ResponseEntity<ClienteData> atualizarcliente(
            @PathVariable Integer id,
            @Valid @RequestBody ClienteData cliente) {

        ClienteData atualizado = adamservice.clienteupdate(id, cliente);

        if (atualizado != null) {
            return new ResponseEntity<>(atualizado, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deletarcliente/{id}")
    public ResponseEntity deletarcliente(@PathVariable Integer id) {
        adamservice.deletarclientes(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/suporte")
    public ResponseEntity<SuporteData> enviarmensagem(@Valid @RequestBody SuporteData suporte) {
        var mensagemadd = adamservice.reportar(suporte);
        return new ResponseEntity<>(mensagemadd, HttpStatus.CREATED);
    }
}