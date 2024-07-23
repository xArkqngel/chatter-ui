const extractErrorMessage = (error: any) => {
    const errorMessage = error.graphQLErrors[0]?.extensions?.originalError?.message;
    if (!errorMessage) {
        return;
    }
    if (Array.isArray(errorMessage)) {
        return formatError(errorMessage[0]);
    } else {
        return formatError(errorMessage);
    }
}

const formatError = (error: string) => {
    return error.charAt(0).toUpperCase() + error.slice(1);
}


export { extractErrorMessage };