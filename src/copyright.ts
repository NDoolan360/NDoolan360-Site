export const replaceWithCurrentYear = (input: string, match: string): string => {
    return input.replace(match, new Date().getFullYear().toString());
};
