package com.shopnexgen.service;

import com.shopnexgen.exception.UserException;
import com.shopnexgen.model.User;

public interface UserService {
	public User findUserProfileByJwt(String jwt) throws UserException;
	public User findUserByEmail(String email) throws UserException;
	public User updateUserProfile(String jwt, User updateUser) throws UserException;
}
