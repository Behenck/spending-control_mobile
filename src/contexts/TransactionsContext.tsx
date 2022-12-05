import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../services/api";

export interface Transaction {
  id: string
  title: string
  description: string
  price: number
  dueDate: Date
  paid: boolean
  type: "income" | "outcome"
  category: Category
  repeatFixed: boolean
  actualRepetition: number 
  totalRepetitions: number
}

interface Category {
  id: string
  name: string
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export interface TransactionsContexDataProps {
  transactions: Transaction[];
  categories: Category[];
  totalSpendingMonth: number;
  totalPaid: number
  totalNotPaid: number
  isLoading: boolean;
  fetchTransactions: () => Promise<void>;
  fetchCategories: () => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionsContexDataProps)

export function TransactionsContextProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalSpendingMonth, setTotalSpendingMonth] = useState(0)
  const [totalPaid, setTotalPaid] = useState(0)
  const [totalNotPaid, setTotalNotPaid] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    try {
      setIsLoading(true)

      const response = await api.get<Transaction[]>('/transactions', {
        params: {
          q: query
        }
      })
      setTransactions(response.data)

      const SpendingItemsTotal = response.data.reduce((total, item) => {
        return item.type === 'outcome' ? total + item.price / 100 : total
      }, 0)
      setTotalSpendingMonth(SpendingItemsTotal)

      const PaidItemsTotal = response.data.reduce((total, item) => {
        return item.type === 'outcome' && item.paid ? total + item.price / 100 : total
      }, 0)
      setTotalPaid(PaidItemsTotal)

      const NotPaidItemsTotal = response.data.reduce((total, item) => {
        return item.type === 'outcome' && !item.paid ? total + item.price / 100 : total
      }, 0)
      setTotalNotPaid(NotPaidItemsTotal)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.get<Category[]>('/categories')
      setCategories(response.data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <TransactionsContext.Provider value={{
      fetchTransactions,
      fetchCategories,
      transactions,
      categories,
      isLoading,
      totalSpendingMonth,
      totalPaid,
      totalNotPaid
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}