package br.ufrn.aicome.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.ufrn.aicome.model.User;
import br.ufrn.aicome.repository.UserRepository;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public void save(User user){
		if(user.getPassword() != null){
			String encodedPassword = passwordEncoder.encode(user.getPassword());
			user.setPassword(encodedPassword);
		}

		repository.save(user);
	}

	@Override
	public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {

		Optional<User> optionalUser = repository.findByUsername(username);

		if (!optionalUser.isPresent()) {
			throw new UsernameNotFoundException(username);
		}
		User user = optionalUser.get();
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getPermissions());
	}

}
