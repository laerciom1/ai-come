package br.ufrn.aicome.model.dto;

import br.ufrn.aicome.model.Address;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class AddressDTO implements Serializable {

	private Integer id;

	private Double lat;

	private Double lng;

	private String street;

	private String number;

	private String neighborhood;

	private String city;

	private String zip;

	public AddressDTO() {
	}

	public AddressDTO(Address address) {
		setId(address.getId());
		setLat(address.getLat());
		setLng(address.getLng());
		setZip(address.getZip());
		setCity(address.getCity());
		setNeighborhood(address.getNeighborhood());
		setStreet(address.getStreet());
		setNumber(address.getNumber());
	}

	public Address toAddress(){
		Address address = new Address();
		address.setId(getId());
		address.setLat(getLat());
		address.setLng(getLng());
		address.setZip(getZip());
		address.setCity(getCity());
		address.setNeighborhood(getNeighborhood());
		address.setStreet(getStreet());
		address.setNumber(getNumber());
		return address;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}
}
