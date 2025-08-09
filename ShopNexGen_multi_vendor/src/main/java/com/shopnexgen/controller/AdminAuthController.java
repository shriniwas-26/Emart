package com.shopnexgen.controller;

import com.shopnexgen.exception.SellerException;
import com.shopnexgen.exception.UserException;
import com.shopnexgen.model.enums.USER_ROLE;
import com.shopnexgen.request.LoginRequest;
import com.shopnexgen.request.SignupRequest;
import com.shopnexgen.response.ApiResponse;
import com.shopnexgen.response.AuthResponse;
import com.shopnexgen.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/auth")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> adminLogin(@Valid @RequestBody LoginRequest loginRequest) throws SellerException {
        // Set admin role for login
        loginRequest.setRole("ROLE_ADMIN");
        AuthResponse authResponse = authService.signin(loginRequest);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> adminRegister(@Valid @RequestBody SignupRequest signupRequest) throws SellerException {
        // Set admin role for registration
        signupRequest.setRole("ROLE_ADMIN");
        String token = authService.createUser(signupRequest);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Admin Registration Success");
        authResponse.setRole(USER_ROLE.ROLE_ADMIN);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/validate-email")
    public ResponseEntity<ApiResponse> validateAdminEmail(@RequestBody String email) {
        ApiResponse response = new ApiResponse();
        // Add admin email validation logic here
        response.setMessage("Admin email validation endpoint");
        response.setStatus(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

