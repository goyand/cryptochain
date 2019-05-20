const Transaction = require('../wallet/transaction');

class TransactionMiner {
    constructor({ blockchain, transactionPool, pubsub, wallet }) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.pubsub = pubsub;
        this.wallet = wallet;
    }

    mineTransactions() {
        // get transaction pool's valid transactions
        const validTransactions = this.transactionPool.validTransactions();

        // now mining occurs even if the transaction pool is empty....

        // generate the miner's reward
        validTransactions.push(
            Transaction.rewardTransaction({ minerWallet: this.wallet })
        )

        // add a block consisting of these transactions to the blockchain
        this.blockchain.addBlock({ data: validTransactions });

        // broadcast the updated blockchain
        this.pubsub.broadcastChain();

        // clear the pool
        this.transactionPool.clear();
    }
}

module.exports = TransactionMiner;