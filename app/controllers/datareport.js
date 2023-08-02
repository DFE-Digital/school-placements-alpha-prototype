// We need the list of primary and secodary subjects from this helper file that Simon created
const subjectHelper = require('../helpers/subjects')

// When a GET request is made to the '/datareport' route,
// render the Nunjucks template found at './view/datareport/index.njk'.
exports.datareport_get = (req, res) => {
    res.render('datareport/index');
}  

// When a GET request is made to the '/datareport/reasonnontoparticipate' route,
// render the Nunjucks template found at './views/datareport/reasonnotparticipate.njk'.
exports.reasonnotparticipate_get = (req, res) => {
    res.render('datareport/reasonnotparticipate');
}

// When a GET request is made to the '/datareport/challengesmanagingitt' route,
// render the Nunjucks template found at './views/datareport/challengesmanagingitt.njk'.
exports.challengesmanagingitt_get = (req, res) => {
    res.render('datareport/challengesmanagingitt');
}

// When a GET request is made to the '/datareport/enoughmentors' route,
// render the Nunjucks template found at './views/datareport/enoughmentors.njk'.
exports.enoughmentors_get = (req, res) => {
    res.render('datareport/enoughmentors');
} 

// When a GET request is made to the '/datareport/secondarysubjectsdifficulty' route,
// render the Nunjucks template found at './views/datareport/secondarysubjectsdifficult.njk'.
// Also ensure that we send a list of the secondary subjects in subjectOptions variable here
exports.secondarysubjectsdifficulty_get = (req, res) => {
    const subjectOptions = subjectHelper.getSubjectOptions('secondary');
    //console.log(subjectOptions); // add this line
    res.render('datareport/secondarysubjectsdifficulty', {
        subjectOptions
    });
}

// When a GET request is made to the '/datareport/primarysubjectsdifficulty' route,
// render the Nunjucks template found at './views/datareport/primarysubjectsdifficult.njk'.
// Also ensure that we send a list of the primary subjects in subjectOptions variable
exports.primarysubjectsdifficulty_get = (req, res) => {
    const subjectOptions = subjectHelper.getSubjectOptions('primary');
    //console.log(subjectOptions); // add this line
    res.render('datareport/primarysubjectsdifficulty', {
        subjectOptions
    });
}

// When a GET request is made to the '/datareport/surplus' route,
// render the Nunjucks template found at './views/datareport/surplus.njk'.
exports.surplus_get = (req, res) => {
    res.render('datareport/surplus');
} 

// When a GET request is made to the '/datareport/surplusquestion' route,
// render the Nunjucks template found at './views/datareport/surplusquestion.njk'.
exports.surplusquestion_get = (req, res) => {
    res.render('datareport/surplusquestion');
} 

// When a GET request is made to the '/datareport/surplussubject' route,
// render the Nunjucks template found at './views/datareport/surplussubject.njk'.
exports.surplussubject_get = (req, res) => {
    const subjectOptions = subjectHelper.getSubjectOptions('secondary');
    //console.log(subjectOptions); // add this line
    res.render('datareport/surplussubject', {
        subjectOptions
    });
}

// When a GET request is made to the '/datareport/shortage' route,
// render the Nunjucks template found at './views/datareport/shortage.njk'.
exports.shortage_get = (req, res) => {
    res.render('datareport/shortage');
} 

// When a GET request is made to the '/datareport/shortagequestion' route,
// render the Nunjucks template found at './views/datareport/shortagequestion.njk'.
exports.shortagequestion_get = (req, res) => {
    res.render('datareport/shortagequestion');
} 

// When a GET request is made to the '/datareport/shortagesubject' route,
// render the Nunjucks template found at './views/datareport/shortagesubject.njk'.
exports.shortagesubject_get = (req, res) => {
    const subjectOptions = subjectHelper.getSubjectOptions('secondary');
    //console.log(subjectOptions); // add this line
    res.render('datareport/shortagesubject', {
        subjectOptions
    });
}

// When a GET request is made to the '/datareport/endreport' route,
// render the Nunjucks template found at './views/datareport/endreport.njk'.
exports.endreport_get = (req, res) => {
    res.render('datareport/endreport');
} 


// Allow our default template to be rendered so we can see what it looks like
// just put /datareport/template in the path
exports.template_get = (req, res) => {
    res.render('datareport/template');
}  