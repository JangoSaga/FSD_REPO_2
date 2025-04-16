package com.Audience.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Audience.Entity.Conference;

@Repository
public interface ConferenceRepository extends JpaRepository<Conference, Long> {

}
