package com.shopnexgen.controller;

import com.shopnexgen.exception.SellerException;
import com.shopnexgen.exception.UserException;
import com.shopnexgen.model.VerificationCode;
import com.shopnexgen.model.enums.USER_ROLE;
import com.shopnexgen.request.LoginRequest;
import com.shopnexgen.request.SignupRequest;
import com.shopnexgen.response.ApiResponse;
import com.shopnexgen.response.AuthResponse;
import com.shopnexgen.service.AuthService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sent/login-signup-otp")
    public ResponseEntity<ApiResponse> sentLoginOtp(
            @RequestBody VerificationCode req) throws MessagingException, UserException {

        authService.sentLoginOtp(req.getEmail());

        ApiResponse res = new ApiResponse();
        res.setMessage("otp sent");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(
            @Valid
            @RequestBody SignupRequest req)
            throws SellerException {

        String token = authService.createUser(req);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Register Success");
        authResponse.setRole(USER_ROLE.ROLE_CUSTOMER);

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@Valid @RequestBody LoginRequest loginRequest) throws SellerException {

        AuthResponse authResponse = authService.signin(loginRequest);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/signin-otp")
    public ResponseEntity<AuthResponse> signinWithOtp(@RequestBody LoginRequest loginRequest) throws SellerException {
        // OTP-based login
        AuthResponse authResponse = authService.signinWithOtp(loginRequest);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/validate-email")
    public ResponseEntity<ApiResponse> validateEmail(@RequestBody String email) {
        ApiResponse response = new ApiResponse();
        // Add email validation logic here
        response.setMessage("Email validation endpoint");
        response.setStatus(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
