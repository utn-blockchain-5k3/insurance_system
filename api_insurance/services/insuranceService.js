const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const ccpPath = path.resolve(__dirname, '..', 'connection-profile.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
const walletPath = path.join(process.cwd(), 'wallet');

const connectToNetwork = async () => {
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'api_client', discovery: { enabled: true, asLocalhost: true } });
    const network = await gateway.getNetwork('default');
    const contract = network.getContract('smart_contract_insurance');
    return { gateway, contract };
};

const initLedger = async () => {
    try {
        const { gateway, contract } = await connectToNetwork();
        await contract.submitTransaction('initLedger');
        await gateway.disconnect();
        return 'Ledger Initialized';
    } catch (error) {
        throw new Error(`Failed to Initialize Ledger: ${error}`);
    }
};

const createInsurance = async (insuranceId, policyDetails) => {
    try {
        const { gateway, contract } = await connectToNetwork();
        await contract.submitTransaction('createInsurance', insuranceId, policyDetails);
        await gateway.disconnect();
        return 'Insurance Created';
    } catch (error) {
        throw new Error(`Failed to Create Insurance: ${error}`);
    }
};

const fileClaim = async (insuranceId, claimDetails) => {
    try {
        const { gateway, contract } = await connectToNetwork();
        await contract.submitTransaction('fileClaim', insuranceId, claimDetails);
        await gateway.disconnect();
        return 'Claim Filed';
    } catch (error) {
        throw new Error(`Failed to File Claim: ${error}`);
    }
};

const evaluateClaim = async (insuranceId, claimIndex, evaluationResult) => {
    try {
        const { gateway, contract } = await connectToNetwork();
        await contract.submitTransaction('evaluateClaim', insuranceId, claimIndex, evaluationResult);
        await gateway.disconnect();
        return 'Claim Evaluated';
    } catch (error) {
        throw new Error(`Failed to Evaluate Claim: ${error}`);
    }
};

const payClaim = async (insuranceId, claimIndex, paymentAmount) => {
    try {
        const { gateway, contract } = await connectToNetwork();
        await contract.submitTransaction('payClaim', insuranceId, claimIndex, paymentAmount);
        await gateway.disconnect();
        return 'Claim Paid';
    } catch (error) {
        throw new Error(`Failed to Pay Claim: ${error}`);
    }
};

const getInsurance = async (insuranceId) => {
    try {
        const { gateway, contract } = await connectToNetwork();
        const result = await contract.evaluateTransaction('getInsurance', insuranceId);
        await gateway.disconnect();
        return result.toString();
    } catch (error) {
        throw new Error(`Failed to Get Insurance: ${error}`);
    }
};

module.exports = {
    initLedger,
    createInsurance,
    fileClaim,
    evaluateClaim,
    payClaim,
    getInsurance,
};
