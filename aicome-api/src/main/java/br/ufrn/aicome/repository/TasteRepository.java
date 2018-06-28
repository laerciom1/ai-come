package br.ufrn.aicome.repository;

import br.ufrn.aicome.model.Taste;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TasteRepository extends GenericRepository<Taste, Integer> {

    @Query("select t from Taste t where t.store.id = :storeId")
    public List<Taste> findTastesByStoreId(@Param("storeId") Long storeId);


}
