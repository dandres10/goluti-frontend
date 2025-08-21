export function saveToSessionStorage(key: string, value: any) {
    if (typeof window !== "undefined") {
        try {
            const serializedValue = JSON.stringify(value);
            sessionStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error("Error al guardar en sessionStorage", error);
        }
    }
}

export function getFromSessionStorage(key: string) {

    try {
        const serializedValue = sessionStorage.getItem(key);
        return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
        return null;
    }


}