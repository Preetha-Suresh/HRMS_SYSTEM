package com.hrms.hrms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hrms.hrms_backend.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {}
