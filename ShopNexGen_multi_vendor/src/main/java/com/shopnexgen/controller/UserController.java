package com.shopnexgen.controller;

import com.shopnexgen.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shopnexgen.exception.UserException;

import com.shopnexgen.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService=userService;
	}
	
	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfileHandler(
			@RequestHeader("Authorization") String jwt) throws UserException{

		System.out.println("/api/users/profile");
		User user=userService.findUserProfileByJwt(jwt);
		return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
	}

	@PutMapping("/profile")
	public ResponseEntity<User> updateUserProfileHandler(
			@RequestBody User updateUser,
			@RequestHeader("Authorization") String jwt) throws UserException{

		System.out.println("/api/users/profile - PUT");
		User updatedUser = userService.updateUserProfile(jwt, updateUser);
		return new ResponseEntity<>(updatedUser,HttpStatus.OK);
	}

}
