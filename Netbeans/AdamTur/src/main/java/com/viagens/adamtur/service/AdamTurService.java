package com.viagens.adamtur.service;

import com.viagens.adamtur.data.ClienteData;
import com.viagens.adamtur.data.SuporteData;
import com.viagens.adamtur.data.PassagensData;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.viagens.adamtur.model.ClienteRepository;
import com.viagens.adamtur.model.SuporteRepository;
import com.viagens.adamtur.model.PassagemRepository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.stream.Collectors;

@Service
public class AdamTurService {

    @Autowired
    ClienteRepository clienterepository;
    @Autowired
    SuporteRepository suporterepository;
    @Autowired
    PassagemRepository passagemrepository;

    public ClienteData cadastrarcliente(ClienteData clientedata) {
        clienterepository.save(clientedata);
        return clientedata;
    }
    
    private static final DateTimeFormatter DATE_DB_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private static final int MARGEM_DIAS_APROXIMADOS = 12;    

    public List<PassagensData> buscarPassagens(String origem, String destino, LocalDate dataIda, LocalDate dataVolta) {
        
        List<PassagensData> passagensFiltradas = passagemrepository.findAll();
        
        if (origem != null && !origem.isEmpty()) {
           passagensFiltradas = passagensFiltradas.stream()
           .filter(p -> p.getPartida().toLowerCase().contains(origem.toLowerCase()))
            .collect(Collectors.toList());
        }
        
        if (destino != null && !destino.isEmpty()) {
            passagensFiltradas = passagensFiltradas.stream()
            .filter(p -> p.getDestino().toLowerCase().contains(destino.toLowerCase()))
            .collect(Collectors.toList());
        }        

        
        if (dataIda != null) {
            LocalDate dataIdaMin = dataIda.minusDays(MARGEM_DIAS_APROXIMADOS);
            LocalDate dataIdaMax = dataIda.plusDays(MARGEM_DIAS_APROXIMADOS);

            passagensFiltradas = passagensFiltradas.stream()
                .filter(p -> {
                    try {
                        if (p.getDataDePartida() == null || p.getDataDePartida().isEmpty()) {
                            return false;
                        }
                        LocalDate dataPassagemDB = LocalDate.parse(p.getDataDePartida(), DATE_DB_FORMATTER);

                        return !dataPassagemDB.isBefore(dataIdaMin) && !dataPassagemDB.isAfter(dataIdaMax);

                    } catch (DateTimeParseException e) {
                        System.err.println("Erro ao converter 'dataDePartida' de '" + p.getDataDePartida() + "': " + e.getMessage());
                        return false;
                    }
                })
                .collect(Collectors.toList());
        }

        if (dataVolta != null) {
            LocalDate dataVoltaMin = dataVolta.minusDays(MARGEM_DIAS_APROXIMADOS);
            LocalDate dataVoltaMax = dataVolta.plusDays(MARGEM_DIAS_APROXIMADOS);

            passagensFiltradas = passagensFiltradas.stream()
                .filter(p -> {
                    try {
                        if (p.getDataDeVolta() == null || p.getDataDeVolta().isEmpty()) {
                            return false;
                        }
                        LocalDate dataVoltaPassagemDB = LocalDate.parse(p.getDataDeVolta(), DATE_DB_FORMATTER);

                        return !dataVoltaPassagemDB.isBefore(dataVoltaMin) && !dataVoltaPassagemDB.isAfter(dataVoltaMax);

                    } catch (DateTimeParseException e) {
                        System.err.println("Erro ao converter 'dataDeVolta' de '" + p.getDataDeVolta() + "': " + e.getMessage());
                        return false;
                    }
                })
                .collect(Collectors.toList());
        }

        return passagensFiltradas;
    }

    public SuporteData reportar(SuporteData suporte) {
        suporterepository.save(suporte);
        return suporte;
    }

    public List<ClienteData> ListaClientes() {
        List<ClienteData> listaclientes = clienterepository.findAll();
        return listaclientes;
    }

    public List<PassagensData> ListaPassagens() {
        List<PassagensData> listapassagens = passagemrepository.findAll();
        return listapassagens;
    }

    public ClienteData getclienteId(int clienteId) {
        return clienterepository.findById(clienteId).orElse(null);
    }

    public ClienteData clienteupdate(int clienteId, ClienteData update) {
        ClienteData clientedata = getclienteId(clienteId);

        clientedata.setNome(update.getNome());
        clientedata.setCpf(update.getCpf());
        clientedata.setRg(update.getRg());
        clientedata.setTelefone(update.getTelefone());
        clientedata.setEmail(update.getEmail());
        clientedata.setEstado(update.getEstado());
        clientedata.setBairro(update.getBairro());
        clientedata.setCidade(update.getCidade());
        clientedata.setRua(update.getRua());
        clientedata.setCep(update.getCep());
        clienterepository.save(clientedata);
        return clientedata;
    }

    public void deletarclientes(Integer id) {
        ClienteData clientedata = getclienteId(id);
        clienterepository.deleteById(clientedata.getId());
    }
}