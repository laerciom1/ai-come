package br.ufrn.aicome.repository;

import br.ufrn.aicome.model.Border;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BorderRepository extends GenericRepository<Border, Integer> {

    @Query("select b from Border b where b.store.id = :storeId")
    public List<Border> findBordersByStoreId(@Param("storeId") Long storeId);

}
