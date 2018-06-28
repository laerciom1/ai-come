package br.ufrn.aicome.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import br.ufrn.aicome.model.Order;
import br.ufrn.aicome.model.dto.OrderDTO;
import br.ufrn.aicome.repository.OrderRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufrn.aicome.model.Address;
import br.ufrn.aicome.model.User;
import br.ufrn.aicome.model.dto.AddressDTO;
import br.ufrn.aicome.model.dto.UserDTO;
import br.ufrn.aicome.repository.AddressRepository;
import br.ufrn.aicome.repository.UserRepository;
import br.ufrn.aicome.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/users")
@Api(tags="Users", value="user", description="Operations pertaining to users", authorizations=@Authorization("oauth2"))
public class UserRestController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private OrderRepository orderRepository;

	/**
	 * Returns the list of users.
	 * @return list of UserDTO.
	 */
	@GetMapping("")
	@ApiOperation(value = "View a list of users", response = UserDTO.class, responseContainer="List", authorizations=@Authorization("oauth2"))
	public List<UserDTO> getUsers(){
		List<User> users = new ArrayList<>(userRepository.findAll());
		return users.stream().map(UserDTO::new).collect(Collectors.toList());
	}

	/**
	 * Returns the user with the given id.
	 * @param userId the user id.
	 * @return UserDTO.
	 */
	@GetMapping("/{userId:[0-9]+}")
	@ApiOperation(value = "Fetch a user with the given id", response = UserDTO.class, authorizations=@Authorization("oauth2"))
	public UserDTO getUser(@PathVariable Integer userId) {
		User user = userRepository.findById(userId).orElse(new User());
		List<Address> addresses = addressRepository.findAddressesByUserId(userId);
		UserDTO userDTO = new UserDTO(user, addresses);
		return userDTO;
	}

	/**
	 * Create a user.
	 * @return created userDTO.
	 */
	@PostMapping("/{userId:[0-9]+}/address")
	@ApiOperation(value = "Create a new address to the given user", response = AddressDTO.class, authorizations=@Authorization("oauth2"))
	public AddressDTO createUserAddress(@PathVariable Integer userId, @RequestBody AddressDTO addressDTO){
		User user = userRepository.findById(userId).orElse(new User());
		Address address = addressDTO.toAddress();
		address.setUser(user);
		addressRepository.save(address);
		return new AddressDTO(address);
	}

	/**
	 * Returns the user addresses.
	 * @param userId the user id.
	 * @return list of addresses.
	 */
	@GetMapping("/{userId:[0-9]+}/addresses")
	@ApiOperation(value = "Fetch user addresses", response = AddressDTO.class, responseContainer="List", authorizations=@Authorization("oauth2"))
	public List<AddressDTO> getUserAddresses(@PathVariable Integer userId){
		List<Address> addresses = new ArrayList<>(addressRepository.findAddressesByUserId(userId));
		List<AddressDTO> addressesDto = addresses.stream().map(AddressDTO::new).collect(Collectors.toList());
		return addressesDto;
	}

	/**
	 * Returns the user orders.
	 * @param userId the user id.
	 * @return list of orders.
	 */
	@GetMapping("/{userId:[0-9]+}/orders")
	@ApiOperation(value = "Fetch user orders", response = OrderDTO.class, responseContainer="List", authorizations=@Authorization("oauth2"))
	public List<OrderDTO> getUserOrders(@PathVariable Integer userId, Principal principal){
		List<Order> orders = new ArrayList<>(orderRepository.findUserOrders(principal.getName()));
		List<OrderDTO> ordersDto = orders.stream().map(OrderDTO::new).collect(Collectors.toList());
		return ordersDto;
	}

	/**
	 * Create a user.
	 * @return created userDTO.
	 */
	@PostMapping("")
	@ApiOperation(value = "Create a new user", response = UserDTO.class, authorizations=@Authorization("oauth2"))
	public UserDTO createUser(@RequestBody UserDTO userDTO){
		User user = userDTO.toUser();
		userDetailsService.save(user);
		return new UserDTO(user);
	}

}
