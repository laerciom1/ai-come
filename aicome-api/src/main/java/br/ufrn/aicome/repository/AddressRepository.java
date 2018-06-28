package br.ufrn.aicome.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.ufrn.aicome.model.Address;

public interface AddressRepository extends GenericRepository<Address, Integer> {

	@Query("select a from Address a join fetch a.user u inner join Store s on s.user.id = u.id where s.id = :storeId")
	public List<Address> findAddressesByStoreId(@Param("storeId") Long storeId);

	@Query("select a from Address a join fetch a.user u where u.id = :userId")
	public List<Address> findAddressesByUserId(@Param("userId") Integer userId);


}
