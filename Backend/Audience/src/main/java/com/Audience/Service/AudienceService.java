package com.Audience.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Audience.DAO.AudienceRepository;
import com.Audience.Entity.Audience;

@Service
public class AudienceService {

    @Autowired
    private AudienceRepository audienceRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Audience registerUser(Audience audience) {
        audience.setPassword(passwordEncoder.encode(audience.getPassword()));
        return audienceRepository.save(audience);
    }

    public Audience loginUser(String email, String password) {
        Optional<Audience> user = audienceRepository.findByEmailWithConference(email);
        // System.out.println("DB Hash: " + user.get().getPassword());
        // System.out.println("Raw: " + password);
        // System.out.println("Match: " + passwordEncoder.matches(password, user.get().getPassword()));

        return user.filter(a -> passwordEncoder.matches(password, a.getPassword())).orElse(null);
    }

    public Audience updateProfile(Long audienceId, Audience updatedAudience) {
        return audienceRepository.findById(audienceId).map(audience -> {
            if (updatedAudience.getFull_name() != null) {
                audience.setFull_name(updatedAudience.getFull_name());
            }
            if (updatedAudience.getAffilation() != null) {
                audience.setAffilation(updatedAudience.getAffilation());
            }
            if (updatedAudience.getPhone_no() != null) {
                audience.setPhone_no(updatedAudience.getPhone_no());
            }
            return audienceRepository.save(audience);
        }).orElse(null);
    }
}
