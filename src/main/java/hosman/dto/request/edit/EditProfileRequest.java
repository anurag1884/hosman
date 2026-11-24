/* (C)2026 */
package hosman.dto.request.edit;

import jakarta.validation.constraints.NotBlank;

public record EditProfileRequest(
        @NotBlank String firstName,
        String middleName,
        @NotBlank String lastName,
        @NotBlank String gender,
        @NotBlank String dob,
        @NotBlank String address,
        @NotBlank String email,
        @NotBlank String phone,
        @NotBlank String bloodGroup,
        String allergies,
        String emergencyContactName,
        String emergencyContactRelation,
        String emergencyContactPhone,
        String department,
        String qualification,
        String specialization,
        Integer yearsOfExperience) {}
