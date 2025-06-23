package com.hrms.hrms_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrms.hrms_backend.entity.Payroll;
import com.hrms.hrms_backend.repository.PayrollRepository;

@Service
public class PayrollService {

    @Autowired
    private PayrollRepository repo;

    public List<Payroll> getAll() {
        return repo.findAll();
    }

    public Payroll add(Payroll payroll) {
        return repo.save(payroll);
    }

    public Payroll update(Long id, Payroll payroll) {
        payroll.setId(id);
        return repo.save(payroll);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
