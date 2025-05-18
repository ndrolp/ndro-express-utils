import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export function Validate(schema: Joi.ObjectSchema) {
    return function(
        _target: object,
        _propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function(
            req: Request,
            res: Response,
            next: NextFunction,
        ) {
            try {
                await schema.validateAsync(req.body);
            } catch (error) {
                return res.status(422).json(error);
            }

            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
