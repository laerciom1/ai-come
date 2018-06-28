package br.ufrn.aicome.model.dto;

import br.ufrn.aicome.model.Order;

import java.io.Serializable;

public class OrderDTO implements Serializable {

	private Long storeId;

	private String username;

	private String comments;

	public OrderDTO(){

	}

	public OrderDTO(Order order){
		setStoreId(order.getStoreId());
		setUsername(order.getUsername());
		setComments(order.getComments());
	}

	public Order toOrder(){
		Order order = new Order();
		order.setStoreId(getStoreId());
		order.setUsername(getUsername());
		order.setComments(getComments());
		return order;
	}

	public Long getStoreId() {
		return storeId;
	}

	public void setStoreId(Long storeId) {
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
