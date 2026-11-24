/* (C)2026 */
package hosman.enums;

import hosman.except.FieldException;

public class EnumParser {

    public static <T extends Enum<T>> T parseEnum(Class<T> enumClass, String name, String target)
            throws FieldException {
        try {
            return Enum.valueOf(enumClass, name);
        } catch (IllegalArgumentException e) {
            throw new FieldException(target + " '" + name + "' is invalid.");
        }
    }
}
