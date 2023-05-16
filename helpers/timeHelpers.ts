export const parseTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
};