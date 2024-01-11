package com.chit.chitsystem.forgotpassword;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long>{
    Optional<PasswordResetToken> findByToken(String token);

    // Find all valid password reset tokens for a user
    @Query(value = "SELECT t FROM PasswordResetToken  t JOIN User u ON t.user.id = u.id WHERE u.id = ?1 AND t.revoked = false")
    List<PasswordResetToken> findAllValidResetTokenByUser(Long id);
}
