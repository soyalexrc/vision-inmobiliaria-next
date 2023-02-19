import {
  CSSPseudoSelectorProps,
  CSSSelectorObjectOrCssVariables,
  SystemCssProperties,
  SystemStyleObject,
  Theme
} from "@mui/system";

export interface ModalContent {
  title: string;
  element: string;
  sx?:  SystemCssProperties<Theme> | CSSPseudoSelectorProps<Theme> | CSSSelectorObjectOrCssVariables<Theme> | null | ((theme: Theme) => SystemStyleObject<Theme>) | ReadonlyArray<boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)>;
  onClick?: () => void;
}
