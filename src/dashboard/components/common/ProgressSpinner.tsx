import { ProgressSpinner } from 'primereact/progressspinner';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
        <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="5" fill="var(--surface-ground)" animationDuration="1s" />
    </div>
  )
}

export default Spinner