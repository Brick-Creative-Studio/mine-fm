import { Leva } from 'leva'

export default function LevaControllerSection() {
  return (
    <div className="md:h-[604px] h-[32rem]">
      <Leva key={'leva-controls'} flat fill titleBar={false} />
    </div>
  )
}
