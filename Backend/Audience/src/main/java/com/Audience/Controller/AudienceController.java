package com.Audience.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Audience.Entity.Audience;
import com.Audience.Service.AudienceService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/audience")
public class AudienceController {

    @Autowired
    private AudienceService audienceService;

    @PostMapping("/register")
    public Audience registerUser(@RequestBody Audience audience) {
        return audienceService.registerUser(audience);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam String email, @RequestParam String password) {
        Audience audience = audienceService.loginUser(email, password);
        if (audience != null) {
            return ResponseEntity.ok(audience);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @PutMapping("/update-profile/{id}")
    public Audience updateProfile(@PathVariable Long id, @RequestBody Audience audience) {
        return audienceService.updateProfile(id, audience);
    }
}
