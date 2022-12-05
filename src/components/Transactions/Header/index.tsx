import { HStack, Icon, Text, VStack } from "native-base"
import { Check, Warning } from "phosphor-react-native"
import { formatPrice } from "../../../utils/FormatPrice"
import { ChangeMonth } from "./ChangeMonth"
import { IconRounded } from "./IconRounded"

interface HeaderProps {
  totalSpendingMonth: number
  totalPaid: number
  totalNotPaid: number
}

export function Header({ totalSpendingMonth, totalNotPaid, totalPaid }: HeaderProps) {
  const totalSpendingMonthFormatted = formatPrice(totalSpendingMonth)
  const totalPaidFormatted = formatPrice(totalPaid)
  const totalNotPaidFormatted = formatPrice(totalNotPaid)

  return (
    <VStack bgColor="orange.500" roundedBottomLeft="50" roundedBottomRight="50" pt={6}>
      <ChangeMonth title="Novembro/2022" />

      <VStack justifyContent="center" alignItems="center" mt={2}>
        <Text color="white">Total do mês</Text>
        <Text color="white" fontSize="2xl" bold>{totalSpendingMonthFormatted}</Text>
      </VStack>

      <HStack justifyContent="space-between" px={12} py={5} mb={12}>
        <HStack>
          <IconRounded icon={Check} opacity />
          <VStack ml={2}>
            <Text color="white">Pago</Text>
            <Text color="white" bold>{totalPaidFormatted}</Text>
          </VStack>
        </HStack>

        <HStack>
          <IconRounded icon={Warning} opacity />
          <VStack ml={2}>
            <Text color="white">A pagar</Text>
            <Text color="white" bold>{totalNotPaidFormatted}</Text>
          </VStack>
        </HStack>
      </HStack>
    </VStack>
  )
}