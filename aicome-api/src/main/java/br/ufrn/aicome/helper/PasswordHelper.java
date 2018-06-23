package br.ufrn.aicome.helper;


import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Componente para criptografar a senha
 * @author Lucio Oliveira
 */


@Component
public class PasswordHelper implements PasswordEncoder {


	/**
	 * 
	 */
	@Override
    public String encode(CharSequence rawPassword) {
 
        String hashed = BCrypt.hashpw(rawPassword.toString(), BCrypt.gensalt(12));
 
        return hashed;
    }

	
 
    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
 
        return BCrypt.checkpw(rawPassword.toString(), encodedPassword);
    }

	/**
	 * Método para gerar senha aleatória
	 * @return A senha aleatória
	 */
	public static String gerarSenhaAleatoria(){
		int i1 = (int) (Math.random()*10);
		int i2 = (int) (Math.random()*10);
		int i3 = (int) (Math.random()*10);
		int i4 = (int) (Math.random()*10);
		int i5 = (int) (Math.random()*10);
		int i6 = (int) (Math.random()*10);
		
		return ""+ i1+ i2 + i3 + i4+ i5+ i6;
	}
	
}
