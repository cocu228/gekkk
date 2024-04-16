import CloseWindow from '@/assets/close-window.svg?react'

export function CloseWindowButton(props) {
  return (
    <div onClick={props.onClick} className='text-[#285E69ff]' >
      <CloseWindow />
    </div>
  )
}
