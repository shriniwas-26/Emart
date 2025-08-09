// Frontend validation utility with regex patterns

// Email validation regex
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation regex - at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Name validation regex - letters and spaces only, 2-50 characters
export const NAME_REGEX = /^[a-zA-Z\s]{2,50}$/;

// Phone number validation regex - international format
export const PHONE_REGEX = /^[+]?[0-9]{10,15}$/;

// OTP validation regex - exactly 6 digits
export const OTP_REGEX = /^\d{6}$/;

// Username validation regex - alphanumeric and underscore, 3-20 characters
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

// Indian mobile number validation regex
export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

// Pincode validation regex - 6 digits
export const PINCODE_REGEX = /^\d{6}$/;

// URL validation regex
export const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})[\/\w .-]*\/?$/;

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidEmail = (email) => {
    return email && EMAIL_REGEX.test(email.trim());
};

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidPassword = (password) => {
    return password && PASSWORD_REGEX.test(password);
};

/**
 * Validates name format (letters and spaces only, 2-50 characters)
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidName = (name) => {
    return name && NAME_REGEX.test(name.trim());
};

/**
 * Validates phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidPhone = (phone) => {
    return phone && PHONE_REGEX.test(phone.trim());
};

/**
 * Validates OTP format (exactly 6 digits)
 * @param {string} otp - OTP to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidOtp = (otp) => {
    return otp && OTP_REGEX.test(otp.trim());
};

/**
 * Validates username format
 * @param {string} username - Username to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidUsername = (username) => {
    return username && USERNAME_REGEX.test(username.trim());
};

/**
 * Validates Indian mobile number format
 * @param {string} mobile - Mobile number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidIndianMobile = (mobile) => {
    return mobile && INDIAN_MOBILE_REGEX.test(mobile.trim());
};

/**
 * Validates pincode format (6 digits)
 * @param {string} pincode - Pincode to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidPincode = (pincode) => {
    return pincode && PINCODE_REGEX.test(pincode.trim());
};

/**
 * Validates URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidUrl = (url) => {
    return url && URL_REGEX.test(url.trim());
};

/**
 * Validates if string is not null or empty
 * @param {string} value - Value to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isNotNullOrEmpty = (value) => {
    return value && value.trim().length > 0;
};

/**
 * Validates if string length is within range
 * @param {string} value - Value to validate
 * @param {number} min - Minimum length
 * @param {number} max - Maximum length
 * @returns {boolean} - True if valid, false otherwise
 */
export const isLengthInRange = (value, min, max) => {
    return value && value.length >= min && value.length <= max;
};

/**
 * Gets password requirements message
 * @returns {string} - Password requirements message
 */
export const getPasswordRequirements = () => {
    return "Password must contain at least 8 characters, including: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&)";
};

/**
 * Gets email requirements message
 * @returns {string} - Email requirements message
 */
export const getEmailRequirements = () => {
    return "Please provide a valid email address (e.g., user@example.com)";
};

/**
 * Gets name requirements message
 * @returns {string} - Name requirements message
 */
export const getNameRequirements = () => {
    return "Name must be 2-50 characters long and can only contain letters and spaces";
};

/**
 * Gets OTP requirements message
 * @returns {string} - OTP requirements message
 */
export const getOtpRequirements = () => {
    return "OTP must be exactly 6 digits";
};

/**
 * Gets phone requirements message
 * @returns {string} - Phone requirements message
 */
export const getPhoneRequirements = () => {
    return "Phone number must be 10-15 digits and can start with + for international format";
};

/**
 * Gets Indian mobile requirements message
 * @returns {string} - Indian mobile requirements message
 */
export const getIndianMobileRequirements = () => {
    return "Mobile number must be 10 digits starting with 6, 7, 8, or 9";
};

/**
 * Gets pincode requirements message
 * @returns {string} - Pincode requirements message
 */
export const getPincodeRequirements = () => {
    return "Pincode must be exactly 6 digits";
};
