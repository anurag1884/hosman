Adding **Departments**, **Medicines**, **Beds**, **Blood Banks**, **Donors**, **Notifications**, and **ShiftAssignments** turns your model from a basic appointment/user directory into a genuine operational core for an inpatient + outpatient hospital.

To keep it clean, maintainable, and easy to wire up to Vanilla JS dashboards later, group the schema into **five logical domains** with clear IDs, statuses, and relationships.

---

### 1. Identity, Roles & Shift Rosters

* **Account**
* `id`, `username`, `passwordHash`, `role` (`ADMIN | DOCTOR | PATIENT | RECEPTIONIST | NURSE | PHARMACIST | LABORATORIST`), `isActive` (default `true`), `preferredLanguage?`, `lastLoginAt?`, `createdAt`


* **Profile** (linked `1:1` to `Account`)
* `firstName`, `middleName?`, `lastName`, `gender`, `dob`, `address`, `email`, `phone`


* **Staff** (linked `1:1` to `Account` for non-patient roles)
* `employeeId`, `licenseNumber?`, `yearsOfExperience`, `defaultShiftStart?`, `defaultShiftEnd?`, `status` (`AVAILABLE | SUSPENDED | ON_LEAVE | OFF_SHIFT`)


* **MedicalStaff** (extends `Staff` for `DOCTOR`, `NURSE`, `PHARMACIST`, `LABORATORIST`)
* `departmentId` (`Department`), `specialization?`, `qualification?`, `assignedWardId?` (`Ward`, optional—useful for nurses)


* **DoctorProfile** (extends `MedicalStaff` for `DOCTOR`)
* `consultationFee`


* **PatientProfile** (extends `Account` + `Profile` for `PATIENT`)
* `bloodGroup`, `allergies?`, `emergencyContactName?`, `emergencyContactRelation?`, `emergencyContactPhone?`, `primaryDoctorId?` (`Account`), `insuranceProvider?`, `insurancePolicyNo?`


* **ShiftAssignment**
* `id`, `staffId` (`Account`), `departmentId?` (`Department`), `wardId?` (`Ward`), `shiftDate`, `startTime`, `endTime`, `shiftType` (`MORNING | EVENING | NIGHT | ON_CALL`), `status` (`SCHEDULED | IN_PROGRESS | COMPLETED | MISSED | CANCELLED`), `notes?`



---

### 2. Departments, Wards & Bed Management

* **Department**
* `id`, `code` (e.g., `CARD`, `ORTH`, `EMER`, `PED`), `departmentName`, `headDoctorId?` (`Account`), `floor?`, `description?`, `isActive`


* **Ward**
* `id`, `departmentId?` (`Department`), `name` (e.g., `General Ward A`, `ICU-1`, `Maternity`), `wardType` (`GENERAL | PRIVATE | ICU | HDU | EMERGENCY | MATERNITY`), `floor?`, `isActive`


* **Bed**
* `id`, `wardId` (`Ward`), `bedNumber` (e.g., `A-01`, `ICU-04`), `pricePerDay`, `status` (`AVAILABLE | OCCUPIED | MAINTENANCE | RESERVED`), `patientId?` (`Account`, non-null when occupied), `admittedAt?`, `notes?`
* *Design note:* Track explicit `status` alongside `patientId` so a bed undergoing cleaning/maintenance isn't mistakenly treated as ready for a new admission.



---

### 3. Appointments & Clinical Flow

* **Appointment**
* `id`, `patientId` (`Account`), `doctorId` (`Account`), `departmentId?` (`Department`), `visitType` (`IN_PERSON | TELEHEALTH | FOLLOW_UP | WALK_IN`), `descriptionOrSymptoms`, `scheduledAt`, `durationMinutes?`, `status` (`PENDING | CONFIRMED | IN_CONSULTATION | COMPLETED | CANCELLED | NO_SHOW`), `createdAt`, `updatedAt`



---

### 4. Pharmacy & Blood Bank

* **Medicine**
* `id`, `name`, `genericName`, `category` (e.g., `Antibiotic`, `Analgesic`, `Antihypertensive`), `manufacturer`, `batchNumber`, `unit` (e.g., `tablet`, `vial`, `ml`), `price`, `quantity` (current stock count), `reorderLevel`, `expiryDate`, `description?`, `sideEffects?`
* *Design note:* If the same medicine arrives in multiple batches or expiry dates, either store each batch as a `Medicine` stock entry or split `MedicineCatalog` (item metadata + `reorderLevel`) from `MedicineBatch` (`batchNumber`, `quantity`, `expiryDate`, `price`). Keeping `batchNumber`, `quantity`, and `expiryDate` on `Medicine` works fine for a straightforward hospital inventory if each batch is its own row.


* **BloodBank**
* `id`, `bloodGroup` (`A+ | A- | B+ | B- | AB+ | AB- | O+ | O-`), `units` (available units), `componentType?` (`WHOLE_BLOOD | RBC | PLASMA | PLATELETS`), `criticalThreshold` (e.g., `5` units for low-stock alerts), `updatedAt`
* *Design note:* Storing `units` per `bloodGroup` (and optionally `componentType`) gives instant summary counts for the dashboard, while `Donor` logs each donation event.


* **Donor**
* `id`, `name`, `bloodGroup`, `units`, `phone`, `email?`, `donatedAt`, `status` (`SCREENING | APPROVED | DEFERRED | COMPLETED`), `notes?`



---

### 5. System Notifications

* **Notification**
* `id`, `recipientId` (`Account`), `title?`, `message`, `category` (`APPOINTMENT | SHIFT | BED | PHARMACY | BLOOD_BANK | SYSTEM`), `relatedEntityType?`, `relatedEntityId?`, `isRead` (default `false`), `createdAt`



---

### A Few Practical Schema Tips Before Building Dashboards

1. **Use consistent IDs & foreign keys (`*Id`):** Having `patientId`, `doctorId`, `wardId`, `departmentId`, and `recipientId` makes joining data in API responses and filtering tables in Vanilla JS predictable.
2. **Computed vs. stored counts:** Keep `quantity` (on `Medicine`) and `units` (on `BloodBank`) as explicit numbers so dashboards can flag low stock (`quantity <= reorderLevel` or `units <= criticalThreshold`) and near-expiry batches (`expiryDate` within 30–60 days) immediately.
3. **Soft deactivation over hard deletes:** Prefer `isActive = false` or status transitions (`CANCELLED`, `MAINTENANCE`) rather than deleting clinical, shift, or donor records.

When you're ready, share your dashboard template and let me know which of the seven role dashboards you want to build first!