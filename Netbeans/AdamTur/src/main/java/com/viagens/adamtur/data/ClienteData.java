package com.viagens.adamtur.data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="cadastro")
public class ClienteData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private Integer id;
    private String nome;
    private String cpf;
    private String rg;
    private String telefone;
    private String email;
    private String estado;
    private String cidade;
    private String bairro;
    private String rua;
    private String cep;
}
