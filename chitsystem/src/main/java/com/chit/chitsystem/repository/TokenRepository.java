package com.chit.chitsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.chit.chitsystem.entity.Token;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long>{
    
    // Find tokens 
    Optional<Token> findByAccessToken(String accessToken);
    Optional<Token> findByRefreshToken(String refreshToken);

    // Find all valid tokens for a user
    @Query(value = "SELECT t FROM Token t JOIN User u ON t.user.id = u.id WHERE u.id = ?1 AND (t.expired = false OR t.revoked = false)")
    List<Token> findAllValidTokenByUser(Long id);

    // Find all valid tokens for all users
    @Query(value = "SELECT t FROM Token t JOIN User u ON t.user.id = u.id WHERE t.expired = false OR t.revoked = false")
    List<Token> findAllValidTokens();
}
