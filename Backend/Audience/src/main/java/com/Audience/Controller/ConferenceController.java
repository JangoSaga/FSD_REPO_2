package com.Audience.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Audience.Entity.Conference;
import com.Audience.Service.ConferenceService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/conference")
public class ConferenceController {

    private ConferenceService conferenceService;
    // Constructor injection

    @Autowired
    public ConferenceController(ConferenceService conferenceService) {
        this.conferenceService = conferenceService;
    }

    @GetMapping("/all")
    public List<Conference> getAllConferences() {
        return conferenceService.getAllConferences();
    }
}
