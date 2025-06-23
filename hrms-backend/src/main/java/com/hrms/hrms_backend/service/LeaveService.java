package com.hrms.hrms_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrms.hrms_backend.entity.Employee;
import com.hrms.hrms_backend.entity.LeaveRequest;
import com.hrms.hrms_backend.repository.EmployeeRepository;
import com.hrms.hrms_backend.repository.LeaveRepository;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository repo;

    @Autowired
    private EmployeeRepository employeeRepo; 

    public List<LeaveRequest> getAll() {
        return repo.findAll();
    }

    public LeaveRequest apply(LeaveRequest leave) {
        System.out.println("Leave submitted: " + leave.getEmployeeId() + ", Date: " + leave.getLeaveDate());

        leave.setStatus("Pending");

        Employee emp = employeeRepo.findById(leave.getEmployeeId()).orElse(null);
        if (emp != null) {
            leave.setEmployeeName(emp.getName());
        }

        return repo.save(leave);
    }

    public LeaveRequest update(Long id, LeaveRequest leave) {
        leave.setId(id);
        return repo.save(leave);
    }
}
