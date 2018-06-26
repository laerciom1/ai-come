package br.ufrn.aicome.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

import br.ufrn.aicome.model.Store;

public interface StoreRepository extends GenericRepository<Store, Integer> {

	@Override
	@Query("select s from Store s left join fetch s.user")
	public Optional<Store> findById(Integer id);

	@Override
	@Query("select s from Store s left join fetch s.user")
	public List<Store> findAll();

}
