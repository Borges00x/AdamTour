package com.viagens.adamtur.model;

import com.viagens.adamtur.data.ClienteData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteData, Integer> {
    
    List<ClienteData> findByNomeContaining(String nome);

}
