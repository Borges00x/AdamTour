/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Sistema;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import javax.swing.JOptionPane;


public class Conectar {
    
    Connection conn;
    
    public Connection Conexao() 
    {
             
           try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/adamtur ", "Alessandro", "12345");
            return conn;
           } catch(ClassNotFoundException | SQLException ex) 
           {
               JOptionPane.showMessageDialog(null, "Ocorreu um erro : "+ ex.getMessage());
               System.out.println("Ocorreu um erro : "+ ex.getMessage());
               return null;
           }
        }
    
            public void Desconectar() 
        {
            try {
            conn.close();
            } catch (SQLException ex) 
                {
                
                }
        }    
    } 
    

