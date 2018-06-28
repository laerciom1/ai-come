package br.ufrn.aicome.repository;

import br.ufrn.aicome.model.Pasta;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PastaRepository extends GenericRepository<Pasta, Integer> {

    @Query("select p from Pasta p where p.store.id = :storeId")
    public List<Pasta> findPastasByStoreId(@Param("storeId") Long storeId);

}
