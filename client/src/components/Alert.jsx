// eslint-disable-next-line react/prop-types
const Alert = ({msg}) => {
    return(
        <div className="rounded-md bg-red-500 p-2 mt-4 text-white mb-4">
            <i className="fa-solid fa-circle-exclamation"></i> {msg}
        </div>
    )

}

export default Alert