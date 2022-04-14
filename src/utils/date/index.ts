export const getRelativeDate = (date: string) => {
    const [ givenDate, givenTime ] = date.split(' ');
    const today = new Date();
    const yesterday = getYesterday();

    const todayDate = getDate(today);
    const yesterdayDate = getDate(yesterday);

    console.log(givenDate, todayDate, yesterdayDate);

    switch(true){
        case todayDate === givenDate: 
        return `Hoy, ${givenTime}`;

        case yesterdayDate === givenDate:
        return `Ayer, ${givenTime}`;

        default:
        return date;
    }
}

const getYesterday = () => {
    const now = new Date();
    const nowDate = now.getDate();
    now.setDate(nowDate - 1);

    return now;
}

const getDate = (date: Date) => date.toLocaleString('en-GB').split(' ')[0];