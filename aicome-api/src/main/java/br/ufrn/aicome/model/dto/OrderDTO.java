package br.ufrn.aicome.model.dto;

import java.io.Serializable;

public class OrderDTO implements Serializable {

	private Integer storeId;

	private String username;

	private String comments;

	public Integer getStoreId() {
		return storeId;
	}

	public void setStoreId(Integer storeId) {
		this.storeId = storeId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}
}
