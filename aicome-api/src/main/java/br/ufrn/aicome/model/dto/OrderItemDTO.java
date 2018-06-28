package br.ufrn.aicome.model.dto;

import br.ufrn.aicome.model.OrderItem;

public class OrderItemDTO {

	private String title;

	private SizeDTO size;

	private TasteDTO taste;

	private BorderDTO border;

	private PastaDTO pasta;

	private Double totalValue;

	public OrderItemDTO() {
	}

	public OrderItemDTO(OrderItem orderItem) {
		setTitle(orderItem.getTitle());
		setSize(new SizeDTO(orderItem.getSize()));
		setTaste(new TasteDTO(orderItem.getTaste()));
		setBorder(new BorderDTO(orderItem.getBorder()));
		setPasta(new PastaDTO(orderItem.getPasta()));
		setTotalValue(orderItem.getTotalValue());
	}

	public OrderItem toOrderItem(){
		OrderItem orderItem = new OrderItem();
		orderItem.setTitle(getTitle());
		orderItem.setSize(getSize().toSize());
		orderItem.setTaste(getTaste().toTaste());
		orderItem.setBorder(getBorder().toBorder());
		orderItem.setPasta(getPasta().toPasta());
		orderItem.setTotalValue(getTotalValue());
		return orderItem;
	}


	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public SizeDTO getSize() {
		return size;
	}

	public void setSize(SizeDTO size) {
		this.size = size;
	}

	public TasteDTO getTaste() {
		return taste;
	}

	public void setTaste(TasteDTO taste) {
		this.taste = taste;
	}

	public BorderDTO getBorder() {
		return border;
	}

	public void setBorder(BorderDTO border) {
		this.border = border;
	}

	public PastaDTO getPasta() {
		return pasta;
	}

	public void setPasta(PastaDTO pasta) {
		this.pasta = pasta;
	}

	public Double getTotalValue() {
		return totalValue;
	}

	public void setTotalValue(Double totalValue) {
		this.totalValue = totalValue;
	}
}
