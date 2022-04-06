export const numberify = <T>(input: T) => {
    const inputNumberified: Record<keyof T, number> = Object.entries(input).reduce((obj, entry) => {
        const [key, value] = entry;
        return {...obj, [key]: Number(value)};
    }, {} as Record<keyof T, number>); 
    return inputNumberified;
}