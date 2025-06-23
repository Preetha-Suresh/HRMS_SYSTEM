package com.hrms.hrms_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrms.hrms_backend.entity.Employee;
import com.hrms.hrms_backend.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repo;

    public List<Employee> getAll() {
        return repo.findAll();
    }

    public Employee add(Employee emp) {
        if (emp.getId() == null || emp.getId().isEmpty()) {
            List<Employee> all = repo.findAll();
            int maxId = all.stream()
                .map(e -> e.getId().replaceAll("\\D+", "")) // extract digits from E001
                .filter(s -> !s.isEmpty())
                .mapToInt(Integer::parseInt)
                .max()
                .orElse(0);

            String newId = "E" + String.format("%03d", maxId + 1);
            emp.setId(newId);
        }
        return repo.save(emp);
    }

    public Employee update(String id, Employee emp) {
        emp.setId(id);
        return repo.save(emp);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
