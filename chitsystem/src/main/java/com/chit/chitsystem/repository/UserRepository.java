package com.chit.chitsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.chit.chitsystem.entity.User;
import com.chit.chitsystem.entity.enums.Status;

// @Query() to be more specific
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find the user's by their email or username, else null
    Optional<User> findByEmail(String email);
    Optional<User> findByUserName(String username);  

    // Check if username or email exists
    boolean existsByUserName(String userName);
    boolean existsByEmail(String email);


    // Find all users that have ONLINE status
    @Query("SELECT u FROM User u WHERE u.status = ?1")
    List<User> findAllByStatus(Status status);
}
