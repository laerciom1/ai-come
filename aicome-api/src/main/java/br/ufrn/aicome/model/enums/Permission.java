package br.ufrn.aicome.model.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Permission implements GrantedAuthority{
	ADMIN,USER;

	@Override
	public String getAuthority() {
		// TODO Auto-generated method stub
		return this.role();
	}
	
	public String role() {
		return "ROLE_"+this.toString();
	}
}
