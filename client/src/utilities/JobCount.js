export const getApplicationStats = (applications) => {
    return applications.reduce((acc, app) => {
        acc.Total++;
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
    }, { Total: 0 });
};
