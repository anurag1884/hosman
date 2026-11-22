/* (C)2026 */
package hosman.request.profile;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PrivilegedEditProfileRequest(
        @Valid @NotEmpty String username, @Valid @NotNull EditProfileRequest details) {}
