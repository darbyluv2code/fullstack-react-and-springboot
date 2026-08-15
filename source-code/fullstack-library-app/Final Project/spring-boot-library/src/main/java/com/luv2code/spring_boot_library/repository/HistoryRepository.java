package com.luv2code.spring_boot_library.repository;

import com.luv2code.spring_boot_library.entity.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Long> {
    Page<History> findByUserEmailOrderByReturnedDateDesc(String userEmail, Pageable pageable);
}
