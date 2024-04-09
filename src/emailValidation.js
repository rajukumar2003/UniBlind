export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.christuniversity\.in$/; // Corrected regex
    if (!emailRegex.test(email)) {
        return {
            valid: false,
            message: "Only Christ University email addresses are allowed."
        };
    }
    return { valid: true };
}

// Path: UniBlind/src/Components/SignupPanel.jsx
