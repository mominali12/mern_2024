import { useState } from "react"

// eslint-disable-next-line react/prop-types
const Success = ({msg}) => {

    const [show, setShow] = useState(true)

    setTimeout(() => setShow(false), 2000)

    return(
        <div>
        {show && <div className="rounded-md bg-green-500 p-2 mt-4 text-white mb-4">
            <i className="fa-solid fa-circle-check"></i> {msg}
        </div>}
        </div>
    )

}

export default Success