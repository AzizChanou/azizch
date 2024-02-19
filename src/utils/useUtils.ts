export default function useUtils() {

    function truncateText(text: string, maxLength: number): string {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    }

    return {
        truncateText
    }
}