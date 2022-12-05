import { Center, FormControl, Text, VStack, Radio, HStack, Select, useToast, Checkbox, Icon } from "native-base";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { HeaderNew } from "../components/HeaderNew";
import { Input } from "../components/Input";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from "../services/api";
import { Option } from "../components/Option";
import { Calendar, PushPin } from "phosphor-react-native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { ButtonIcon } from "../components/ButtonIcon";
import dayjs from "dayjs";
import { InputController } from "../components/InputController";
import { useTransactions } from "../hooks/useTransactions";
import { useFocusEffect } from "@react-navigation/native";

const newTransactionFormSchema = z.object({
  price: z.string().min(1, { message: "Digite um valor válido" }),
  description: z.string().default(null),
  categoryId: z.string().default(null),
  title: z.string().min(3, { message: "Digite um título para sua despesa" }).max(30),
  repeatRecurrent: z.string().default(null),
  nRepeat: z.string().default(null),
  repeatFixed: z.boolean().default(false),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function New() {
  const [repeat, setRepeat] = useState("noRepeat")
  const [isLoading, setIsLoading] = useState(false);
  const [optionSelected, setOptionSelected] = useState<'income' | 'outcome'>('outcome')
  const [checkFixed, setCheckFixed] = useState(false)
  const [date, setDate] = useState(new Date());

  const { categories, fetchCategories } = useTransactions()

  const toast = useToast();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { title, price, categoryId, nRepeat, repeatRecurrent, repeatFixed, description } = data
    try {
      setIsLoading(true);

      await api.post('/transactions', {
        title, 
        description,
        price: Number(price) * 100, 
        categoryId, 
        dueDate: date, 
        type: optionSelected,
        repeatRecurrent,
        nRepeat: Number(nRepeat),
        repeatFixed,
        userId: "clasi3lm50000o8fsq1wed203"
      })

      if (optionSelected === 'income') { 
        toast.show({
          title: 'Transação criada com succeso!',
          placement: 'top',
          bgColor: 'green.500'
        }) 
      } else {
        toast.show({
          title: 'Despesa criada com succeso!',
          placement: 'top',
          bgColor: 'green.500'
        })
      }
      reset()
      setRepeat("noRepeat")
    } catch (err) {
      console.log(err)
      toast.show({
        title: 'erro!',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false);
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useFocusEffect(useCallback(() => {
    fetchCategories()
  }, [fetchCategories]))

  return (
    <VStack flex={1}>
      <HeaderNew title={`Nova ${optionSelected === 'income' ? 'renda' : 'despesa'}`} showBackButton />

      <Center mt={6}>
        <Text bold fontSize="md">Valor {optionSelected === 'income' ? 'renda' : 'despesa'}</Text>
          <Controller 
            control={control}
            render={({ field: {onChange, onBlur, value} }) => (
              <Center>
                <Input 
                  w={160} 
                  placeholder="200,00"
                  fontSize="2xl"
                  h={14} 
                  textAlign="center" 
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  errorMessage={errors.price?.message}
                />
              </Center>
            )}
            name="price"
            defaultValue=""
          />
      </Center>

      <VStack p={6} space={4}>
        <VStack space={4} alignItems="center">
          <InputController 
            name="title" 
            title="Título" 
            placeholder="Roupa" 
            errors={errors.title?.message} 
            control={control} 
          />

          <InputController 
            name="description" 
            title="Descrição" 
            placeholder="Roupa para o trabalho" 
            errors={errors.description?.message} 
            control={control} 
          />

          <FormControl>
            <Text bold>Categoria</Text>
            <Controller 
              control={control}
              render={({ field: {onChange, value} }) => (
                <Select 
                  w="full" 
                  fontSize="md" 
                  accessibilityLabel="Selecione" 
                  placeholder="Selecione" 
                  variant="underlined"
                  selectedValue={value}
                  onValueChange={value => onChange(value)}
                >
                  {
                    categories.map(category => (
                      <Select.Item key={category.id} label={category.name} value={category.id} />
                    ))
                  }
                </Select>
              )}
              name="categoryId"
              defaultValue="15ad94cc-cf56-46d4-a662-a90271ac5f90"
            />
          </FormControl>

          <FormControl>
            <Text bold>Data de vencimento</Text>
            <HStack justifyContent="center" alignItems="center" ml={4}>
              <Input
                value={dayjs(date).format('DD/MM/YYYY')}
              />
              <ButtonIcon size={30} icon={Calendar} onPress={showDatepicker} color="black" />
            </HStack>
          </FormControl>

          <HStack bgColor="blue.800" p={1} rounded="sm">
            <Option 
              title='Entrada' 
              isSelected={optionSelected === 'income'}
              onPress={() => setOptionSelected('income')}
            />
            <Option 
              title='Saída' 
              isSelected={optionSelected === 'outcome'}
              onPress={() => setOptionSelected('outcome')}
            />
          </HStack>

          <Radio.Group name="radioRepeat" value={repeat} onChange={nextValue => {
            setRepeat(nextValue);
          }}>
            <HStack space={16}>
              <Radio value="noRepeat" my={1}>
                Não permitir
              </Radio>

              <Radio value="repeat" my={1}>
                Repetir
              </Radio>
            </HStack>
          </Radio.Group>

          {
            repeat === 'repeat' &&
            <VStack space={4} w="full">
              <VStack justifyContent="center" alignItems="center" space={4}>
                <Controller 
                control={control}
                render={({ field: {onChange, value} }) => (
                  <Select 
                    w="170" 
                    fontSize="md" 
                    accessibilityLabel="Selecione" 
                    placeholder="Selecione" 
                    variant="underlined"
                    selectedValue={value}
                    onValueChange={value => onChange(value)}
                  >
                    <Select.Item label="Anualmente" value="Anualmente" />
                    <Select.Item label="Mensalmente" value="Mensalmente" />
                    <Select.Item label="Semanalmente" value="Semanalmente" />
                    <Select.Item label="Diariamente" value="Diariamente" />
                  </Select>
                )}
                name="repeatRecurrent"
                defaultValue="Mensalmente"
              />
              </VStack>

              <HStack justifyContent="center" alignItems="center" space={4}>
                <InputController 
                  title="Número de repetições"
                  control={control}
                  name="nRepeat"
                  placeholder="2"
                  errors={errors.nRepeat?.message}
                  flex={1}
                  isDisabled={checkFixed}
                />
                <Controller 
                  control={control}
                  render={({ field: {onChange, value} }) => (
                    <Checkbox value="fixed" onChange={() => setCheckFixed(!checkFixed)} size="md" icon={<Icon as={<PushPin size={16} color="white" />} />} >
                      Fixo
                    </Checkbox>
                  )}
                  name="repeatFixed"
                  defaultValue={false}
                />
              </HStack>
            </VStack>
          }
        </VStack>

        <Button 
          title="Salvar" 
          isLoading={isLoading} 
          onPress={handleSubmit(handleCreateNewTransaction)}
        />
      </VStack>
    </VStack>
  )
}