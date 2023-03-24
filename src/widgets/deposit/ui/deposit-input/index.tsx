import {Input as InputAnt, InputProps} from "antd";
import FormItem from "@/shared/ui/form/form-item/FormItem";

const DepositInput = ({onChange, onInput}: InputProps) => {

    return (
      <FormItem className="relative" extra={<span className="text-green">The minimum deposit amount is 100 EURG</span>}>
        <InputAnt 
          onChange={onChange} 
          onInput={onInput}
          className="mb-1"
          suffix={
              <>
                  <img className="!mr-3" src="/img/tokens/EurgIcon.svg" width={30} height={30} alt="eurg"/>
                  <span className="text-sm font-medium">EURG</span>
              </>
          }
        />
        <p className="text-xs text-gray-500 absolute top-11 left-3 z-10">Balance: 1000 EURG</p>
      </FormItem>
    )
}

export default DepositInput