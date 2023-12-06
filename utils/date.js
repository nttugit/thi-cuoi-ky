export function convertToMySqlDate(dateStr) {
    // Split the input string into day, month, and year
    const dateComponents = dateStr.split('-');

    // Rearrange the components to create a MySQL-compatible date string
    const mysqlDateFormat = `${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`;
    return mysqlDateFormat;
}
