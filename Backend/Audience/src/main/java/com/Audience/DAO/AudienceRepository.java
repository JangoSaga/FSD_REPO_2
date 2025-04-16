package com.Audience.DAO;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // ✅ use JPA Query
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Audience.Entity.Audience;

@Repository
public interface AudienceRepository extends JpaRepository<Audience, Long> {

    Optional<Audience> findByEmail(String email);

    @Query("SELECT a FROM Audience a JOIN FETCH a.conference c WHERE a.email = :email")
    Optional<Audience> findByEmailWithConference(@Param("email") String email);
}
