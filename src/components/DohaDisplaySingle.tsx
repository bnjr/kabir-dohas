import {DohaData} from '../types/types'
import DohaContent from './DohaContent'

interface DohaDisplaySingleProps {
  dohaData: DohaData | null
}

const DohaDisplaySingle: React.FC<DohaDisplaySingleProps> = ({dohaData}) => {
  return (
    <>
      <DohaContent dohaData={dohaData} />
    </>
  )
}

export default DohaDisplaySingle
