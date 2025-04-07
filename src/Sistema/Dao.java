
package Sistema;

import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.swing.JOptionPane;


public class Dao {
    
    ResultSet rs;
    Conectar conexao;
    Connection conn;
    
    public Dao () 
    {
        this.conexao = new Conectar();
        this.conn = this.conexao.Conexao();
    }
    
    public int Inserir (Cadastro cada) 
    {
        PreparedStatement ps;
        int status;
        
        try 
        {
            ps = conn.prepareStatement("Insert into cadastro (nome, cpf, rg, telefone, email, estado, cidade, bairro, rua, cep) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");
            ps.setString(1, cada.getNome());
            ps.setString(2, cada.getCpf());
            ps.setString(3, cada.getRg());
            ps.setString(4, cada.getTelefone());
            ps.setString(5, cada.getEmail());
            ps.setString(6, cada.getEstado());
            ps.setString(7, cada.getCidade());
            ps.setString(8, cada.getBairro());
            ps.setString(9,cada.getRua());
            ps.setString(10, cada.getCep());
            status = ps.executeUpdate();
            
            JOptionPane.showMessageDialog(null, "Passagem comprada com sucesso!");
            
            return status;
            
        } catch (SQLException ex) 
        
            {
                JOptionPane.showMessageDialog(null, "Erro ao inserir dados: ");
                return ex.getErrorCode();
            }
    }
    
    public void Excluir (String cpf) 
    {
        PreparedStatement ps;
     
        
        try 
        {
            ps = this.conn.prepareStatement("Delete from cadastro where cpf = ?");
            ps.setString(1, cpf);
            ps.execute();
        } catch (SQLException ex) 
        
            {
                JOptionPane.showMessageDialog(null, "Erro ao excluir os dados: ");
            }
    }
    
    public int Editar (Cadastro cada) 
    {
        PreparedStatement ps;
        int status;
        
        try 
        {
            ps = conn.prepareStatement
        ("update cadastro set nome = ?, rg = ?, telefone = ?, email = ?, estado = ?, cidade = ?, bairro = ?, rua = ?, cep = ? Where cpf = ? ;");
            ps.setString(1, cada.getNome());
            ps.setString(2, cada.getRg());
            ps.setString(3, cada.getTelefone());
            ps.setString(4, cada.getEmail());
            ps.setString(5, cada.getEstado());
            ps.setString(6, cada.getCidade());
            ps.setString(7, cada.getBairro());
            ps.setString(8,cada.getRua());
            ps.setString(9, cada.getCep());
            ps.setString(10, cada.getCpf());
            status = ps.executeUpdate();
            return status;
        } catch (SQLException ex) 
        
            {
                JOptionPane.showMessageDialog(null, "Erro ao editar dados! ");
                return ex.getErrorCode();
            }
    }
    
    public void Suporte (Mensagem msm) 
    {
        PreparedStatement ps;
        int status;
        
        try 
        {
            ps = conn.prepareStatement("insert into suporte (mensagem) values (?);");
            ps.setString(1, msm.getMensagem());
            status = ps.executeUpdate();
        } catch (SQLException ex) 
        
            {
                JOptionPane.showMessageDialog(null, "Erro ao enviar mensagem! ");
            }
    }
    
    public List<Cadastro> getCadastro (String pesquisa) 
    {
      PreparedStatement ps; 
             
             String comando = "select * from cadastro Where cpf LiKE ?";
             
             try 
             {
             
             ps = this.conn.prepareStatement(comando);
             
             ps.setString(1, "%" + pesquisa + "%");
             
             ResultSet rs = ps.executeQuery();
             
             List<Cadastro> listaclientes = new ArrayList<>();
             
               while (rs.next()) 
               {
                   Cadastro cada = new Cadastro();
        
                   cada.setNome(rs.getString("nome"));
                   cada.setCpf(rs.getString("cpf"));
                   cada.setRg(rs.getString("rg"));
                   cada.setTelefone(rs.getString("telefone"));
                   cada.setEmail(rs.getString("email"));
                   cada.setEstado(rs.getString("estado"));
                   cada.setCidade(rs.getString("cidade"));
                   cada.setBairro(rs.getString("bairro"));
                   cada.setRua(rs.getString("rua"));
                   cada.setCep(rs.getString("cep"));
        
            listaclientes.add(cada);
         }  
                 
                return listaclientes;
               
             } catch (SQLException error)
                {
                    JOptionPane.showMessageDialog(null, error.getMessage());
                    
                    return null;
                }
         }
    
   public List<Passagens> getViagens(String Partida, String Destino) 
    {
      PreparedStatement ps; 
             
             String comando = "select * from passagens Where partida LIKE ? and destino LIKE ?;";
             
             try 
             {
             
             ps = this.conn.prepareStatement(comando);
             
             ps.setString(1, "%" + Partida + "%");
             ps.setString(2, "%" + Destino + "%");
             
             ResultSet rs = ps.executeQuery();
             
             List<Passagens> listapassagens = new ArrayList<>();
             
               while (rs.next()) 
               {
                   Passagens pass = new Passagens();
        
                   pass.setNome_da_empresa(rs.getString("nome_da_empresa"));
                   pass.setPartida(rs.getString("partida"));
                   pass.setDestino(rs.getString("destino"));
                   pass.setData_de_partida(rs.getString("data_de_partida"));
                   pass.setHorario_de_partida(rs.getString("horario_de_partida"));
                   pass.setPreco(rs.getString("preco"));
        
            listapassagens.add(pass);
         }  
                 
                return listapassagens;
               
             } catch (SQLException error)
                {
                    JOptionPane.showMessageDialog(null, error.getMessage());
                    
                    return null;
                }
             
             
    }
   
    
}
