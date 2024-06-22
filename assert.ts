export { assert };

const assert = <T>(
    value: T | null | undefined,
    errorMessage: string = "unexpectedly falsy, empty, null, or undefined",
): NonNullable<T> => {
    if (
        value == null || // == also captures undefined
        value === "" ||
        !value ||
        (typeof value === "number" && isNaN(value))
    ) {
        throw new Error(errorMessage);
    }
    return value;
};
