package br.ufrn.aicome.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

import br.ufrn.aicome.model.User;

public interface UserRepository extends GenericRepository<User, Integer>{

	@Query("Select user From User user where user.username = ?1 and user.active = true")
	Optional<User> findByUsername(String username);

}
