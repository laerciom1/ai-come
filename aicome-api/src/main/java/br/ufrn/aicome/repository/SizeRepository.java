package br.ufrn.aicome.repository;

import br.ufrn.aicome.model.Size;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SizeRepository extends GenericRepository<Size, Integer> {

    @Query("select s from Size s where s.store.id = :storeId")
    public List<Size> findSizesByStoreId(@Param("storeId") Long storeId);

}
