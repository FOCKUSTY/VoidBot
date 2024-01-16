const
{
    format
} = require('date-fns');

let dateForm;

const dateCheck = (date, form='dd.MM.yyyy HH:mm:ss') =>
{
    dateForm = new Date(date);
    dateForm = format(dateForm, `${form}`);
    return dateForm;
};

module.exports =
{
    dateCheck
}