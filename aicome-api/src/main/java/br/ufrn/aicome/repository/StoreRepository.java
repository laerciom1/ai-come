package br.ufrn.aicome.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

import br.ufrn.aicome.model.Store;
import org.springframework.data.repository.query.Param;

public interface StoreRepository extends GenericRepository<Store, Integer> {

	@Override
	@Query("select s from Store s left join fetch s.user where s.id = :storeId")
	public Optional<Store> findById(@Param("storeId") Integer storeId);

	@Override
	@Query("select s from Store s left join fetch s.user")
	public List<Store> findAll();

}
