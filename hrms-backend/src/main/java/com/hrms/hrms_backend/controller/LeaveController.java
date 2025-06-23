package com.hrms.hrms_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.hrms_backend.entity.LeaveRequest;
import com.hrms.hrms_backend.service.LeaveService;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "*") 
public class LeaveController {

    @Autowired
    private LeaveService service;

    @GetMapping
    public List<LeaveRequest> getAll() {
        return service.getAll();
    }

    @PostMapping
    public LeaveRequest apply(@RequestBody LeaveRequest request) {
        System.out.println("Received Leave from frontend: " + request.getEmployeeId() + " " + request.getLeaveDate());
        return service.apply(request);
    }


    @PutMapping("/{id}")
    public LeaveRequest update(@PathVariable Long id, @RequestBody LeaveRequest request) {
        return service.update(id, request);
    }

    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getByEmployee(@PathVariable String employeeId) {
        return service.getAll().stream()
            .filter(l -> l.getEmployeeId().equals(employeeId))
            .toList();
    }
}
