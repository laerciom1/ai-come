package br.ufrn.aicome.model.dto;

import br.ufrn.aicome.model.Border;

import java.io.Serializable;

public class BorderDTO implements Serializable {

	private Integer id;

	private String name;

	private Double value;

	public BorderDTO() {
	}

	public BorderDTO(Border border) {
		setId(border.getId());
		setName(border.getName());
		setValue(border.getValue());
	}

	public Border toBorder(){
		Border border = new Border();
		border.setId(getId());
		border.setName(getName());
		border.setValue(getValue());
		return border;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}
}
