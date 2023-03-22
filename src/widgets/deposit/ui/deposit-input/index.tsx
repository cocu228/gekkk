import {Input as InputAnt, InputProps} from "antd";
import FormItem from "@/shared/ui/form/form-item/FormItem";

const DepositInput = ({onChange, onInput}: InputProps) => {

    return (
      <FormItem extra={<span className="text-green">The minimum deposit amount is 100 EURG</span>}>
        <InputAnt 
          onChange={onChange} 
          onInput={onInput}
          suffix={
              <>
                  <img className="!mr-3" src="/img/tokens/EurgIcon.svg" width={30} height={30} alt="eurg"/>
                  <span className="text-sm font-medium">EURG</span>
              </>
          }
        />
      </FormItem>
    )
}

export default DepositInput