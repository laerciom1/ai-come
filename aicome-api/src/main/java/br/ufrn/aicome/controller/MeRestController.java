package br.ufrn.aicome.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufrn.aicome.model.Address;
import br.ufrn.aicome.model.Order;
import br.ufrn.aicome.model.User;
import br.ufrn.aicome.model.dto.AddressDTO;
import br.ufrn.aicome.model.dto.OrderDTO;
import br.ufrn.aicome.model.dto.UserDTO;
import br.ufrn.aicome.repository.AddressRepository;
import br.ufrn.aicome.repository.OrderRepository;
import br.ufrn.aicome.repository.UserRepository;

@RestController
@RequestMapping("/me")
@Api(tags="Me", value="me", description="Operations pertaining to the current authenticated user", authorizations=@Authorization("oauth2"))
public class MeRestController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private OrderRepository orderRepository;

	@GetMapping("")
	@ApiOperation(value = "Fetch the current user ", response = UserDTO.class, responseContainer="List", authorizations=@Authorization("oauth2"))
	public UserDTO getMe(Principal principal){
		User user = userRepository.findByUsername(principal.getName()).orElse(new User());
		return new UserDTO(user);
	}


	/**
	 * Returns the user addresses.
	 * @return list of addresses.
	 */
	@GetMapping("/addresses")
	@ApiOperation(value = "Fetch the current user addresses", response = AddressDTO.class, responseContainer="List", authorizations=@Authorization("oauth2"))
	public List<AddressDTO> getUserAddresses(Principal principal){
		User user = userRepository.findByUsername(principal.getName()).orElse(new User());
		List<Address> addresses = new ArrayList<>(addressRepository.findAddressesByUserId(user.getId()));
		List<AddressDTO> addressesDto = addresses.stream().map(AddressDTO::new).collect(Collectors.toList());
		return addressesDto;
	}

	/**
	 * Returns the user addresses.
	 * @return the address with the given id.
	 */
	@GetMapping("/addresses/{addressId:[0-9]+}")
	@ApiOperation(value = "Fetch the addresses by id", response = AddressDTO.class, authorizations=@Authorization("oauth2"))
	public AddressDTO getUserAddresses(@PathVariable("addressId") Integer addressId, Principal principal){
		User user = userRepository.findByUsername(principal.getName()).orElse(new User());
		Address address = addressRepository.findById(addressId).orElse(new Address());
		return new AddressDTO(address);
	}

	/**
	 * Create a user address.
	 * @return created userDTO.
	 */
	@PostMapping("/addresses")
	@ApiOperation(value = "Create a new address to the current user", response = AddressDTO.class, authorizations=@Authorization("oauth2"))
	public AddressDTO createUserAddress(@RequestBody AddressDTO addressDTO, Principal principal){
		User user = userRepository.findByUsername(principal.getName()).orElse(new User());
		Address address = addressDTO.toAddress();
		address.setUser(user);
		address.setActive(true);
		addressRepository.save(address);
		return new AddressDTO(address);
	}

	/**
	 * Update a user address.
	 * @return created userDTO.
	 */
	@PutMapping("/addresses/{addressId:[0-9]+}")
	@ApiOperation(value = "Update the current user address", response = AddressDTO.class, authorizations=@Authorization("oauth2"))
	public AddressDTO updateUserAddress(@PathVariable Integer addressId, @RequestBody AddressDTO addressDTO, Principal principal){
		User user = userRepository.findByUsername(principal.getName()).orElse(new User());
		Address addressUpdated = addressDTO.toAddress();
		addressUpdated.setId(addressId);
		addressUpdated.setUser(user);
		addressRepository.save(addressUpdated);
		return new AddressDTO(addressUpdated);
	}

	/**
	 * Delete the user address
	 */
	@DeleteMapping("/addresses/{addressId:[0-9]+}")
	@ApiOperation(value = "Delete the current user addresses", authorizations=@Authorization("oauth2"))
	public void deleteUserAddress(@PathVariable Integer addressId){
		addressRepository.deleteById(addressId);
	}

	/**
	 * Returns the user orders.
	 * @return list of orders.
	 */
	@GetMapping("/orders")
	@ApiOperation(value = "Fetch the current user orders", response = OrderDTO.class, responseContainer="List", authorizations=@Authorization("oauth2"))
	public List<OrderDTO> getUserOrders(Principal principal){
		List<Order> orders = new ArrayList<>(orderRepository.findUserOrders(principal.getName()));
		List<OrderDTO> ordersDto = orders.stream().map(OrderDTO::new).collect(Collectors.toList());
		return ordersDto;
	}

}
