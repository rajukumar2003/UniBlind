export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.christuniversity\.in$/; // Corrected regex
    if (!emailRegex.test(email)) {
        return {
            valid: false,
            message: "Invalid email or not a .christuniversity.in domain"
        };
    }
    return { valid: true };
}

// Path: UniBlind/src/Components/SignupPanel.jsx