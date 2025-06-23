package com.hrms.hrms_backend.controller;

import com.hrms.hrms_backend.entity.JobPosting;
import com.hrms.hrms_backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobPostingController {

    @Autowired
    private JobService service;

    @GetMapping
    public List<JobPosting> getAll() {
        return service.getAll();
    }

    @PostMapping
    public JobPosting add(@RequestBody JobPosting job) {
        return service.add(job);
    }

    @PutMapping("/{id}")
    public JobPosting update(@PathVariable Long id, @RequestBody JobPosting job) {
        return service.update(id, job);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
