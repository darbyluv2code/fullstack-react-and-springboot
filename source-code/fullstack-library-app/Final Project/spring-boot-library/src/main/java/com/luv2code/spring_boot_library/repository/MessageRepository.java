package com.luv2code.spring_boot_library.repository;

import com.luv2code.spring_boot_library.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
    Page<Message> findByUserEmail(String userEmail, Pageable pageable);
    Page<Message> findByClosed(boolean closed, Pageable pageable);
}
