let developClient;

const setDevelopClient = async client =>
{
    developClient = await client;
}

const getDevelopClient = async client =>
{
    return await developClient;
};

module.exports =
{
    setDevelopClient,
    getDevelopClient
}