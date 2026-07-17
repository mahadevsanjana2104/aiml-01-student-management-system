package com.training.studentmanagement.controller;

import com.training.studentmanagement.dto.LoginRequest;
import com.training.studentmanagement.dto.RegisterRequest;
import com.training.studentmanagement.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){

        return authService.register(request);

    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){

        return authService.login(request);

    }

}