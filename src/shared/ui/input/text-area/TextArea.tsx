import React from "react";
import {Input as InputAntd} from "antd";
import {TextAreaProps, TextAreaRef} from "antd/es/input/TextArea";
import { validateInput } from "../model/helpers";

type IParams = TextAreaProps & {
  allowDigits?: boolean;
  allowSymbols?: boolean;
};

const {TextArea: TextAreaAntd} = InputAntd;

const TextArea = React.forwardRef(({
  onChange,
  allowDigits,
  allowSymbols,
  ...props
}: IParams, ref: React.ForwardedRef<TextAreaRef>) => {
  return (
    <TextAreaAntd
      {...props}
      rows={2}
      ref={ref}
      onChange={(event) => {
        if (validateInput(event, allowDigits, allowSymbols)) {
          onChange(event);
        }
      }}
    />
  );
});

export default TextArea;
