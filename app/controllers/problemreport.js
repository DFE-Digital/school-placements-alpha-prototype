// When a GET request is made to the '/problemreport' route,
// render the Nunchucks template found at './view/problemreport/index.njk'.
exports.problemreport_get = (req, res) => {
    res.render('problemreport/index');
}  