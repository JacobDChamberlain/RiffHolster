const sequelizeErrorHandler = ( error ) => {
    const errorMessages = { messages: [] };

    if ( error.name.includes('Sequelize')) {
        if ( error.errors ) {
            error.errors.forEach( err => {
                errorMessages.messages.push({ message: err.message, type: err.type });
            });
        } else if ( error.original ) {
            errorMessages.messages.push({ message: err.original, type: 'Database Error' });
        }
    } else {
        errorMessages.messages.push({ message: 'An unexpected error occured.', type: 'Unexpected Error' });
    }
    return errorMessages;
}


module.exports = { sequelizeErrorHandler };