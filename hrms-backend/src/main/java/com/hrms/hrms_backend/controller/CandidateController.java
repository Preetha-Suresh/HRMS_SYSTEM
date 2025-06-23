package com.hrms.hrms_backend.controller;

import com.hrms.hrms_backend.entity.Candidate;
import com.hrms.hrms_backend.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    @Autowired
    private CandidateRepository repo;

    @GetMapping("/job/{jobId}")
    public List<Candidate> getByJob(@PathVariable Long jobId) {
        return repo.findByJobId(jobId);
    }

    @PostMapping
    public Candidate add(@RequestBody Candidate candidate) {
        return repo.save(candidate);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
