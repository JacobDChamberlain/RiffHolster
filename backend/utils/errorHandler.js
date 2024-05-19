const sequelizeErrorHandler = ( error ) => {
    const errorMessages = { messages: [] };
    if ( error.name.includes('Sequelize')) {
        if ( error.errors ) {
            error.errors.forEach( err => {
                errorMessages.messages.push( err.message );
            });
        } else if ( error.original ) {
            errorMessages.messages.push( error.original );
        }
    } else {
        errorMessages.messages.push( 'An unexpected error occurred.' );
    }
    return errorMessages;
}


module.exports = { sequelizeErrorHandler };