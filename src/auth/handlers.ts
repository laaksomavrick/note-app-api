import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { Handler, response } from "../api";
import config from "../config";
import { Core } from "../core";
import { ForbiddenError, NotFoundError } from "../errors";
import { findByEmail } from "../users/repository";

/**
 * Issues a JWT for a valid username and password.
 */
export const create = ({ db, crypto }: Core): Handler => {
    return async (
        {
            body: {
                auth: { email, password },
            },
        }: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const user = await findByEmail(db, email);
            if (!user) {
                // todo: way to abstract the err details?
                throw new NotFoundError([{ param: "user", msg: "The user was not found." }]);
            }

            const authorized = await crypto.compare(password, user.password);
            if (!authorized) {
                throw new ForbiddenError([{ param: "password", msg: "The provided password was incorrect." }]);
            }

            // todo store these
            // todo service for signing and checking against stored
            // todo tests for above fns
            const token = sign({ id: user.id }, config.get("secret.jwt"));
            response(res, { token });
        } catch (error) {
            next(error);
        }
    };
};
