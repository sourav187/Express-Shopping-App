exports.pageNotFound = (req, res, next) => {
    //res.status(404).send('<h1>page Not Found</h1>');
    res.status(404).render('404', {
        title: 'Page Not Found',
        path: '/',
    });
};