import { useContext } from 'react';

import { TransactionsContext, TransactionsContexDataProps } from '../contexts/TransactionsContext';

export function useTransactions(): TransactionsContexDataProps {
  const context = useContext(TransactionsContext);

  return context;
}