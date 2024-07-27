/**
 * Checks if the user is authenticated by verifying the presence of a token in localStorage.
 * @returns {boolean} - True if authenticated, false otherwise.
 */
export const isAuthenticated = () => {
    if (typeof window === 'undefined') {
        console.log("Window is undefined. User is not authenticated.");
        return false;
    }
    const token = localStorage.getItem('token');
    const isAuthenticated = token ? true : false;
    console.log("Authentication status:", isAuthenticated);
    return isAuthenticated;
};

/**
 * Retrieves the user ID from localStorage, which could be either email or phone number.
 * Handles cases where user data is stored as plain text or JSON.
 * @returns {string|boolean} - User ID if available, false otherwise.
 */
export const getUserID = () => {
    if (typeof window === 'undefined') {
        console.log("Window is undefined. Cannot retrieve user ID.");
        return false;
    }

    const user = localStorage.getItem('user');
    console.log("Retrieved user from localStorage:", user);

    if (user) {
        try {
            // Try to parse as JSON
            const parsedUser = JSON.parse(user);
            console.log("Parsed user JSON:", parsedUser);

            // Return email or phone number if available
            const userId = parsedUser.email || parsedUser.phone || user;
            console.log("User ID extracted:", userId);
            return userId; // Fallback to plain string if JSON parsing fails
        } catch (e) {
            // If parsing fails, return user as-is assuming it's a plain string
            console.error("Failed to parse user data as JSON, returning as-is:", e);
            console.log("Returning user as plain string:", user);
            return user;
        }
    }
    console.log("No user data found in localStorage.");
    return false;
};

/**
 * Handles user logout by clearing localStorage and redirecting to the homepage.
 */
export const HandleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("User logged out. Local storage cleared.");
    // Redirect to homepage or any other page after logout
    window.location.href = '/HomePage'; // Adjust path if necessary
};
