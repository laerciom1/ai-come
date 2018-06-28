package br.ufrn.aicome.model.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import br.ufrn.aicome.model.enums.Permission;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthDTO implements Serializable {

	private String username;
	
	private String password;
	
	private List<Permission> permissions;

	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}

	public List<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
