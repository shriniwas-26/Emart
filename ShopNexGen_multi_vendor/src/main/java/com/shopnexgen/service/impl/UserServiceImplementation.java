package com.shopnexgen.service.impl;


import com.shopnexgen.config.JwtProvider;
import com.shopnexgen.exception.UserException;
import com.shopnexgen.model.User;
import com.shopnexgen.repository.PasswordResetTokenRepository;
import com.shopnexgen.repository.UserRepository;
import com.shopnexgen.service.UserService;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplementation implements UserService {

	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	private PasswordEncoder passwordEncoder;
	private PasswordResetTokenRepository passwordResetTokenRepository;
	private JavaMailSender javaMailSender;
	
	public UserServiceImplementation(
			UserRepository userRepository,
			JwtProvider jwtProvider,
			PasswordEncoder passwordEncoder,
			PasswordResetTokenRepository passwordResetTokenRepository,
			JavaMailSender javaMailSender) {
		
		this.userRepository=userRepository;
		this.jwtProvider=jwtProvider;
		this.passwordEncoder=passwordEncoder;
		this.passwordResetTokenRepository=passwordResetTokenRepository;
		this.javaMailSender=javaMailSender;
		
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		String email=jwtProvider.getEmailFromJwtToken(jwt);
		
		
		User user = userRepository.findByEmail(email);
		
		if(user==null) {
			throw new UserException("user not exist with email "+email);
		}
		return user;
	}

	@Override
	public User updateUserProfile(String jwt, User updateUser) throws UserException {
		String email = jwtProvider.getEmailFromJwtToken(jwt);
		User existingUser = userRepository.findByEmail(email);
		
		if(existingUser == null) {
			throw new UserException("User not found with email " + email);
		}
		
		// Update only the allowed fields
		if(updateUser.getFullName() != null && !updateUser.getFullName().trim().isEmpty()) {
			existingUser.setFullName(updateUser.getFullName());
		}
		
		if(updateUser.getMobile() != null && !updateUser.getMobile().trim().isEmpty()) {
			existingUser.setMobile(updateUser.getMobile());
		}
		
		// Note: Email should not be updated for security reasons
		// Password updates should be handled separately
		
		User savedUser = userRepository.save(existingUser);
		return savedUser;
	}

	
	@Override
	public User findUserByEmail(String username) throws UserException {
		
		User user=userRepository.findByEmail(username);
		
		if(user!=null) {
			
			return user;
		}
		
		throw new UserException("user not exist with username "+username);
	}



}
