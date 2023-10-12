'use strict';

const { Contract } = require('fabric-contract-api');

class InsuranceContract extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');

        // Definir algunos contratos de seguro de muestra
        const insurances = [
            {
                insuranceId: 'INS-001',
                policyDetails: {
                    policyNumber: 'P-001',
                    insuredName: 'John Doe',
                    coverageAmount: 100000,
                    premiumAmount: 1000,
                    startDate: '2021-01-01',
                    endDate: '2022-01-01'
                },
                status: 'Active',
                claims: []
            },
            {
                insuranceId: 'INS-002',
                policyDetails: {
                    policyNumber: 'P-002',
                    insuredName: 'Jane Doe',
                    coverageAmount: 50000,
                    premiumAmount: 500,
                    startDate: '2021-06-01',
                    endDate: '2022-06-01'
                },
                status: 'Active',
                claims: []
            }
        ];

        // Añadir los contratos de seguro al ledger
        for (let i = 0; i < insurances.length; i++) {
            await ctx.stub.putState(
                insurances[i].insuranceId,
                Buffer.from(JSON.stringify(insurances[i]))
            );
            console.info(`Added <--> ${insurances[i].insuranceId}`);
        }

        console.info('============= END : Initialize Ledger ===========');
    }

    // Función para crear un nuevo contrato de seguro
    async createInsurance(ctx, insuranceId, policyDetails) {
        console.info('============= START : Create Insurance ===========');

        const insurance = {
            policyDetails,
            status: 'Active',
            claims: [],
        };

        await ctx.stub.putState(insuranceId, Buffer.from(JSON.stringify(insurance)));
        console.info('============= END : Create Insurance ===========');
    }

    // Función para registrar una reclamación
    async fileClaim(ctx, insuranceId, claimDetails) {
        console.info('============= START : File Claim ===========');

        const insuranceAsBytes = await ctx.stub.getState(insuranceId);
        if (!insuranceAsBytes || insuranceAsBytes.length === 0) {
            throw new Error(`${insuranceId} does not exist`);
        }

        const insurance = JSON.parse(insuranceAsBytes.toString());
        insurance.claims.push(claimDetails);

        await ctx.stub.putState(insuranceId, Buffer.from(JSON.stringify(insurance)));
        console.info('============= END : File Claim ===========');
    }

    // Función para evaluar una reclamación
    async evaluateClaim(ctx, insuranceId, claimIndex, evaluationResult) {
        console.info('============= START : Evaluate Claim ===========');

        const insuranceAsBytes = await ctx.stub.getState(insuranceId);
        if (!insuranceAsBytes || insuranceAsBytes.length === 0) {
            throw new Error(`${insuranceId} does not exist`);
        }

        const insurance = JSON.parse(insuranceAsBytes.toString());
        insurance.claims[claimIndex].evaluationResult = evaluationResult;

        await ctx.stub.putState(insuranceId, Buffer.from(JSON.stringify(insurance)));
        console.info('============= END : Evaluate Claim ===========');
    }

    // Función para pagar una reclamación
    async payClaim(ctx, insuranceId, claimIndex, paymentAmount) {
        console.info('============= START : Pay Claim ===========');

        const insuranceAsBytes = await ctx.stub.getState(insuranceId);
        if (!insuranceAsBytes || insuranceAsBytes.length === 0) {
            throw new Error(`${insuranceId} does not exist`);
        }

        const insurance = JSON.parse(insuranceAsBytes.toString());
        insurance.claims[claimIndex].paymentAmount = paymentAmount;

        await ctx.stub.putState(insuranceId, Buffer.from(JSON.stringify(insurance)));
        console.info('============= END : Pay Claim ===========');
    }

    // Función para obtener los detalles de un contrato de seguro
    async getInsurance(ctx, insuranceId) {
        console.info('============= START : Get Insurance ===========');

        const insuranceAsBytes = await ctx.stub.getState(insuranceId);
        if (!insuranceAsBytes || insuranceAsBytes.length === 0) {
            throw new Error(`${insuranceId} does not exist`);
        }

        console.info(insuranceAsBytes.toString());
        console.info('============= END : Get Insurance ===========');
        return insuranceAsBytes.toString();
    }

}

module.exports = InsuranceContract;
