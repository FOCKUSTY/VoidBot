const loadOptions = (yourOptions, interaction) =>
{
    const options = new Map();
    const finiteOptions = `${interaction.payload}`.split('\\\\//', yourOptions.length);
    const keys = [];

    for(let option of yourOptions) options.set(`${option}`, null);

    let count = 0;

    options.forEach( (value, key) => keys.push(key) );

    for(let option of finiteOptions)
    {
        options.set(keys[count], option);
        
        count+=1;
    };

    return options;
}

module.exports =
{
    loadOptions
}