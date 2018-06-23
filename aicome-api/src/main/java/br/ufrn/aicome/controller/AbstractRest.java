package br.ufrn.aicome.controller;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import br.ufrn.aicome.model.AbstractModel;
import br.ufrn.aicome.repository.GenericRepository;

public abstract class AbstractRest<T extends AbstractModel<PK>, PK extends Serializable> {

	protected abstract GenericRepository<T,PK> repository();

	@GetMapping
	public List<T> findAll() {
		return repository().findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<T> getById(@PathVariable PK id) {
		Optional<T> entity = repository().findById(id);
		if (!entity.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(entity.get());
	}

	@PostMapping
	public ResponseEntity<T> save(@Valid @RequestBody T entity) {
		beforSave(entity);
		return ResponseEntity.ok(repository().save(entity));
	}

	@PutMapping("/{id}")
	public ResponseEntity<T> update(@PathVariable PK id, @Valid @RequestBody T entity) {
		if (repository().findById(id).isPresent()) {
			beforUpdate(entity);
			return ResponseEntity.ok(repository().save(entity));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<T> delete(@PathVariable(value = "id") PK id) {
		Optional<T> entity = repository().findById(id);
		if (entity.isPresent()) {
			beforDelete(entity.get());
			repository().deleteById(id);
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	public void beforSave(T entity){}
	
	public void beforUpdate(T entity){}
	
	public void beforDelete(T entity){}

}
