package br.ufrn.aicome.model.dto;

import br.ufrn.aicome.model.Address;
import br.ufrn.aicome.model.Store;

import java.io.Serializable;

public class StoreDTO implements Serializable {

	private Integer id;

	private String name;

	private String bio;

	private String image;

	private AddressDTO address;

	private MenuDTO menu;

	public StoreDTO() {
	}

	public StoreDTO(Store store) {
		setId(store.getId());
		setName(store.getName());
		setBio(store.getBio());
		setImage(store.getImage());

		Address address = store.getAddress();

		if(address != null){
			AddressDTO addressDto = new AddressDTO(address);
			setAddress(addressDto);
		}

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

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public AddressDTO getAddress() {
		return address;
	}

	public void setAddress(AddressDTO address) {
		this.address = address;
	}

	public MenuDTO getMenu() {
		return menu;
	}

	public void setMenu(MenuDTO menu) {
		this.menu = menu;
	}
}
