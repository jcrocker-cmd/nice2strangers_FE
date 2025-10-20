interface StatusBadgeProps{
    message: string;
    sx: string;
}

const StatusBadge = ({message, sx}: StatusBadgeProps) => {
  return (
    <div className={`rounded-full flex justify-center p-2 text-xs border-1 ${sx}`}>
        {message}
    </div>
  )
}

export default StatusBadge