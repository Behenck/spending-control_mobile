import dayjs from "dayjs"
import { HStack, Text, VStack, Flex, Icon, useTheme, useDisclose, Actionsheet, Box, AlertDialog } from "native-base"
import { ArrowsClockwise, Article, Calendar, Check, CirclesFour, Clock, CurrencyDollar, DeviceMobileCamera, TrashSimple, WarningCircle, X } from "phosphor-react-native"
import { useState } from "react"
import { Pressable } from "react-native"
import { api } from "../../services/api"
import { formatPrice } from "../../utils/FormatPrice"
import { Button } from "../Button"
import { ButtonIcon } from "../ButtonIcon"
import { IconRounded } from "./Header/IconRounded"

interface TransactionProps {
  id: string
  title: string
  description: string
  category: string
  type: 'income' | 'outcome'
  paid?: boolean
  date: Date
  price: number
  repeat?: 'fixed' | 'repeat'
  repeatFixed?: boolean
  nRepeat: number
  actualRepetition?: number
  totalRepetitions?: number
  onUpdatePaid: (id: string, paid: boolean) => void
  onDeleteTransaction: (id: string) => void
}

export function Transaction({ 
  id, 
  price, 
  date, 
  title,
  paid = false, 
  description = "", 
  category,
  type, 
  repeat, 
  actualRepetition = 0, 
  totalRepetitions = 0,
  onUpdatePaid,
  onDeleteTransaction,
  repeatFixed = false,
}: TransactionProps) {
  const { colors } = useTheme();
  const overduePayment = dayjs(date).isBefore(dayjs()) && !paid
  const [isOpenAlertDialogToDeleteTransaction, setIsOpenAlertDialogToDeleteTransaction] = useState(false)
  const onCloseAlertDialogToDeleteTransaction = () => setIsOpenAlertDialogToDeleteTransaction(false);

  async function handleUpdatePaid() {
    onUpdatePaid(id, paid)
  }

  async function handleDeleteTransaction() {
    onDeleteTransaction(id)
  }

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  return (
    <HStack alignItems="center" space={2} mt={2}>
      <HStack rounded="full" bgColor="white" w={14} h={14} justifyContent="center" alignItems="center" shadow="1">
        <Pressable onPress={handleUpdatePaid}>
          { 
            !overduePayment ?
            <Icon 
              as={paid ? 
                  <Check color={colors.green[500]} weight="bold" size={30} /> 
                  : 
                  <Clock color={colors.yellow[500]} weight="bold" size={30} />} 
              color="white" 
            /> :
            <Icon as={<WarningCircle color={colors.red[500]} weight="bold" size={30} />} />
          }
        </Pressable>
      </HStack>

        <Flex flex={1}>
          <Pressable onPress={onOpen}>
            <HStack flex={1} bg="white" rounded="10" alignItems="center" justifyContent="space-between" py={3} px={4}>
              <HStack space={2} alignItems="center" justifyContent="space-between">
                <VStack>
                  <Text color="gray.700" bold fontSize="sm">{title}</Text>
                  <Text color="gray.300" fontSize={12}>{dayjs(date).format('DD/MM/YYYY')}</Text>
                </VStack>
              </HStack>

              <Flex align="flex-end">
                {
                  repeatFixed
                  ? 
                  (<Icon as={<ArrowsClockwise color={colors.gray[700]} size={16} />} />)
                  : nRepeat >= 0
                  ?
                  (<Text fontSize={12}>{actualRepetition}/{totalRepetitions}</Text>)
                  : ''
                }
                <HStack justifyContent="center" alignItems="center" space={2} mt={2}>
                  <Text bold color="gray.700">{formatPrice(price)}</Text>
                  <HStack rounded="full" bgColor={type === 'income' ? 'green.500' : 'red.500'} w={2} h={2} />
                </HStack>
              </Flex>
            </HStack>
          </Pressable>
        </Flex>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
            <VStack w="full" px={4} space={6}>
              <HStack justifyContent="space-between" alignItems="center" mb={2}>
                <Text fontSize="2xl" color="gray.700" bold>{title}</Text>
                <HStack>
                  <ButtonIcon icon={TrashSimple} onPress={() => setIsOpenAlertDialogToDeleteTransaction(!isOpenAlertDialogToDeleteTransaction)} color={colors.gray[700]} />
                </HStack>
              </HStack>
              <HStack alignItems="center" space={6}>
                <IconRounded icon={CurrencyDollar} />
                <Text color="gray.500" fontSize={18}>{formatPrice(price)}</Text>
              </HStack>
              <HStack alignItems="center" space={6}>
                <IconRounded icon={Calendar} bgColor={colors.blue[500]} />
                <Text color="gray.500" fontSize={18}>{dayjs(date).format('DD/MM/YYYY')}</Text>
              </HStack>
              {
                !!description &&
                <HStack alignItems="center" space={6}>
                  <IconRounded icon={Article} bgColor={colors.yellow[500]} />
                  <Text color="gray.500" fontSize={18}>{description}</Text>
                </HStack>
              }
              <HStack alignItems="center" space={6}>
                <IconRounded icon={CirclesFour} bgColor={colors.red[500]} />
                <Text color="gray.500" fontSize={18}>{category}</Text>
              </HStack>
              <HStack alignItems="center" space={6}>
                {
                  paid ?
                    type === 'income' ?
                      <>
                        <IconRounded icon={Check} bgColor={colors.green[500]} />
                        <Text color="gray.500" fontSize={18}>Você já recebeu esse valor.</Text>
                      </> 
                      :
                      <>
                        <IconRounded icon={Check} bgColor={colors.green[500]} />
                        <Text color="gray.500" fontSize={18}>Parabéns! Essa despesa está paga.</Text>
                      </>
                  :
                    type === 'outcome' ?
                      <>
                      <IconRounded icon={X} bgColor={colors.red[500]} />
                      <Text color="gray.500" fontSize={18}>Essa despesa ainda não foi paga.</Text>
                    </> 
                    :
                    <>
                      <IconRounded icon={X} bgColor={colors.red[500]} />
                      <Text color="gray.500" fontSize={18}>Você ainda não recebeu esse valor.</Text>
                    </>
                }
              </HStack>
              <Button 
                title={
                  `Marcar como ${paid ? type === 'income' ? 'não recebido' : 'não pago' : type === 'income' ? 'recebido' : 'pago'}`
                } 
                type="SUCCESS" 
                onPress={handleUpdatePaid}
              />
              <AlertDialog leastDestructiveRef={null} isOpen={isOpenAlertDialogToDeleteTransaction} onClose={onCloseAlertDialogToDeleteTransaction}>
                <AlertDialog.Content>
                  <AlertDialog.CloseButton />
                  <AlertDialog.Header fontSize="lg" fontWeight="bold">Deletar Despesa</AlertDialog.Header>
                  <AlertDialog.Body>
                    Tem certeza que deseja deletar essa despesa?
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <HStack flex={1}  space={2}>
                      <Button h={12} w={135} title="Cancelar" onPress={onCloseAlertDialogToDeleteTransaction} bgColor="gray.300" />
                      <Button h={12} w={135} title="Deletar" onPress={handleDeleteTransaction} bgColor="red.500" />
                    </HStack>
                  </AlertDialog.Footer>
                </AlertDialog.Content>
              </AlertDialog>
            </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </HStack>
  )
}