export const numberWithThousands = (x: number) => x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
export const numberWithThousandsNbsp = (x: number) => x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, "&nbsp;");

/**
 * Получает случайный элемент из массива и удаляет его из массива.
 * @param arr - Массив, из которого нужно получить и удалить случайный элемент.
 * @returns Случайный элемент массива или undefined, если массив пуст.
 */
export const getRandomElementAndRemove = <T>(arr: T[]): T | undefined => {
    if (arr.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr.splice(randomIndex, 1)[0];
};

