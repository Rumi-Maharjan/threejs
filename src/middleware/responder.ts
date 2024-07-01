export const responder = (ok: boolean, message: string, data?: any[]) => {
    return {
        ok,
        message,
        data,
    };
};
    export const errorLog = (error: any, res: any) => {
        console.log(error);
        res.status(500).json(responder(false, "Internal server error"));
    };
