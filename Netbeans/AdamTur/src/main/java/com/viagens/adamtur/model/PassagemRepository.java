package com.viagens.adamtur.model;

import com.viagens.adamtur.data.PassagensData;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassagemRepository extends JpaRepository<PassagensData, Integer>{
    
    List<PassagensData> findByNomeDaEmpresaContaining(String nomeDaEmpresa);
    
    List<PassagensData> findByPartidaContainingIgnoreCase(String partida);
    
    List<PassagensData> findByDestinoContainingIgnoreCase(String destino);
    
    List<PassagensData> findByDataDePartida(String dataDePartida);
    
    List<PassagensData> findByDataDeVolta(String dataDeVolta);
}
