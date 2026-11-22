/* (C)2026 */
package hosman.request.profile;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

public record EditProfileRequest(
        @Valid @NotBlank String firstName,
        @Valid String middleName,
        @Valid @NotBlank String lastName,
        @Valid @NotBlank String gender,
        @Valid @NotBlank String dob,
        @Valid @NotBlank String address,
        @Valid @NotBlank String email,
        @Valid @NotBlank String phone,
        @Valid @NotBlank String bloodGroup,
        @Valid String allergies,
        @Valid String emergencyContactName,
        @Valid String emergencyContactRelation,
        @Valid String emergencyContactPhone,
        @Valid String department,
        @Valid String qualification,
        @Valid String specialization,
        @Valid Integer yearsOfExperience) {}
