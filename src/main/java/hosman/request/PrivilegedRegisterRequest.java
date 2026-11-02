package hosman.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import hosman.enums.Role;

public record PrivilegedRegisterRequest(
                @NotNull @Valid RegisterRequest details,
                @NotNull Role role) {
}
