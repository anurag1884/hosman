package hosman.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record PrivilegedEditProfileRequest(
    @Valid @NotNull  EditProfileRequest profileRequest
    ) {
    }
