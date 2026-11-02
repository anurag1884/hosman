package hosman.request;

public record EditProfileRequest(
            String firstName,
            String middleName,
            String lastName,
            String gender,
            String dateOfBirth,
            String address,
            String email,
            String phoneNumber) {
    }
