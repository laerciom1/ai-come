package br.ufrn.aicome.controller;

import br.ufrn.aicome.model.*;
import br.ufrn.aicome.model.dto.*;
import br.ufrn.aicome.repository.*;
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

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/stores")
@Api(tags="Stores", value="store", description="Operations pertaining to stores", authorizations=@Authorization("oauth2"))
public class StoreRestController {

	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private StoreRepository storeRepository;

	@Autowired
	private TasteRepository tasteRepository;

	@Autowired
	private PastaRepository pastaRepository;

	@Autowired
	private BorderRepository borderRepository;

	@Autowired
	private SizeRepository sizeRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private OrderRepository orderRepository;

	/**
	 * Returns the list of stores.
	 * @return list of storeDTO.
	 */
	@GetMapping("")
	@ApiOperation(value = "View a list of stores", response = StoreDTO.class, responseContainer="List", authorizations=@Authorization("oauth2"))
	public List<StoreDTO> getStores(){
		List<Store> stores = new ArrayList<>(storeRepository.findAll());
		return stores.stream().map(StoreDTO::new).collect(Collectors.toList());
	}

	/**
	 * Returns the store with the given id.
	 * @param storeId the store id.
	 * @return storeDTO.
	 */
	@GetMapping("/{storeId:[0-9]+}")
	@ApiOperation(value = "Fetch a store with the given id", response = StoreDTO.class, authorizations=@Authorization("oauth2"))
	public StoreDTO getStore(@PathVariable Long storeId) {
		Store store = storeRepository.findById(storeId).orElse(new Store());
		List<Address> addresses = addressRepository.findAddressesByStoreId(storeId);
		StoreDTO storeDTO = new StoreDTO(store, addresses);
		MenuDTO menuDTO = this.getStoreMenu(storeId);
		storeDTO.setMenu(menuDTO);
		return storeDTO;
	}

	/**
	 * Returns the store addresses.
	 * @param storeId the store id.
	 * @return list of addresses.
	 */
	@GetMapping("/{storeId:[0-9]+}/addresses")
	@ApiOperation(value = "Fetch a store addresses", response = AddressDTO.class, responseContainer="List", authorizations=@Authorization("oauth2"))
	public List<AddressDTO> getStoreAddresses(@PathVariable Long storeId){
		List<Address> addresses = new ArrayList<>(addressRepository.findAddressesByStoreId(storeId));
		List<AddressDTO> addressesDto = addresses.stream().map(AddressDTO::new).collect(Collectors.toList());
		return addressesDto;
	}

	/**
	 * Returns the store menu.
	 * @param storeId the store id.
	 * @return menuDTO.
	 */
	@GetMapping("/{storeId:[0-9]+}/menu")
	@ApiOperation(value = "Fetch a store menu", response = MenuDTO.class, authorizations=@Authorization("oauth2"))
	public MenuDTO getStoreMenu(@PathVariable Long storeId){
		List<Border> borders = new ArrayList<>(borderRepository.findBordersByStoreId(storeId));
		List<Pasta> pastas = new ArrayList<>(pastaRepository.findPastasByStoreId(storeId));
		List<Taste> tastes = new ArrayList<>(tasteRepository.findTastesByStoreId(storeId));
		List<Size> sizes = new ArrayList<>(sizeRepository.findSizesByStoreId(storeId));

		MenuDTO menu = new MenuDTO();
		menu.setStoreId(storeId);
		menu.setBorders(borders.stream().map(BorderDTO::new).collect(Collectors.toList()));
		menu.setPastas(pastas.stream().map(PastaDTO::new).collect(Collectors.toList()));
		menu.setTastes(tastes.stream().map(TasteDTO::new).collect(Collectors.toList()));
		menu.setSizes(sizes.stream().map(SizeDTO::new).collect(Collectors.toList()));
		return menu;
	}

	/**
	 * Register a new order.
	 * @return created order.
	 */
	@PostMapping("/{storeId:[0-9]+}/orders")
	@ApiOperation(value = "Register a new order from the current user on the given store", response = OrderReceiptDTO.class, authorizations=@Authorization("oauth2"))
	public OrderReceiptDTO registerOrder(@PathVariable Long storeId, @RequestBody OrderDTO orderDTO, Principal principal){
		Store store = storeRepository.findById(storeId).orElse(new Store());
		User user = userRepository.findByUsername(principal.getName()).orElse(new User());

		Order order = orderDTO.toOrder(store, user);

		List<OrderItemDTO> itensDto = orderDTO.getItens();

		List<OrderItem> orderItens = itensDto.stream()
				.map(OrderItemDTO::toOrderItem).collect(Collectors.toList());

		orderItens.forEach(item -> item.setOrder(order));

		order.setItens(orderItens);

		orderRepository.save(order);

		OrderReceiptDTO orderReceipt = new OrderReceiptDTO();
		orderReceipt.setOrder(new OrderDTO(order, orderItens));
		orderReceipt.setConfirmationId(new Random().nextLong());
		orderReceipt.setEstimatedTime(new Random().nextLong());

		return orderReceipt;
	}


}
