package br.ufrn.aicome.model.dto;

import java.io.Serializable;

public class OrderReceiptDTO implements Serializable {

	private OrderDTO order;

	private Long confirmationId;

	private Long estimatedTime;

	public OrderDTO getOrder() {
		return order;
	}

	public void setOrder(OrderDTO order) {
		this.order = order;
	}

	public Long getConfirmationId() {
		return confirmationId;
	}

	public void setConfirmationId(Long confirmationId) {
		this.confirmationId = confirmationId;
	}

	public Long getEstimatedTime() {
		return estimatedTime;
	}

	public void setEstimatedTime(Long estimatedTime) {
		this.estimatedTime = estimatedTime;
	}
}
