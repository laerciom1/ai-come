package br.ufrn.aicome.model.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class MenuDTO implements Serializable {

	private Integer storeId;

	private List<TasteDTO> tastes;

	private List<PastaDTO> pastas;

	private List<BorderDTO> borders;

	private List<SizeDTO> sizes;

	public MenuDTO() {
		this.storeId = null;
		this.tastes = new ArrayList<>();
		this.pastas = new ArrayList<>();
		this.borders = new ArrayList<>();
		this.sizes = new ArrayList<>();
	}

	public Integer getStoreId() {
		return storeId;
	}

	public void setStoreId(Integer storeId) {
		this.storeId = storeId;
	}

	public List<TasteDTO> getTastes() {
		return tastes;
	}

	public void setTastes(List<TasteDTO> tastes) {
		this.tastes = tastes;
	}

	public List<PastaDTO> getPastas() {
		return pastas;
	}

	public void setPastas(List<PastaDTO> pastas) {
		this.pastas = pastas;
	}

	public List<BorderDTO> getBorders() {
		return borders;
	}

	public void setBorders(List<BorderDTO> borders) {
		this.borders = borders;
	}

	public List<SizeDTO> getSizes() {
		return sizes;
	}

	public void setSizes(List<SizeDTO> sizes) {
		this.sizes = sizes;
	}
}
