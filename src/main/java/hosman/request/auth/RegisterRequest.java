/* (C)2026 */
package hosman.request.auth;

import hosman.request.profile.EditProfileRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequest(
        @NotBlank String username,
        @NotBlank String password,
        @NotNull EditProfileRequest details) {}
