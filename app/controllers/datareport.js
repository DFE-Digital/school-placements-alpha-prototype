// When a GET request is made to the '/datareport' route,
// render the Nunjucks template found at './view/datareport/index.njk'.
exports.datareport_get = (req, res) => {
    res.render('datareport/index');
}  

// Allow our template to be rendered so you can see how it looks like
// just put /datareport/template
exports.template_get = (req, res) => {
    res.render('datareport/template');
}  

// When a GET request is made to the '/datareport/biggestchallenge' route,
// render the Nunjucks template found at './views/datareport/biggestchallenge.njk'.
exports.biggestchallenge_get = (req, res) => {
    res.render('datareport/biggestchallenge');
}