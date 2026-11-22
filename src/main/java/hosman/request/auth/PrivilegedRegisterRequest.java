/* (C)2026 */
package hosman.request.auth;

import hosman.enums.Role;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record PrivilegedRegisterRequest(
        @NotNull @Valid RegisterRequest credentials, @NotNull Role role) {}
