package com.viagens.adamtur.data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="passagens")
public class PassagensData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private int id;
    @Column(name = "nome_da_empresa")
    private String nomeDaEmpresa;
    private String partida;
    private String destino;
    @Column(name = "data_de_partida")
    private String dataDePartida;
    @Column(name = "data_de_volta")
    private String dataDeVolta;
    @Column(name = "horario_de_partida")
    private String horarioDePartida;
    private String preco;
    
}
