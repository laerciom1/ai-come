package br.ufrn.aicome.service;

import br.ufrn.aicome.model.User;
import br.ufrn.aicome.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository repository;

	@Override
	@Cacheable(cacheNames="userByUsername", key="#username")
	public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {

		Optional<User> optionalUser = repository.findByUsername(username);

		if (!optionalUser.isPresent()) {
			throw new UsernameNotFoundException(username);
		}
		User user = optionalUser.get();
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getPermissions());
	}

}
