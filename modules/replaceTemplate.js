const fs = require('fs');
// const tempIngredientLi = require('../templates/template-ingredients.html');
// const tempIngredientLi = fs.readFileSync("../templates/template-ingredients.html", 'utf-8');


module.exports = (temp, recipe) => {
    const ingredientLi = "<li>{%INGREDIENT%}</li>";
    const ingredientsHtml = recipe.ingredients.map(el => ingredientLi.replace(/{%INGREDIENT%}/g, el)).join('');
    // cardsHtml but for making LIs for list of ingredients. Map through 
    let output = temp.replace(/{%NAME%}/g, recipe.name); // we don't want to manipulate directly the data being passed in, so we create a variable with "let" that we can keep changing.
    // ^making it a regex with backslashes and adding g flag makes it global; will replace ALL instances, not just first one found.
    output = output.replace(/{%ID%}/g, recipe.id);
    output = output.replace(/{%IMAGE%}/g, recipe.image);
    output = output.replace(/{%RECIPELINK%}/g, recipe.recipeLink);
    output = output.replace(/{%EMOJI%}/g, recipe.emoji);
    output = output.replace(/{%SHORTDESC%}/g, recipe.shortDescription);
    output = output.replace(/{%LONGDESC%}/g, recipe.longDescription);
    output = output.replace(/{%INGREDIENT_LI%}/g, ingredientsHtml);

    return output;
}

// const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
            //  (array we're mapping through).map(array item => what you want to do to it)