const bots = new Map();

const setBot = (name, boolean=true) =>
{
    bots.set(`${name}`, boolean);
};

const getBot = (name) =>
{
    return bots.get(`${name}`)
};

module.exports =
{
    getBot,
    setBot
};