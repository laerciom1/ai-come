package br.ufrn.aicome.model.dto;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

import br.ufrn.aicome.model.Order;
import br.ufrn.aicome.model.OrderItem;
import br.ufrn.aicome.model.Store;
import br.ufrn.aicome.model.User;

public class OrderDTO implements Serializable {

	private List<OrderItemDTO> itens;

	private Double deliveryCost;

	private String estimatedTime;

	private Double subTotal;

	private Double total;

	public OrderDTO(){

	}

	public OrderDTO(Order order){
		this(order, null);
	}

	public OrderDTO(Order order, List<OrderItem> orderItens){
		if(orderItens != null){
			List<OrderItemDTO> orderItensDto = orderItens.stream().map(OrderItemDTO::new).collect(Collectors.toList());
			setItens(orderItensDto);
		}

		setDeliveryCost(order.getDeliveryCost());
		setEstimatedTime(order.getEstimatedTime());
		setSubTotal(order.getSubTotal());
		setTotal(order.getTotal());
	}

	public Order toOrder(Store store, User user){
		return toOrder(store, user, null);
	}

	public Order toOrder(Store store, User user, List<OrderItem> itens){
		Order order = new Order();
		order.setStore(store);
		order.setUser(user);
		if(itens != null) {
			order.setItens(itens);
		}
		order.setDeliveryCost(getDeliveryCost());
		order.setEstimatedTime(getEstimatedTime());
		order.setSubTotal(getSubTotal());
		order.setTotal(getTotal());
		return order;
	}

	public List<OrderItemDTO> getItens() {
		return itens;
	}

	public void setItens(List<OrderItemDTO> itens) {
		this.itens = itens;
	}

	public Double getDeliveryCost() {
		return deliveryCost;
	}

	public void setDeliveryCost(Double deliveryCost) {
		this.deliveryCost = deliveryCost;
	}

	public String getEstimatedTime() {
		return estimatedTime;
	}

	public void setEstimatedTime(String estimatedTime) {
		this.estimatedTime = estimatedTime;
	}

	public Double getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(Double subTotal) {
		this.subTotal = subTotal;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}
}
