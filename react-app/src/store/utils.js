export const normalize = (data) => {
    return data.reduce((acc, datum) => {
        acc[datum.id] = datum;
        return acc;
    }, {});
}
