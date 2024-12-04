export const handleHttpError = (res, message = "Something happened", code = 403) => {
    res.status(code).send({ error: message });
    res.status(code).render('error', { error: message });
};