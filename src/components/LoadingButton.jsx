
import React from 'react'
import PropTypes from 'prop-types'
import { Loader2 } from 'lucide-react'

const LoadingButton = ({ loading, onClick, children }) => {
    return (
        <button 
            onClick={onClick} 
            disabled={loading}
            className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed'
        >
            {loading ? (
                <Loader2 className='animate-spin mx-auto' />
            ) : children}
        </button>
    )
}

LoadingButton.propTypes = {
    loading: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default LoadingButton