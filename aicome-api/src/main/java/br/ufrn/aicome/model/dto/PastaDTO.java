package br.ufrn.aicome.model.dto;

import br.ufrn.aicome.model.Pasta;

import java.io.Serializable;

public class PastaDTO implements Serializable {

	private Integer id;

	private String name;

	private Double value;

	public PastaDTO() {
	}

	public PastaDTO(Pasta pasta) {
		setId(pasta.getId());
		setName(pasta.getName());
		setValue(pasta.getValue());
	}

	public Pasta toPasta(){
		Pasta pasta = new Pasta();
		pasta.setId(getId());
		pasta.setName(getName());
		pasta.setValue(getValue());
		return pasta;
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
