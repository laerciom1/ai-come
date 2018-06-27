package br.ufrn.aicome.model.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;

import br.ufrn.aicome.model.Address;
import br.ufrn.aicome.model.User;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {

	private Integer id;

	private String firstName;

	private String lastName;

	private String username;

	private String password;

	private String confirmPassword;

	private List<AddressDTO> addresses;

	public UserDTO() {
		this.addresses = new ArrayList<>();
	}

	public UserDTO(User user){
		this(user, null);
	}

	public UserDTO(User user, List<Address> addresses){
		setId(user.getId());
		setFirstName(user.getFirstName());
		setLastName(user.getLastName());
		setUsername(user.getUsername());
		setPassword(null); // Do not show the user password hash
		setConfirmPassword(null); // Do not show the user password hash

		if(addresses != null){

			List<AddressDTO> addressesDto = addresses.stream().map(AddressDTO::new).collect(Collectors.toList());
			setAddresses(addressesDto);

		}

	}

	public User toUser(){
		User user = new User();
		user.setId(getId());
		user.setFirstName(getFirstName());
		user.setLastName(getLastName());
		user.setUsername(getUsername());
		user.setPassword(null);
		return user;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public List<AddressDTO> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<AddressDTO> addresses) {
		this.addresses = addresses;
	}
}
