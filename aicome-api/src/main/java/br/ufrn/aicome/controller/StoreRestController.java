package br.ufrn.aicome.controller;

import br.ufrn.aicome.model.*;
import br.ufrn.aicome.model.dto.*;
import br.ufrn.aicome.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/stores")
public class StoreRestController {

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

	/**
	 * Returns the list of stores.
	 * @return list of storeDTO.
	 */
	@GetMapping("")
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
	public StoreDTO getStore(@PathVariable Integer storeId) {
		Store store = storeRepository.findById(storeId).orElse(new Store());
		StoreDTO storeDTO = new StoreDTO(store);
		MenuDTO menuDTO = this.getStoreMenu(storeId);
		storeDTO.setMenu(menuDTO);
		return storeDTO;
	}

	/**
	 * Returns the store menu.
	 * @param storeId the store id.
	 * @return menuDTO.
	 */
	@GetMapping("/{storeId:[0-9]+}/menu")
	public MenuDTO getStoreMenu(@PathVariable Integer storeId){
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


}
