package com.hrms.hrms_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrms.hrms_backend.entity.Employee;
import com.hrms.hrms_backend.entity.User;
import com.hrms.hrms_backend.repository.EmployeeRepository;
import com.hrms.hrms_backend.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private EmployeeRepository employeeRepo;

    public User login(String username, String password) {
        return repo.findByUsernameAndPassword(username, password);
    }

    public User register(User user) {
        if (repo.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }

        
        User savedUser = repo.save(user);

        
        if (user.getRole().equalsIgnoreCase("employee")) {
            Employee emp = new Employee();

            long count = employeeRepo.count() + 1;
            String empId = "E" + String.format("%03d", count);
            emp.setId(empId);

            emp.setName(user.getName());
            emp.setEmail(user.getUsername()); 
            emp.setPhone(user.getContact());
            emp.setDepartment(user.getDepartment());
            emp.setRole(user.getRole());
            emp.setStatus("Active");

            employeeRepo.save(emp);
        }

        return savedUser;
    }
}
