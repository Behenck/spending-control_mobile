import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { IconProps } from "phosphor-react-native";
import { useTheme } from "native-base";

interface Props extends TouchableOpacityProps {
  icon: React.FC<IconProps>;
  color: string
  size?: number
}

export function ButtonIcon({ icon: Icon, color, size, ...rest }: Props) {
  const { sizes } = useTheme();
  const sizesIcon = size || sizes[6];

  return (
    <TouchableOpacity {...rest}>
      <Icon color={color} size={sizesIcon} />
    </TouchableOpacity>
  );
}