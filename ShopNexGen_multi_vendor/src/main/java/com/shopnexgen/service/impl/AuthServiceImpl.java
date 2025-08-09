package com.shopnexgen.service.impl;

import com.shopnexgen.config.JwtProvider;
import com.shopnexgen.config.OtpProvider;
import com.shopnexgen.exception.SellerException;
import com.shopnexgen.exception.UserException;
import com.shopnexgen.model.Cart;
import com.shopnexgen.model.User;
import com.shopnexgen.model.VerificationCode;
import com.shopnexgen.model.enums.USER_ROLE;
import com.shopnexgen.repository.CartRepository;
import com.shopnexgen.repository.UserRepository;
import com.shopnexgen.repository.VerificationCodeRepository;
import com.shopnexgen.request.LoginRequest;
import com.shopnexgen.request.SignupRequest;
import com.shopnexgen.response.AuthResponse;
import com.shopnexgen.service.AuthService;
import com.shopnexgen.service.EmailService;
import com.shopnexgen.service.UserService;
import com.shopnexgen.util.ValidationUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;

    private final VerificationCodeRepository verificationCodeRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    private final JwtProvider jwtProvider;
    private final CustomUserServiceImpl customUserDetails;
    private final CartRepository cartRepository;


    @Override
    public void sentLoginOtp(String email) throws UserException, MessagingException {

        String SIGNING_PREFIX = "signing_";

        if (email.startsWith(SIGNING_PREFIX)) {
            email = email.substring(SIGNING_PREFIX.length());
            userService.findUserByEmail(email);
        }

        VerificationCode isExist = verificationCodeRepository
                .findByEmail(email);

        if (isExist != null) {
            verificationCodeRepository.delete(isExist);
        }

        String otp = OtpProvider.generateOTP();

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);
        verificationCodeRepository.save(verificationCode);

        String subject = "Emart Login/Signup Otp";
        String text = "your login otp is - ";
        emailService.sendVerificationOtpEmail(email, otp, subject, text);
    }

    @Override
    public String createUser(SignupRequest req) throws SellerException {

        String email = req.getEmail();
        String fullName = req.getFullName();
        String password = req.getPassword();
        String confirmPassword = req.getConfirmPassword();
        String role = req.getRole();
        String otp = req.getOtp();

        // Validate email
        if (!ValidationUtil.isValidEmail(email)) {
            throw new SellerException(ValidationUtil.getEmailRequirements());
        }

        // Validate full name
        if (!ValidationUtil.isValidName(fullName)) {
            throw new SellerException(ValidationUtil.getNameRequirements());
        }

        // Check if user already exists
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            throw new SellerException("User with this email already exists");
        }

        // Handle password-based registration
        if (password != null && !password.isEmpty()) {
            // Validate password
            if (!ValidationUtil.isValidPassword(password)) {
                throw new SellerException(ValidationUtil.getPasswordRequirements());
            }

            // Check password confirmation
            if (!password.equals(confirmPassword)) {
                throw new SellerException("Passwords do not match");
            }

            // Create user with password
            User createdUser = new User();
            createdUser.setEmail(email);
            createdUser.setFullName(fullName);
            createdUser.setRole(USER_ROLE.valueOf(role));
            createdUser.setMobile("**********");
            createdUser.setPassword(passwordEncoder.encode(password));

            userRepository.save(createdUser);

            // Create cart for customer
            if (role.equals("ROLE_CUSTOMER")) {
                Cart cart = new Cart();
                cart.setUser(createdUser);
                cartRepository.save(cart);
            }

            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(role));

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    email, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return jwtProvider.generateToken(authentication);
        }

        // Handle OTP-based registration
        if (otp != null && !otp.isEmpty()) {
            // Validate OTP format
            if (!ValidationUtil.isValidOtp(otp)) {
                throw new SellerException(ValidationUtil.getOtpRequirements());
            }

            VerificationCode verificationCode = verificationCodeRepository.findByEmail(email);

            if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
                throw new SellerException("Invalid OTP. Please check and try again.");
            }

            User createdUser = new User();
            createdUser.setEmail(email);
            createdUser.setFullName(fullName);
            createdUser.setRole(USER_ROLE.valueOf(role));
            createdUser.setMobile("**********");
            createdUser.setPassword(passwordEncoder.encode(otp));

            userRepository.save(createdUser);

            // Create cart for customer
            if (role.equals("ROLE_CUSTOMER")) {
                Cart cart = new Cart();
                cart.setUser(createdUser);
                cartRepository.save(cart);
            }

            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(role));

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    email, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return jwtProvider.generateToken(authentication);
        }

        throw new SellerException("Either password or OTP is required for registration");
    }

    @Override
    public AuthResponse signin(LoginRequest req) throws SellerException {

        String email = req.getEmail();
        String password = req.getPassword();
        String otp = req.getOtp();
        String role = req.getRole();

        // Validate email
        if (!ValidationUtil.isValidEmail(email)) {
            throw new SellerException(ValidationUtil.getEmailRequirements());
        }

        System.out.println(email + " ----- " + (password != null ? "password" : "otp"));

        Authentication authentication;
        
        // Handle password-based login
        if (password != null && !password.isEmpty()) {
            // Validate password format
            if (!ValidationUtil.isValidPassword(password)) {
                throw new SellerException(ValidationUtil.getPasswordRequirements());
            }
            authentication = authenticateWithPassword(email, password);
        } else if (otp != null && !otp.isEmpty()) {
            // Handle OTP-based login
            // Validate OTP format
            if (!ValidationUtil.isValidOtp(otp)) {
                throw new SellerException(ValidationUtil.getOtpRequirements());
            }
            authentication = authenticate(email, otp);
        } else {
            throw new SellerException("Either password or OTP is required for login");
        }
        
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();

        authResponse.setMessage("Login Success");
        authResponse.setJwt(token);
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();
        authResponse.setRole(USER_ROLE.valueOf(roleName));

        return authResponse;
    }

    private Authentication authenticate(String username, String otp) throws SellerException {
        UserDetails userDetails = customUserDetails.loadUserByUsername(username);

        System.out.println("sign in userDetails - " + userDetails);

        if (userDetails == null) {
            System.out.println("sign in userDetails - null ");
            throw new BadCredentialsException("Invalid username or password");
        }
        VerificationCode verificationCode = verificationCodeRepository.findByEmail(username);

        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new SellerException("Invalid OTP. Please check and try again.");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @Override
    public AuthResponse signinWithOtp(LoginRequest req) throws SellerException {
        // OTP-based login (existing functionality)
        return signin(req);
    }

    @Override
    public boolean validatePassword(String password) {
        return ValidationUtil.isValidPassword(password);
    }

    @Override
    public boolean validateEmail(String email) {
        return ValidationUtil.isValidEmail(email);
    }

    // New method for email/password authentication
    private Authentication authenticateWithPassword(String email, String password) throws SellerException {
        User user = userRepository.findByEmail(email);
        
        if (user == null) {
            throw new BadCredentialsException("Invalid email or password");
        }
        
        // Check if password matches (for new users with password)
        if (user.getPassword() != null && !passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }
        
        // For OTP-based users, check OTP
        if (user.getPassword() == null || user.getPassword().equals(passwordEncoder.encode("otp"))) {
            throw new SellerException("Please use OTP-based login for this account");
        }
        
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().toString()));
        
        return new UsernamePasswordAuthenticationToken(user.getEmail(), null, authorities);
    }
}

