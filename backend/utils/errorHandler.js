const sequelizeErrorHandler = ( error, messages ) => {
    if ( error.name.includes('Sequelize')) {
        if ( error.errors ) {
            error.errors.forEach( err => {
                messages.push( err.message );
            });
        } else if ( error.original ) {
            messages.push( err.original );
        }
    } else {
        messages.push( 'An unexpected error occured.' );
    }
    return messages;
}


module.exports = { sequelizeErrorHandler };