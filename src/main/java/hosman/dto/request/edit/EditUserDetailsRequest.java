/* (C)2026 */
package hosman.dto.request.edit;

public record EditUserDetailsRequest(
        String newUsername, String oldPassword, String newPassword, boolean passwordCheck) {}
