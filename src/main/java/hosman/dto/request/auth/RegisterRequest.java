/* (C)2026 */
package hosman.dto.request.auth;

import hosman.dto.request.edit.EditProfileRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequest(
        @NotBlank String username,
        @NotBlank String password,
        String role,
        @Valid @NotNull EditProfileRequest details,
        Boolean passwordCheck) {}
