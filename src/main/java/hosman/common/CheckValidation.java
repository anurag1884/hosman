/* (C)2026 */
package hosman.common;

import hosman.except.FieldException;

public class CheckValidation {

    public static void checkUsername(String username) throws FieldException {

        if (!username.matches("[a-zA-Z][a-zA-Z0-9]*"))
            throw new FieldException("Username '" + username + "' is invalid.");
    }

    public static void checkPassword(String password) throws FieldException {

        if (password.length() < 8)
            throw new FieldException("Password must be at least 8 characters.");

        boolean letter = false, digit = false, special = false;
        for (int i = 0; i < password.length(); i++) {
            char ch = password.charAt(i);
            if (Character.isLetter(ch)) letter = true;
            else if (Character.isDigit(ch)) digit = true;
            else special = true;
        }

        if (!letter) throw new FieldException("Password must have at least one letter.");
        if (!digit) throw new FieldException("Password must have at least one digit");
        if (!special) throw new FieldException("Password must have at least one special character");
    }

    public static void checkName(String name, String target) throws FieldException {

        if (!name.matches("[a-zA-Z]+(?:[ '-][a-zA-Z]+)*"))
            throw new FieldException(target + " '" + name + "' is invalid.");
    }

    public static void checkEmail(String email) throws FieldException {

        if (!email.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z]{2,}"))
            throw new FieldException(
                    "Email '" + email + "' is invalid. Please enter a valid email.");
    }

    public static void checkPhoneNumber(String phone, String target) throws FieldException {

        if (!phone.matches("\\+?[0-9 ()-]{7,20}"))
            throw new FieldException(
                    target + " '" + phone + "' is invalid. Please enter a valid phone number.");
    }
}
