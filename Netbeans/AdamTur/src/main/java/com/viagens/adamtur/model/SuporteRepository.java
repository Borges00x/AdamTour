package com.viagens.adamtur.model;

import com.viagens.adamtur.data.SuporteData;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SuporteRepository extends JpaRepository<SuporteData, Integer>{

    List<SuporteData> findByMensagemContaining(String mensagem);
    
}
