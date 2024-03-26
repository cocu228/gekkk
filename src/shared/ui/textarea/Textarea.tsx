import React from "react";
import { Input as InputAntd, InputProps, InputRef } from "antd";

type IParams = InputProps & {
  onChange: any;
};

const { TextArea } = InputAntd;

const Textarea = React.forwardRef(
  ({ onChange, ...props }: IParams, ref: React.ForwardedRef<InputRef>) => {
    const test = (val: any) => {
      const inpValue = val.target.value;
      const cyrillicPattern = /[а-яА-Я]/;

      //   console.log("click");

      if (cyrillicPattern.test(inpValue)) {
        return null;
      }

      onChange(val);
    };

    return (
      <TextArea
        ref={ref}
        onChange={(value) => {
          test(value);
        }}
        // disabled={!networkTypeSelect}
        rows={2}
      />
    );
  }
);

export default Textarea;
