package br.ufrn.aicome.model.dto;

import br.ufrn.aicome.model.Taste;

import java.io.Serializable;

public class TasteDTO implements Serializable {

	private Integer id;

	private String name;

	private String description;

	private Double sValue;

	private Double mValue;

	private Double lValue;

	private Double xlValue;

	public TasteDTO() {
	}

	public TasteDTO(Taste taste) {
		setId(taste.getId());
		setName(taste.getName());
		setDescription(taste.getDescription());
		setsValue(taste.getsValue());
		setmValue(taste.getmValue());
		setlValue(taste.getlValue());
		setXlValue(taste.getXlValue());
	}

	public Taste toTaste(){
		Taste taste = new Taste();
		taste.setId(getId());
		taste.setName(getName());
		taste.setDescription(getDescription());
		taste.setsValue(getsValue());
		taste.setmValue(getmValue());
		taste.setlValue(getlValue());
		taste.setXlValue(getXlValue());
		return taste;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getsValue() {
		return sValue;
	}

	public void setsValue(Double sValue) {
		this.sValue = sValue;
	}

	public Double getmValue() {
		return mValue;
	}

	public void setmValue(Double mValue) {
		this.mValue = mValue;
	}

	public Double getlValue() {
		return lValue;
	}

	public void setlValue(Double lValue) {
		this.lValue = lValue;
	}

	public Double getXlValue() {
		return xlValue;
	}

	public void setXlValue(Double xlValue) {
		this.xlValue = xlValue;
	}
}
