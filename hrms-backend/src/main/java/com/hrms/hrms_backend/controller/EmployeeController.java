package com.hrms.hrms_backend.controller;

import com.hrms.hrms_backend.entity.Employee;
import com.hrms.hrms_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @GetMapping
    public List<Employee> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Employee add(@RequestBody Employee emp) {
        return service.add(emp);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable String id, @RequestBody Employee emp) {
        return service.update(id, emp);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
