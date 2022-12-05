import { HStack, Icon } from "native-base";
import { Check, IconProps } from "phosphor-react-native";

interface IconRoundedProps {
  icon: React.FC<IconProps>;
  opacity?: boolean
  bgColor?: string
}

export function IconRounded({ opacity = false, bgColor = "", icon: Icon}: IconRoundedProps) {
  return (
    <HStack rounded="full" bgColor={opacity ? 'white:alpha.30': bgColor ? bgColor : 'orange.500'} w={10} h={10} justifyContent="center" alignItems="center">
      <Icon color="white" />
    </HStack>
  )
}