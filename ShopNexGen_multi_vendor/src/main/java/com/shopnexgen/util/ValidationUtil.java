package com.shopnexgen.util;

import java.util.regex.Pattern;

public class ValidationUtil {
    
    // Email validation regex - comprehensive pattern
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);
    
    // Password validation regex - at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    private static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(PASSWORD_REGEX);
    
    // Name validation regex - letters and spaces only, 2-50 characters
    private static final String NAME_REGEX = "^[a-zA-Z\\s]{2,50}$";
    private static final Pattern NAME_PATTERN = Pattern.compile(NAME_REGEX);
    
    // Phone number validation regex - international format
    private static final String PHONE_REGEX = "^[+]?[0-9]{10,15}$";
    private static final Pattern PHONE_PATTERN = Pattern.compile(PHONE_REGEX);
    
    // URL validation regex
    private static final String URL_REGEX = "^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?$";
    private static final Pattern URL_PATTERN = Pattern.compile(URL_REGEX);
    
    // OTP validation regex - exactly 6 digits
    private static final String OTP_REGEX = "^\\d{6}$";
    private static final Pattern OTP_PATTERN = Pattern.compile(OTP_REGEX);
    
    // Username validation regex - alphanumeric and underscore, 3-20 characters
    private static final String USERNAME_REGEX = "^[a-zA-Z0-9_]{3,20}$";
    private static final Pattern USERNAME_PATTERN = Pattern.compile(USERNAME_REGEX);
    
    // Indian mobile number validation regex
    private static final String INDIAN_MOBILE_REGEX = "^[6-9]\\d{9}$";
    private static final Pattern INDIAN_MOBILE_PATTERN = Pattern.compile(INDIAN_MOBILE_REGEX);
    
    // Pincode validation regex - 6 digits
    private static final String PINCODE_REGEX = "^\\d{6}$";
    private static final Pattern PINCODE_PATTERN = Pattern.compile(PINCODE_REGEX);
    
    /**
     * Validates email format
     */
    public static boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email.trim()).matches();
    }
    
    /**
     * Validates password strength
     */
    public static boolean isValidPassword(String password) {
        return password != null && PASSWORD_PATTERN.matcher(password).matches();
    }
    
    /**
     * Validates name format (letters and spaces only, 2-50 characters)
     */
    public static boolean isValidName(String name) {
        return name != null && NAME_PATTERN.matcher(name.trim()).matches();
    }
    
    /**
     * Validates phone number format
     */
    public static boolean isValidPhone(String phone) {
        return phone != null && PHONE_PATTERN.matcher(phone.trim()).matches();
    }
    
    /**
     * Validates URL format
     */
    public static boolean isValidUrl(String url) {
        return url != null && URL_PATTERN.matcher(url.trim()).matches();
    }
    
    /**
     * Validates OTP format (exactly 6 digits)
     */
    public static boolean isValidOtp(String otp) {
        return otp != null && OTP_PATTERN.matcher(otp.trim()).matches();
    }
    
    /**
     * Validates username format
     */
    public static boolean isValidUsername(String username) {
        return username != null && USERNAME_PATTERN.matcher(username.trim()).matches();
    }
    
    /**
     * Validates Indian mobile number format
     */
    public static boolean isValidIndianMobile(String mobile) {
        return mobile != null && INDIAN_MOBILE_PATTERN.matcher(mobile.trim()).matches();
    }
    
    /**
     * Validates pincode format (6 digits)
     */
    public static boolean isValidPincode(String pincode) {
        return pincode != null && PINCODE_PATTERN.matcher(pincode.trim()).matches();
    }
    
    /**
     * Gets password requirements message
     */
    public static String getPasswordRequirements() {
        return "Password must contain at least 8 characters, including: " +
               "1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&)";
    }
    
    /**
     * Gets email requirements message
     */
    public static String getEmailRequirements() {
        return "Please provide a valid email address (e.g., user@example.com)";
    }
    
    /**
     * Gets name requirements message
     */
    public static String getNameRequirements() {
        return "Name must be 2-50 characters long and can only contain letters and spaces";
    }
    
    /**
     * Gets OTP requirements message
     */
    public static String getOtpRequirements() {
        return "OTP must be exactly 6 digits";
    }
    
    /**
     * Gets phone requirements message
     */
    public static String getPhoneRequirements() {
        return "Phone number must be 10-15 digits and can start with + for international format";
    }
    
    /**
     * Gets Indian mobile requirements message
     */
    public static String getIndianMobileRequirements() {
        return "Mobile number must be 10 digits starting with 6, 7, 8, or 9";
    }
    
    /**
     * Gets pincode requirements message
     */
    public static String getPincodeRequirements() {
        return "Pincode must be exactly 6 digits";
    }
    
    /**
     * Validates if string is not null or empty
     */
    public static boolean isNotNullOrEmpty(String value) {
        return value != null && !value.trim().isEmpty();
    }
    
    /**
     * Validates if string length is within range
     */
    public static boolean isLengthInRange(String value, int min, int max) {
        return value != null && value.length() >= min && value.length() <= max;
    }
}

