package com.hrms.hrms_backend.repository;

import com.hrms.hrms_backend.entity.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<JobPosting, Long> {}
