import { useFocusEffect } from "@react-navigation/native";
import { FlatList, HStack, Text, useToast, VStack } from "native-base";
import { useCallback, useState } from "react";
import { Loading } from "../components/Loading";
import { Header } from "../components/Transactions/Header";
import { Transaction } from "../components/Transactions/Transaction";
import { useTransactions } from "../hooks/useTransactions";
import { api } from "../services/api";

export function Transactions() {
  const { 
    fetchTransactions, 
    totalPaid,
    totalNotPaid,
    isLoading, 
    totalSpendingMonth, 
    transactions 
  } = useTransactions()
  const [refreshing, setRefreshing] = useState(false);

  const toast = useToast();

  useFocusEffect(useCallback(() => {
    fetchTransactions()
  }, [fetchTransactions]))

  async function onUpdatePaid(id: string) {
    try {
      await api.post(`/transactions/paid/${id}`)
      fetchTransactions()
    } catch (err) {
      console.log(err)
      toast.show({
        title: 'Não foi possível atualizar!',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function onDeleteTransaction(id: string) {
    try {
      await api.delete(`/transactions/${id}`)
      fetchTransactions()
    } catch (err) {
      console.log(err)
      toast.show({
        title: 'Não foi possível deletar!',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <VStack flex={1}>
      <Header totalSpendingMonth={totalSpendingMonth} totalNotPaid={totalNotPaid} totalPaid={totalPaid} />

      <VStack flex={1} p={5} mt={2} space={2}>
        <HStack>
          <Text bold color="gray.700" fontSize="lg">Despesas</Text>
        </HStack>

        {
          isLoading ? (
            <Loading />
          ) : (
            <FlatList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Transaction 
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    date={item.dueDate}
                    price={Number(item.price) / 100} 
                    type={item.type} 
                    category={item.category.name}
                    description={item.description}
                    repeatFixed={item.repeatFixed}
                    paid={item.paid}
                    onUpdatePaid={onUpdatePaid}
                    onDeleteTransaction={onDeleteTransaction}
                  />
              )}
              showsVerticalScrollIndicator={true}
              _contentContainerStyle={{ pb: 20 }}
            />
          )
       }
      </VStack>
    </VStack>
  )
}