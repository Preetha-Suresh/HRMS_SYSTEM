package com.hrms.hrms_backend.controller;

import com.hrms.hrms_backend.entity.Payroll;
import com.hrms.hrms_backend.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @Autowired
    private PayrollService service;

    @GetMapping
    public List<Payroll> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Payroll add(@RequestBody Payroll payroll) {
        return service.add(payroll);
    }

    @PutMapping("/{id}")
    public Payroll update(@PathVariable Long id, @RequestBody Payroll payroll) {
        return service.update(id, payroll);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
