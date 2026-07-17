package com.training.studentmanagement.service;

import com.training.studentmanagement.dto.LoginRequest;
import com.training.studentmanagement.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    String login(LoginRequest request);

}