const fs = require ('fs');

const mergeValues = (values, content) => {
    // Cycle over the keys and replace all the keys with the values from the values object
    for (let key in values) {
        content = content.replace (`{{ ${key} }}`, values[key]);
    }
    return content;
};

const view = (templateName, values, response) => {
    
    // Read from the template file
    let fileContent = fs.readFileSync ('./views/' + templateName + '.html', { encoding: 'utf8'});
    // Insert values into the content 
    fileContent = mergeValues (values, fileContent);
    // Write out the content to the response 
    response.write (fileContent); 
};

module.exports.view = view; 