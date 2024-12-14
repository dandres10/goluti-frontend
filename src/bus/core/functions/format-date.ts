import dayjs from 'dayjs';


export const formatDate = (date: string) => {
    const toDate = new Date(date);
    return dayjs(toDate).format('YYYY-MM-DD');
}