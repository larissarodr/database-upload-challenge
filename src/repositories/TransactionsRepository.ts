import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    let totalOutcome = 0;
    let totalIncome = 0;

    const transactions = await this.find();
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += Number(transaction.value);
      } else {
        totalOutcome += Number(transaction.value);
      }
    });

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };
  }
}

export default TransactionsRepository;
