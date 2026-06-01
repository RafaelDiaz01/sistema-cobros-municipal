export const cleanParams = (params) =>
    Object.fromEntries(
        Object.entries(params).filter(
            ([_, value]) =>
                value !== "" &&
                value !== null &&
                value !== undefined &&
                !(typeof value === "string" && value.trim() === "")
        )
    );