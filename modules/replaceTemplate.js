module.exports = (temp, recipe) => {
    let output = temp.replace(/{%NAME%}/g, recipe.name); // we don't want to manipulate directly the data being passed in, so we create a variable with "let" that we can keep changing.
    // ^making it a regex with backslashes and adding g flag makes it global; will replace ALL instances, not just first one found.
    output = output.replace(/{%ID%}/g, recipe.id);
    output = output.replace(/{%IMAGE%}/g, recipe.image);
    output = output.replace(/{%RECIPELINK%}/g, recipe.recipeLink);
    output = output.replace(/{%EMOJI%}/g, recipe.emoji);
    output = output.replace(/{%INGREDIENTS%}/g, recipe.ingredients);
    output = output.replace(/{%SHORTDESC%}/g, recipe.shortDescription);
    output = output.replace(/{%LONGDESC%}/g, recipe.longDescription);

    return output;
}