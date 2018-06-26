package br.ufrn.aicome.model.dto;

import br.ufrn.aicome.model.Address;
import br.ufrn.aicome.model.Store;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

public class StoreDTO implements Serializable {

	@ApiModelProperty(notes = "The database generated ID")
	private Integer id;

	@ApiModelProperty(notes = "The store name")
	private String name;

	@ApiModelProperty(notes = "The store biography")
	private String bio;

	@ApiModelProperty(notes = "The store image URL")
	private String thumbnailImage;

	@ApiModelProperty(notes = "The store profile image URL")
	private String profileImage;

	@ApiModelProperty(notes = "The store address")
	private AddressDTO address;

	@ApiModelProperty(notes = "The store menu")
	private MenuDTO menu;

	public StoreDTO() {
	}

	public StoreDTO(Store store) {
		setId(store.getId());
		setName(store.getName());
		setBio(store.getBio());
		setProfileImage(store.getProfileImage());
		setThumbnailImage(store.getThumbnailImage());

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

	public String getThumbnailImage() {
		return thumbnailImage;
	}

	public void setThumbnailImage(String thumbnailImage) {
		this.thumbnailImage = thumbnailImage;
	}

	public String getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
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
