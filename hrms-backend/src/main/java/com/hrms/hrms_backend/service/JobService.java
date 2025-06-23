package com.hrms.hrms_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrms.hrms_backend.entity.JobPosting;
import com.hrms.hrms_backend.repository.JobRepository;

@Service
public class JobService {

    @Autowired
    private JobRepository repo;

    public List<JobPosting> getAll() {
        return repo.findAll();
    }

    public JobPosting add(JobPosting job) {
        return repo.save(job);
    }

    public JobPosting update(Long id, JobPosting job) {
        job.setId(id);
        return repo.save(job);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
