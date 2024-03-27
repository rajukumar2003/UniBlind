const functions = require('firebase-functions');
const admin = require('firebase-admin');
const z = require('zod');
const validator = require('validator');

exports.validateSignupData = functions.https.onCall(async (data, context) => {
    const { email, password } = data;
    const schema = z.object({
        email: z.string().refine(value => validator.isEmail(value) &&
            value.endsWith('.christuniversity.in'), {
            message: "Invalid email or not a .christuniversity.in domain"
        }),
        password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    });

    try {
        schema.parse({ email, password });
        return { valid: true }; // Data is valid
    } catch (error) {
        return { valid: false, error: error.errors[0].message }; // Return the first error
    }
});
