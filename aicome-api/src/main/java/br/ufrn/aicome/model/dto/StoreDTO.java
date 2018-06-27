package br.ufrn.aicome.model.dto;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModelProperty;

import br.ufrn.aicome.model.Address;
import br.ufrn.aicome.model.Store;
import br.ufrn.aicome.model.User;

@JsonInclude(JsonInclude.Include.NON_NULL)
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

	@ApiModelProperty(notes = "The store addresses")
	private List<AddressDTO> addresses;

	@ApiModelProperty(notes = "The store menu")
	private MenuDTO menu;

	public StoreDTO() {
	}

	public StoreDTO(Store store){
		this(store, null);
	}

	public StoreDTO(Store store, List<Address> addresses) {
		setId(store.getId());
		setName(store.getName());
		setBio(store.getBio());
		setProfileImage(store.getProfileImage());
		setThumbnailImage(store.getThumbnailImage());

		User user = store.getUser();

		if(user != null && addresses != null){

			List<AddressDTO> addressesDto = addresses.stream().map(AddressDTO::new).collect(Collectors.toList());
			setAddresses(addressesDto);

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

	public List<AddressDTO> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<AddressDTO> addresses) {
		this.addresses = addresses;
	}

	public MenuDTO getMenu() {
		return menu;
	}

	public void setMenu(MenuDTO menu) {
		this.menu = menu;
	}
}
