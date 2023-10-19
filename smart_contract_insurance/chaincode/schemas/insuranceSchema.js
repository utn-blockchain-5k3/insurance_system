// insuranceSchema.js

const Joi = require('joi');

const insuranceSchema = Joi.object({
    insuranceId: Joi.string().required(),
    policyDetails: Joi.object({
        policyNumber: Joi.string().required(),
        insuredName: Joi.string().required(),
        coverageAmount: Joi.number().required(),
        premiumAmount: Joi.number().required(),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required(),
    }).required(),
    status: Joi.string().valid('Active', 'Inactive').required(),
    claims: Joi.array().items(
        Joi.object({
            claimDetails: Joi.object().required(),
            evaluationResult: Joi.string().optional(),
            paymentAmount: Joi.number().optional(),
        })
    ).required(),
});

module.exports = insuranceSchema;
