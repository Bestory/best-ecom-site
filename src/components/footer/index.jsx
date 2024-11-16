
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear()

  return (
    <div className="bg-dark-blue w-full text-white size-6 flex justify-center items-center h-20">
      <p className="text-white">
        &copy; {year} 2024 All Rights reserved
      </p>
    </div>
  )
}

export default Footer