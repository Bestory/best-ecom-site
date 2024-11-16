
const Card = ({children, CardClass }) => {
  return (
    <div className={`sm:min-auto md:min-w-[60vh] border-solid border-2 rounded-md ${CardClass}`}>
      {children}
    </div>
  )
}

export default Card;