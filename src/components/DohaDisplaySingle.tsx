import {DohaData} from '../types/types'
import DohaContent from './DohaContent'

interface DohaDisplaySingleProps {
  dohaData: DohaData | null
  loading: boolean
}

const DohaDisplaySingle: React.FC<DohaDisplaySingleProps> = ({
  dohaData,
  loading,
}) => {
  return (
    <>
      <DohaContent dohaData={dohaData} loading={loading} />
    </>
  )
}

export default DohaDisplaySingle
