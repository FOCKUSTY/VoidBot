const { format } = require('date-fns');

let dateForm;

const dateCheck = (date, form='dd.MM.yyyy HH:mm:ss') =>
{
    try {
        dateForm = new Date(date);
        dateForm = format(dateForm, `${form}`);
        return dateForm;
    } catch (err) {
        console.log(err)
    }
};

module.exports =
{
    dateCheck
}